from supabase import create_client, Client
from app.core.config import settings

# Dedicated client for Supabase Storage (PDF uploads)
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
