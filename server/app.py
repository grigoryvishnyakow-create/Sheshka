from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, Student
from config import Config
import re

# Инициализация приложения
app = Flask(__name__)
app.config.from_object(Config)

# Инициализация расширений
CORS(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)
bcrypt = Bcrypt(app)
db.init_app(app)

# Создание таблиц БД при запуске
with app.app_context():
    db.create_all()
    print("✅ База данных инициализирована")

# ============= ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =============

def validate_login(login):
    """Проверка логина (только латинские буквы, цифры, подчеркивание)"""
    pattern = r'^[a-zA-Z0-9_]{3,50}$'
    return re.match(pattern, login) is not None

def validate_password(password):
    """Проверка сложности пароля"""
    if len(password) < 6:
        return False, "Пароль должен содержать минимум 6 символов"
    if not re.search(r'[A-Za-z]', password):
        return False, "Пароль должен содержать буквы"
    if not re.search(r'[0-9]', password):
        return False, "Пароль должен содержать цифры"
    return True, "Пароль валидный"

def validate_email(email):
    """Проверка email"""
    if not email:
        return True  # email не обязателен
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(pattern, email) is not None

# ============= API ЭНДПОИНТЫ =============

@app.route('/api/health', methods=['GET'])
def health_check():
    """Проверка работоспособности API"""
    return jsonify({
        'status': 'healthy',
        'message': 'API работает'
    }), 200

@app.route('/api/register', methods=['POST'])
def register_student():
    """
    Регистрация нового студента
    Ожидает JSON соответствующий форме RegistrationForm:
    {
        "firstName": "Иван",
        "lastName": "Иванов",
        "patronymic": "Иванович",  // опционально
        "email": "student@university.edu",  // опционально
        "password": "password123",
        "agreeTerms": true
    }
    """
    try:
        data = request.get_json()
        
        # Проверка обязательных полей (соответствует форме RegistrationForm)
        required_fields = ['firstName', 'lastName', 'password']
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                'success': False,
                'error': 'missing_fields',
                'message': f"Отсутствуют обязательные поля: {', '.join(missing_fields)}"
            }), 400
        
        # Проверка email (если указан)
        email = data.get('email', '').strip()
        if email and not validate_email(email):
            return jsonify({
                'success': False,
                'error': 'invalid_email',
                'message': 'Неверный формат email'
            }), 400
        
        # Создание логина из email или имени
        if email:
            login = email.split('@')[0]
        else:
            # Генерируем логин из имени и фамилии
            base_login = f"{data['firstName'].lower()}_{data['lastName'].lower()}"
            login = base_login
            # Проверяем уникальность и добавляем число если нужно
            counter = 1
            while Student.query.filter_by(login=login).first():
                login = f"{base_login}{counter}"
                counter += 1
        
        # Проверка пароля
        is_valid, password_message = validate_password(data['password'])
        if not is_valid:
            return jsonify({
                'success': False,
                'error': 'invalid_password',
                'message': password_message
            }), 400
        
        # Проверка уникальности email (если указан)
        if email:
            existing_email = Student.query.filter_by(email=email).first()
            if existing_email:
                return jsonify({
                    'success': False,
                    'error': 'email_exists',
                    'message': 'Студент с таким email уже существует'
                }), 409
        
        # Хеширование пароля
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
        # Куратор по умолчанию (можно потом обновить)
        default_curator = "Администратор"
        
        # Создание нового студента
        new_student = Student(
            last_name=data['lastName'].strip(),
            first_name=data['firstName'].strip(),
            patronymic=data.get('patronymic', '').strip() if data.get('patronymic') else None,
            login=login,
            password_hash=hashed_password,
            points=100,  # Новые пользователи получают 100 бонусных баллов (шешей)
            curator=default_curator,
            # student_id=data.get('studentId', '').strip() if data.get('studentId') else None,
            email=email if email else None
        )
        
        # Сохранение в БД
        db.session.add(new_student)
        db.session.commit()
        
        # Возвращаем данные студента (без пароля)
        return jsonify({
            'success': True,
            'message': 'Регистрация успешно завершена',
            'student': new_student.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Registration error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': f'Ошибка сервера: {str(e)}'
        }), 500

