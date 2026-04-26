import pickle
import os
from typing import List, Tuple, Dict
from app.schema.gap_analysis import Skill

# Load the knowledge base once when the module is imported
# This assumes knowledge_base.pkl is in the root of the backend directory
KNOWLEDGE_BASE_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'knowledge_base.pkl')

try:
    with open(KNOWLEDGE_BASE_PATH, 'rb') as f:
        knowledge_base = pickle.load(f)
except Exception as e:
    print(f"Failed to load knowledge base from {KNOWLEDGE_BASE_PATH}: {e}")
    knowledge_base = {}

def perform_gap_analysis(user_skills: List[str], target_role: str) -> Tuple[int, List[str], List[Skill]]:
    """
    Compares user_skills against the top 20 required skills for target_role from the knowledge base.
    Returns:
        overallMatch (int): Percentage match (0-100)
        skillsYouHave (List[str]): Overlapping skills
        skillsMissing (List[Skill]): Missing skills with relative importance (0-100)
    """
    if target_role not in knowledge_base:
        return 0, [], []

    # Get the dictionary of skills and their frequencies for the target role
    role_data: Dict[str, int] = knowledge_base[target_role]
    
    # Sort all role skills by frequency descending
    sorted_role_skills = sorted(role_data.items(), key=lambda item: item[1], reverse=True)
    
    # Take the top 20 skills as our baseline
    top_20_skills = sorted_role_skills[:20]
    
    # Calculate the total weight (sum of frequencies) for the top 20
    total_top_20_weight = sum(freq for skill, freq in top_20_skills)
    if total_top_20_weight == 0:
        return 0, [], []

    # Get the max frequency to calculate relative importance (0-100%) for UI bars
    max_freq = top_20_skills[0][1] if top_20_skills else 1

    # Normalize user skills (lowercase, strip whitespace) for matching
    normalized_user_skills = {skill.lower().strip() for skill in user_skills}

    skills_you_have = []
    skills_missing = []
    user_weight_score = 0

    for skill_name, freq in top_20_skills:
        normalized_skill = skill_name.lower().strip()
        if normalized_skill in normalized_user_skills:
            skills_you_have.append(skill_name)
            user_weight_score += freq
        else:
            relative_importance = int((freq / max_freq) * 100)
            skills_missing.append(Skill(name=skill_name, importance=relative_importance))

    # Calculate overall match percentage based on frequency weights
    overall_match = int((user_weight_score / total_top_20_weight) * 100)

    # Sort missing skills by importance (they should already be sorted from earlier, but just to be safe)
    skills_missing.sort(key=lambda s: s.importance, reverse=True)

    # Return all missing skills from the top 20
    return overall_match, skills_you_have, skills_missing

