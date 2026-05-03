import pickle
import os
from typing import List, Tuple, Dict, Set
from app.schema.gap_analysis import Skill

# Load the knowledge base once when the module is imported
KNOWLEDGE_BASE_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'knowledge_base.pkl')

try:
    with open(KNOWLEDGE_BASE_PATH, 'rb') as f:
        knowledge_base = pickle.load(f)
except Exception as e:
    print(f"Failed to load knowledge base from {KNOWLEDGE_BASE_PATH}: {e}")
    knowledge_base = {}

VAGUE_SKILLS = {
    # Broad / Academic Terms
    'computer science', 'software engineering', 'software development', 
    'information technology', 'engineering', 'programming', 
    'development', 'technical skills', 'programming languages',
    'software', 'design', 'architecture', 'application development',
    'analytics', 'data science',
    
    # Soft Skills
    'problem solving', 'problemsolving skills', 'analytical skills', 
    'communication', 'communication skills', 'interpersonal skills',
    'teamwork', 'leadership', 'management', 'project management',
    'attention to detail', 'multitasking', 'organizational skills',
    'organization', 'verbal communication', 'written communication',
    'documentation', 'technical writing', 'training', 'presentation skills',
    'collaboration', 'creativity', 'critical thinking', 'flexibility',
    'adaptability', 'time management', 'customer service',
    
    # Generic Categories / Tools
    'microsoft office', 'office', 'windows', 'excel', 'word', 'powerpoint',
    'data analysis', 'data security', 'security', 'automation', 
    'testing', 'performance optimization', 'deployment',
    'monitoring', 'troubleshooting', 'debugging', 'agile', 'apis'
}

def is_vague(skill: str, target_role: str) -> bool:
    s = skill.lower().strip()
    t = target_role.lower().strip()
    if s in VAGUE_SKILLS:
        return True
    if s == t:
        return True
    words_s = set(s.split())
    words_t = set(t.split())
    if len(words_s) > 0 and words_s.issubset(words_t):
        return True
    return False

def get_all_roles() -> List[str]:
    """Returns a sorted list of all available job roles in the knowledge base."""
    return sorted(list(knowledge_base.keys()))

def get_all_skills() -> List[str]:
    """Returns a sorted list of all unique skills across all roles, excluding vague ones."""
    all_skills: Set[str] = set()
    for role_skills in knowledge_base.values():
        for skill in role_skills.keys():
            # Basic filtering for the global list
            if skill.lower() not in VAGUE_SKILLS:
                all_skills.add(skill)
    return sorted(list(all_skills))

def perform_gap_analysis(user_skills: List[str], target_role: str) -> Tuple[int, List[str], List[Skill]]:
    if target_role not in knowledge_base:
        return 0, [], []

    role_data: Dict[str, int] = knowledge_base[target_role]
    sorted_role_skills = sorted(role_data.items(), key=lambda item: item[1], reverse=True)
    filtered_role_skills = [
        (skill, freq) for skill, freq in sorted_role_skills
        if not is_vague(skill, target_role)
    ]
    top_20_skills = filtered_role_skills[:20]
    total_top_20_weight = sum(freq for skill, freq in top_20_skills)
    if total_top_20_weight == 0:
        return 0, [], []

    normalized_user_skills = {skill.lower().strip() for skill in user_skills}
    skills_you_have = []
    user_weight_score = 0
    missing_skill_data = []

    for skill_name, freq in top_20_skills:
        normalized_skill = skill_name.lower().strip()
        if normalized_skill in normalized_user_skills:
            skills_you_have.append(skill_name)
            user_weight_score += freq
        else:
            missing_skill_data.append((skill_name, freq))

    skills_missing = []
    total_missing_freq = sum(freq for _, freq in missing_skill_data)
    if total_missing_freq > 0:
        for skill_name, freq in missing_skill_data:
            relative_importance = int(round((freq / total_missing_freq) * 100))
            skills_missing.append(Skill(name=skill_name, importance=relative_importance))
        if skills_missing:
            current_sum = sum(s.importance for s in skills_missing)
            remainder = 100 - current_sum
            skills_missing[0].importance += remainder

    overall_match = int((user_weight_score / total_top_20_weight) * 100)
    skills_missing.sort(key=lambda s: s.importance, reverse=True)
    return overall_match, skills_you_have, skills_missing
