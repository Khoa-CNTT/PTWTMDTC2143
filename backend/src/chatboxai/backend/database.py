import os
from langchain_community.utilities import SQLDatabase

def get_sql_database():
    return SQLDatabase.from_uri(os.getenv("DATABASE_URL"))