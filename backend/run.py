from app import create_app
from models import db
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Crear la aplicación
app = create_app(os.environ.get('FLASK_ENV', 'development'))

@app.route('/')
def index():
    return {
        'message': 'Synapse API está funcionando correctamente',
        'version': '1.0.0',
        'endpoints': {
            'auth': '/api/auth',
            'usuarios': '/api/usuarios',
            'salas': '/api/salas',
            'tareas': '/api/tareas',
            'sesiones': '/api/sesiones',
            'tecnicas': '/api/tecnicas',
            'recompensas': '/api/recompensas',
            'progreso': '/api/progreso'
        }
    }

@app.route('/health')
def health_check():
    try:
        # Verificar conexión a la base de datos
        db.session.execute('SELECT 1')
        return {'status': 'healthy', 'database': 'connected'}, 200
    except Exception as e:
        return {'status': 'unhealthy', 'database': 'disconnected', 'error': str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)