@app.route('/api/login', methods=['POST'])
def login_student():
    """
    Авторизация студента
    Ожидает JSON из формы LoginForm:
    {
        "email": "student@university.edu",
        "password": "password123"
    }
    """
    try:
        data = request.get_json()
        
        # Проверка наличия полей
        if not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'error': 'missing_fields',
                'message': 'Email и пароль обязательны'
            }), 400
        
        # Поиск студента по email или логину
        email_or_login = data['email'].strip()
        student = Student.query.filter(
            (Student.email == email_or_login) | (Student.login == email_or_login)
        ).first()
        
        if not student:
            return jsonify({
                'success': False,
                'error': 'invalid_credentials',
                'message': 'Неверный email/логин или пароль'
            }), 401
        
        # Проверка пароля
        if not bcrypt.check_password_hash(student.password_hash, data['password']):
            return jsonify({
                'success': False,
                'error': 'invalid_credentials',
                'message': 'Неверный email/логин или пароль'
            }), 401
        
        return jsonify({
            'success': True,
            'message': 'Вход выполнен успешно',
            'student': student.to_dict()
        }), 200
        
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': f'Ошибка сервера: {str(e)}'
        }), 500

@app.route('/api/student/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """Получение информации о студенте по ID"""
    try:
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({
                'success': False,
                'error': 'not_found',
                'message': 'Студент не найден'
            }), 404
        
        return jsonify({
            'success': True,
            'student': student.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': f'Ошибка сервера: {str(e)}'
        }), 500

@app.route('/api/student/<int:student_id>/points', methods=['PUT'])
def update_student_points(student_id):
    """Обновление баллов студента (шешей)"""
    try:
        data = request.get_json()
        
        if 'points' not in data:
            return jsonify({
                'success': False,
                'error': 'missing_field',
                'message': 'Поле points обязательно'
            }), 400
        
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({
                'success': False,
                'error': 'not_found',
                'message': 'Студент не найден'
            }), 404
        
        # Проверка, что points - число
        try:
            new_points = int(data['points'])
        except ValueError:
            return jsonify({
                'success': False,
                'error': 'invalid_value',
                'message': 'Points должно быть числом'
            }), 400
        
        student.points = new_points
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Баллы обновлены',
            'student': student.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': f'Ошибка сервера: {str(e)}'
        }), 500
    
@app.route('/api/leaderboard', methods=['GET'])
def get_leaderboard():
    """Получение топа студентов по баллам"""
    try:
        limit = request.args.get('limit', 10, type=int)
        students = Student.query.order_by(Student.points.desc()).limit(limit).all()
        
        return jsonify({
            'success': True,
            'leaderboard': [student.to_dict() for student in students]
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': f'Ошибка сервера: {str(e)}'
        }), 500

