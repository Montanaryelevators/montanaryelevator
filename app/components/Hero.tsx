export default function Hero() {
  return (
    <section id="home" className="hero">
      <video className="background-video" autoPlay muted loop>
        <source src="/videos/cloudflare_video/bgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h2 className="animate__animated animate__fadeInDown">Elevating All Generations</h2>
        <p className="animate__animated animate__fadeInUp">Modern solutions for every age - accessible for seniors, advanced for the tech-savvy</p>
        <a href="#contact" className="btn btn-primary animate__animated animate__fadeIn">Get a Free Consultation</a>
      </div>
    </section>
  );
}