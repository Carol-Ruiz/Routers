// src/Mision.jsx
import React from "react";
import Navbar from "./Navbar";

const Mision = () => {
  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f9" }}>
      <Navbar />

      <section
        style={{
          padding: "80px 20px",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#4B0082",
            marginBottom: "20px",
          }}
        >
          Nuestra Misión
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "#333",
            marginBottom: "30px",
          }}
        >
          En <strong>Synapse</strong>, nuestra misión es impulsar la innovación y la
          tecnología para conectar ideas, personas y soluciones que transformen
          el futuro.  
          Creemos en el poder de la colaboración, el aprendizaje
          continuo y la construcción de herramientas que ayuden a crear un mundo
          más inteligente e inclusivo.
        </p>

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginTop: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "600",
              color: "#6A0DAD",
              marginBottom: "15px",
            }}
          >
            Nuestros Valores
          </h2>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              textAlign: "left",
              fontSize: "1.1rem",
              color: "#444",
              lineHeight: "1.8",
            }}
          >
            <li>🌍 Innovación para un futuro sostenible</li>
            <li>🤝 Colaboración como base del crecimiento</li>
            <li>💡 Creatividad y pensamiento crítico</li>
            <li>📚 Aprendizaje continuo y accesible</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Mision;