@app.route('/api/students', methods=['GET'])
def get_all_students():
    """Получение списка всех студентов (для куратора/админа)"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        curator = request.args.get('curator')
        
        query = Student.query
        
        if curator:
            query = query.filter_by(curator=curator)
        
        students = query.order_by(Student.last_name).paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'success': True,
            'students': [student.to_dict() for student in students.items],
            'total': students.total,
            'page': page,
            'per_page': per_page,
            'pages': students.pages
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': f'Ошибка сервера: {str(e)}'
        }), 500
    

@app.route('/api/student/<int:student_id>/add-points', methods=['POST'])
def add_points(student_id):
    """НАЧИСЛЕНИЕ ШЕШЕЙ СТУДЕНТУ"""
    try:
        data = request.get_json()
        
        if 'points' not in data:
            return jsonify({
                'success': False,
                'error': 'missing_field',
                'message': 'Не указано количество шешей'
            }), 400
        
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({
                'success': False,
                'error': 'not_found',
                'message': 'Студент не найден'
            }), 404
        
        points_to_add = int(data['points'])
        
        if points_to_add <= 0:
            return jsonify({
                'success': False,
                'error': 'invalid_value',
                'message': 'Количество шешей должно быть положительным'
            }), 400
        
        old_points = student.points
        student.points += points_to_add
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Начислено {points_to_add} шешей',
            'old_points': old_points,
            'new_points': student.points,
            'student': {
                'id': student.id,
                'full_name': student.get_full_name(),
                'points': student.points,
                'login': student.login
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': str(e)
        }), 500


@app.route('/api/student/<int:student_id>/spend-points', methods=['POST'])
def spend_points(student_id):
    """СПИСАНИЕ ШЕШЕЙ СТУДЕНТА (ПРИ ПОКУПКЕ)"""
    try:
        data = request.get_json()
        
        if 'points' not in data:
            return jsonify({
                'success': False,
                'error': 'missing_field',
                'message': 'Не указано количество шешей'
            }), 400
        
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({
                'success': False,
                'error': 'not_found',
                'message': 'Студент не найден'
            }), 404
        
        points_to_spend = int(data['points'])
        
        if points_to_spend <= 0:
            return jsonify({
                'success': False,
                'error': 'invalid_value',
                'message': 'Количество шешей должно быть положительным'
            }), 400
        
        if student.points < points_to_spend:
            return jsonify({
                'success': False,
                'error': 'insufficient_funds',
                'message': f'Недостаточно шешей. У вас {student.points}, требуется {points_to_spend}',
                'current_points': student.points
            }), 400
        
        old_points = student.points
        student.points -= points_to_spend
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'Списано {points_to_spend} шешей',
            'old_points': old_points,
            'new_points': student.points,
            'student': {
                'id': student.id,
                'full_name': student.get_full_name(),
                'points': student.points,
                'login': student.login
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': str(e)
        }), 500


@app.route('/api/student/<int:student_id>/points', methods=['GET'])
def get_points(student_id):
    """ПОЛУЧИТЬ ТЕКУЩЕЕ КОЛИЧЕСТВО ШЕШЕЙ СТУДЕНТА"""
    try:
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({
                'success': False,
                'error': 'not_found',
                'message': 'Студент не найден'
            }), 404
        
        return jsonify({
            'success': True,
            'points': student.points,
            'student': {
                'id': student.id,
                'full_name': student.get_full_name(),
                'points': student.points,
                'login': student.login
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': str(e)
        }), 500
    
@app.route('/api/student/<int:student_id>/balance', methods=['GET'])
def get_student_balance(student_id):
    """ПОЛУЧЕНИЕ БАЛАНСА СТУДЕНТА ДЛЯ HEADER"""
    try:
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({
                'success': False,
                'error': 'not_found',
                'message': 'Студент не найден'
            }), 404
        
        return jsonify({
            'success': True,
            'points': student.points,
            'student': {
                'id': student.id,
                'full_name': student.get_full_name(),
                'points': student.points
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': str(e)
        }), 500


@app.route('/api/student/<int:student_id>/dashboard', methods=['GET'])
def get_student_dashboard(student_id):
    """ПОЛУЧЕНИЕ ДАННЫХ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (ДАШБОРД)"""
    try:
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({
                'success': False,
                'error': 'not_found',
                'message': 'Студент не найден'
            }), 404
        
        return jsonify({
            'success': True,
            'points': student.points,
            'student': {
                'id': student.id,
                'full_name': student.get_full_name(),
                'first_name': student.first_name,
                'last_name': student.last_name,
                'points': student.points,
                'login': student.login
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'server_error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    print("🚀 Запуск сервера на http://localhost:5000")
    print("📚 Документация API будет доступна после запуска")
    app.run(debug=True, host='0.0.0.0', port=5000)