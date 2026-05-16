import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # База данных
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Секретный ключ (в проде используйте переменные окружения)
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here-change-in-production')
    
    # Настройки CORS для React (порт 5173 - Vite по умолчанию)
    CORS_ORIGINS = [
        'http://localhost:5173',  # Vite dev server
        'http://localhost:3000',  # Create React App
    ]
    
    # Настройки для загрузки файлов
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size