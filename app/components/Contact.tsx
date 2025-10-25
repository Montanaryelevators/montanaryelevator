export default function Contact() {
  return (
    <section id="contact" className="section py-5">
      <div className="container">
        <h2 className="section-title text-center">Contact Us</h2>
        
        <div className="contact-container">
          <div className="contact-details">
            <p><i className="fas fa-envelope"></i> Email: montanaryelevators@gmail.com</p>
            <p><i className="fas fa-phone"></i> Phone: 9000737676, 8500884447</p>
            <p><i className="fas fa-map-marker-alt"></i> Address: 10-7-34/1 Rangreej Peta, Rajahmundry, E.G. Dist, A.P</p>
            
            <div className="mt-4">
              <h5>Accessibility Hotline</h5>
              <p><i className="fas fa-wheelchair"></i> Special assistance: 9000737677</p>
            </div>
          </div>
          
          <div className="contact-image">
            <img src="/images/cloudflare_img/manager.jpg" alt="Contact Montanary Elevators" className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>
    </section>
  );
}