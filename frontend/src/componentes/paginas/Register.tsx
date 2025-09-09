// src/Register.tsx
import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // 👈 Importamos el Navbar

// Interfaces para tipado
interface FormData {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

interface FlashMessage {
  type: string;
  message: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [flashMessage, setFlashMessage] = useState<FlashMessage>({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    const newErrors: Errors = { ...errors };
    switch (name) {
      case 'name':
        if (!value.trim()) newErrors.name = 'El nombre es requerido';
        else if (value.trim().length < 2) newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim()))
          newErrors.name = 'El nombre solo debe contener letras';
        else delete newErrors.name;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) newErrors.email = 'El email es requerido';
        else if (!emailRegex.test(value)) newErrors.email = 'Ingresa un email válido';
        else delete newErrors.email;
        break;
      case 'password':
        if (!value) newErrors.password = 'La contraseña es requerida';
        else if (value.length < 8) newErrors.password = 'Debe tener al menos 8 caracteres';
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value))
          newErrors.password = 'Debe incluir mayúsculas, minúsculas y números';
        else delete newErrors.password;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    else if (formData.name.trim().length < 2) newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.name.trim()))
      newErrors.name = 'El nombre solo debe contener letras';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Ingresa un email válido';

    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    else if (formData.password.length < 8) newErrors.password = 'Debe tener al menos 8 caracteres';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      newErrors.password = 'Debe incluir mayúsculas, minúsculas y números';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
    if (flashMessage.message) setFlashMessage({ type: '', message: '' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (validateForm()) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (formData.email === 'exists@test.com') {
          setFlashMessage({ type: 'error', message: 'Este email ya está registrado' });
        } else {
          setFlashMessage({ type: 'success', message: '¡Cuenta creada exitosamente!' });
          setFormData({ name: '', email: '', password: '' });
        }
      } catch {
        setFlashMessage({ type: 'error', message: 'Error del servidor. Intenta de nuevo.' });
      }
    } else {
      setFlashMessage({ type: 'error', message: 'Por favor corrige los errores del formulario' });
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar /> {/* 👈 Navbar reutilizable */}

      <div className="register-page">
        <div className="container-form">
          <div className="formulario">
            <h2 className="create-account">Crear Cuenta</h2>

            <div className="iconos">
              <div className="border-icon"><i className="fab fa-google"></i></div>
              <div className="border-icon"><i className="fab fa-microsoft"></i></div>
              <div className="border-icon"><i className="fab fa-facebook-f"></i></div>
            </div>

            <p className="cuenta-gratis">Crea tu cuenta gratis</p>

            {flashMessage.message && (
              <div className={`alert-message ${flashMessage.type === 'success' ? 'success' : 'error'}`}>
                {flashMessage.message}
              </div>
            )}

            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                required
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                required
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
            >
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </div>

          <div className="welcome-back">
            <div className="message">
              <h2>¡Hola!</h2>
              <p>Si ya tienes una cuenta, inicia sesión aquí</p>
              <Link to="/login">
                <button type="button" className="btn-login">Iniciar Sesión</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
