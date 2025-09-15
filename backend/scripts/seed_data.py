from backend.app import create_app
from backend.models import db, Rol, Tecnica, Recompensa
import json

app = create_app()

def insertar_datos_iniciales():
    with app.app_context():
        print("Insertando datos iniciales...")
        
        # Crear roles si no existen
        if not Rol.query.first():
            roles = [
                Rol(nombre='administrador'),
                Rol(nombre='usuario')
            ]
            for rol in roles:
                db.session.add(rol)
            print("✓ Roles creados")
        
        # Crear técnicas de estudio básicas
        if not Tecnica.query.first():
            tecnicas = [
                Tecnica(nombre='Pomodoro', categoria='Gestión del tiempo'),
                Tecnica(nombre='Timeboxing', categoria='Gestión del tiempo'),
                Tecnica(nombre='Técnica Feynman', categoria='Comprensión'),
                Tecnica(nombre='Mapas mentales', categoria='Organización'),
                Tecnica(nombre='Repetición espaciada', categoria='Memorización'),
                Tecnica(nombre='Método Cornell', categoria='Toma de notas'),
                Tecnica(nombre='Lectura activa', categoria='Comprensión'),
                Tecnica(nombre='Flashcards', categoria='Memorización')
            ]
            for tecnica in tecnicas:
                db.session.add(tecnica)
            print("✓ Técnicas de estudio creadas")
        
        # Crear recompensas básicas
        if not Recompensa.query.first():
            recompensas = [
                Recompensa(
                    nombre='Primera Sesión',
                    descripcion='Completa tu primera sesión de estudio',
                    tipo='puntos',
                    valor=10,
                    requisitos={'sesiones_completadas': 1}
                ),
                Recompensa(
                    nombre='Estudiante Dedicado',
                    descripcion='Completa 10 sesiones de estudio',
                    tipo='puntos',
                    valor=50,
                    requisitos={'sesiones_completadas': 10}
                ),
                Recompensa(
                    nombre='Maratonista Mental',
                    descripcion='Estudia por 5 horas en total',
                    tipo='puntos',
                    valor=100,
                    requisitos={'tiempo_total_minutos': 300}
                ),
                Recompensa(
                    nombre='Organizador Pro',
                    descripcion='Completa 20 tareas',
                    tipo='puntos',
                    valor=75,
                    requisitos={'tareas_completadas': 20}
                ),
                Recompensa(
                    nombre='Constancia',
                    descripcion='Estudia 7 días consecutivos',
                    tipo='puntos',
                    valor=150,
                    requisitos={'dias_consecutivos': 7}
                )
            ]
            for recompensa in recompensas:
                db.session.add(recompensa)
            print("✓ Recompensas básicas creadas")
        
        db.session.commit()
        print("🎉 Datos iniciales insertados correctamente!")

if __name__ == '__main__':
    insertar_datos_iniciales()