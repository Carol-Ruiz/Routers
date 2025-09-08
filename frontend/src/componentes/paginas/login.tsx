// src/Login.tsx
import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

// Interfaces para tipado
interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

interface FlashMessage {
  type: string;
  message: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [flashMessage, setFlashMessage] = useState<FlashMessage>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string) => {
    const newErrors: Errors = { ...errors };
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) newErrors.email = "El email es requerido";
        else if (!emailRegex.test(value)) newErrors.email = "Ingresa un email válido";
        else delete newErrors.email;
        break;
      case "password":
        if (!value) newErrors.password = "La contraseña es requerida";
        else if (value.length < 8) newErrors.password = "Debe tener al menos 8 caracteres";
        else delete newErrors.password;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Ingresa un email válido";

    if (!formData.password) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 8) newErrors.password = "Debe tener al menos 8 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
    if (flashMessage.message) setFlashMessage({ type: "", message: "" });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (validateForm()) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (formData.email === "user@test.com" && formData.password === "Password123") {
          setFlashMessage({ type: "success", message: "¡Inicio de sesión exitoso!" });
          setFormData({ email: "", password: "" });
        } else {
          setFlashMessage({ type: "error", message: "Credenciales inválidas" });
        }
      } catch {
        setFlashMessage({ type: "error", message: "Error del servidor. Intenta de nuevo." });
      }
    } else {
      setFlashMessage({
        type: "error",
        message: "Por favor corrige los errores del formulario",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <div className="register-page">
        <div className="container-form">
          <div className="welcome-back">
            <div className="message">
              <h2>Bienvenido de nuevo</h2>
              <p>¿No tienes cuenta aún? Regístrate aquí</p>
              <Link to="/register">
                <button type="button" className="btn-login">
                  Crear Cuenta
                </button>
              </Link>
            </div>
          </div>

          <div className="formulario">
            <h2 className="create-account">Iniciar Sesión</h2>

            <div className="iconos">
              <div className="border-icon"><i className="fab fa-google"></i></div>
              <div className="border-icon"><i className="fab fa-microsoft"></i></div>
              <div className="border-icon"><i className="fab fa-facebook-f"></i></div>
            </div>

            {flashMessage.message && (
              <div
                className={`alert-message ${
                  flashMessage.type === "success" ? "success" : "error"
                }`}
              >
                {flashMessage.message}
              </div>
            )}

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
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
                className={errors.password ? "error" : ""}
                required
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`submit-btn ${isSubmitting ? "loading" : ""}`}
            >
              {isSubmitting ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
