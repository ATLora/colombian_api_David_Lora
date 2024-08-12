const HireMe = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>¡Contrátame!</h2>
      <p>
        Gracias por la oportunidad de presentar esta prueba, fue un reto lograr
        esto en menos de un día.. Puedes contactarme a través de los siguientes
        enlaces:
      </p>
      <div style={{ marginTop: "20px" }}>
        <a
          href="https://www.linkedin.com/in/david-lora-b1942622b/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", marginBottom: "10px" }}
        >
          Perfil de LinkedIn
        </a>
        <a
          href="lora.david2096@gmail.com"
          style={{ display: "block", marginBottom: "10px" }}
        >
          Enviar Correo
        </a>
        <a
          href="https://virtual-cv-beta.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mi Sitio Web
        </a>
      </div>
    </div>
  );
};

export default HireMe;
