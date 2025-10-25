export default function Features() {
  return (
    <section className="features py-5">
      <div className="container">
        <h2 className="section-title text-center">Our Commitment to Excellence</h2>
        
        <div className="features-grid">
          <div className="feature-item senior-feature animate__animated animate__fadeInUp" data-wow-delay="0.1s">
            <div className="feature-icon">
              <i className="fas fa-pencil-ruler"></i>
            </div>
            <h3>Accessible Design</h3>
            <p>Thoughtfully designed for seniors with large buttons, handrails, and non-slip flooring</p>
          </div>
          
          <div className="feature-item tech-feature animate__animated animate__fadeInUp" data-wow-delay="0.2s">
            <div className="feature-icon">
              <i className="fas fa-microchip"></i>
            </div>
            <h3>Smart Technology</h3>
            <p>Integration with smart home systems and IoT devices</p>
          </div>
          
          <div className="feature-item senior-feature animate__animated animate__fadeInUp" data-wow-delay="0.3s">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Safety First</h3>
            <p>Advanced safety features including emergency brakes and backup power</p>
          </div>
          
          <div className="feature-item tech-feature animate__animated animate__fadeInUp" data-wow-delay="0.4s">
            <div className="feature-icon">
              <i className="fas fa-fingerprint"></i>
            </div>
            <h3>Biometric Access</h3>
            <p>Secure access with fingerprint or facial recognition technology</p>
          </div>
          
          <div className="feature-item senior-feature animate__animated animate__fadeInUp" data-wow-delay="0.5s">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Dedicated support line with priority response for seniors</p>
          </div>
          
          <div className="feature-item tech-feature animate__animated animate__fadeInUp" data-wow-delay="0.6s">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Energy Efficient</h3>
            <p>AI-powered energy optimization reduces power consumption by up to 40%</p>
          </div>
        </div>
      </div>
    </section>
  );
}