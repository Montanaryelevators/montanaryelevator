export default function Projects() {
  return (
    <section id="projects" className="section py-5 bg-light">
      <div className="container">
        <h2 className="section-title text-center">Our Projects</h2>
        
        <div className="services-grid">
          <div className="service-item" style={{backgroundImage: "url('/images/projects_cloudflare/bonamnilayam.jpg')"}}>
            <div className="content">
              <h3>Senior Living Facility</h3>
              <p>Accessible elevators with emergency call systems</p>
              <p>Bhimavaram</p>
            </div>
          </div>
          
          <div className="service-item" style={{backgroundImage: "url('/images/projects_cloudflare/tadepalligudem.jpg')"}}>
            <div className="content">
              <h3>Smart Home Installation</h3>
              <p>Voice-controlled elevators with app integration</p>
              <p>Tadepalligudem</p>
            </div>
          </div>
          
          <div className="service-item" style={{backgroundImage: "url('/images/projects_cloudflare/lasyaprojects.png')"}}>
            <div className="content">
              <h3>Lasya Enclave</h3>
              <p>Hybrid system serving all generations</p>
            </div>
          </div>
          
          <div className="service-item" style={{backgroundImage: "url('/images/projects_cloudflare/project-4.jpg')"}}>
            <div className="content">
              <h3>Tech-Enabled Office</h3>
              <p>Touchless operation with destination dispatch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}