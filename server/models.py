from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Student(db.Model):
    __tablename__ = 'students'
    
    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(50), nullable=False)      # Фамилия
    first_name = db.Column(db.String(50), nullable=False)     # Имя
    patronymic = db.Column(db.String(50), nullable=True)      # Отчество
    login = db.Column(db.String(100), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    points = db.Column(db.Integer, default=0)                  # Баллы (шеши)
    curator = db.Column(db.String(100), nullable=False)       # Куратор студента
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Дополнительные поля для вашего приложения
    # student_id = db.Column(db.String(50), unique=True, nullable=True)  # ID студента (SH-2024-XXXX)
    email = db.Column(db.String(120), unique=True, nullable=True)      # Email
    
    def to_dict(self):
        """Преобразует модель в словарь для JSON ответа (без пароля)"""
        return {
            'id': self.id,
            'last_name': self.last_name,
            'first_name': self.first_name,
            'patronymic': self.patronymic,
            'full_name': self.get_full_name(),
            'login': self.login,
            'points': self.points,
            'curator': self.curator,
            # 'student_id': self.student_id,
            'email': self.email,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
    
    def get_full_name(self):
        """Возвращает полное ФИО"""
        if self.patronymic:
            return f"{self.last_name} {self.first_name} {self.patronymic}"
        return f"{self.last_name} {self.first_name}"
    
    def __repr__(self):
        return f'<Student {self.login}>'
    
class CompletedQuest(db.Model):
    __tablename__ = 'completed_quests'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    quest_id = db.Column(db.String(100), nullable=False)  # УНИКАЛЬНЫЙ ID КВЕСТА
    quest_title = db.Column(db.String(200), nullable=False)
    points_earned = db.Column(db.Integer, default=0)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # СВЯЗЬ СО СТУДЕНТОМ
    student = db.relationship('Student', backref=db.backref('completed_quests', lazy=True))
    
    __table_args__ = (
        db.UniqueConstraint('student_id', 'quest_id', name='unique_student_quest'),
    )