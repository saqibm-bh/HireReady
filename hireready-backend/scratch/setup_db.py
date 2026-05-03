from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres.jaendnciffkgllqhzlgp:HireReadyBSCS13D@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres"

def setup_db():
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        print("Creating user_manual_skills table...")
        conn.execute(text("""
            CREATE TABLE IF NOT EXISTS user_manual_skills (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL,
                skill_name TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                UNIQUE(user_id, skill_name)
            )
        """))
        
        # Also ensure steps in learning_roadmaps can be updated (it's JSONB)
        # We might want to add a 'completed' flag to the steps in the JSONB
        
        conn.commit()
    print("Done.")

if __name__ == "__main__":
    setup_db()
