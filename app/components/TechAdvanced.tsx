export default function TechAdvanced() {
  return (
    <section id="tech-advanced" className="section py-5 tech-section text-white">
      <div className="container">
        <h2 className="section-title text-center">Tech-Advanced Features</h2>
        <p className="text-center mb-5">Cutting-edge technology for the modern user</p>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="text-center p-4">
              <div className="generation-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI Assistance</h3>
              <p>Voice-activated controls and predictive destination selection</p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="text-center p-4">
              <div className="generation-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Smart App Control</h3>
              <p>Control your elevator remotely with our smartphone app</p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="text-center p-4">
              <div className="generation-icon">
                <i className="fas fa-hand-paper"></i>
              </div>
              <h3>Touchless Operation</h3>
              <p>Gesture and motion controls for hygienic, contactless use</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}