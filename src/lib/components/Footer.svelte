<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">Chimborazo</h3>
        <p class="footer-text">
          Una exploración educativa sobre por qué este volcán ecuatoriano está más cerca del Sol 
          que cualquier otra montaña en la Tierra.
        </p>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Datos</h4>
        <ul class="footer-links">
          <li>Altura: 6,263 m</li>
          <li>Ubicación: Ecuador</li>
          <li>Distancia al centro: 6,384.4 km</li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-subtitle">Proyecto</h4>
        <p class="footer-text">
          Visualización educativa interactiva usando CSS 3D Transforms.
          <br />
          Sin WebGL requerido.
        </p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>© 2024 Chimborazo Education Project</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #1a1a2e;
    color: #fff;
    padding: 3rem 2rem 1.5rem;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .footer-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4a90e2;
    margin-bottom: 1rem;
  }
  
  .footer-subtitle {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #fff;
  }
  
  .footer-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    padding: 0.5rem 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      grid-template-columns: 1fr;
    }
  }
</style>

