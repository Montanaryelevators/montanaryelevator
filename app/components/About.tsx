export default function About() {
  return (
    <section id="about" className="section py-5">
      <div className="container">
        <h2 className="section-title text-center">About Montanary Elevators</h2>
        
        <div className="about-container row g-4 align-items-center">
          <div className="about-text col-lg-7">
            <h2>Bridging Generations with Elevator Technology</h2>
            <p>At Montanary Elevators, we understand that different generations have different needs. That&apos;s why we&apos;ve developed a range of elevator solutions that combine senior-friendly accessibility with cutting-edge technology for the modern user.</p>
            <p>Our senior-friendly models feature larger buttons, voice assistance, and emergency systems, while our tech-advanced options include smart home integration, touchless controls, and AI-assisted operation.</p>
            <p>Whether you&apos;re looking for accessibility features or smart home integration, we have the perfect elevator solution for your needs.</p>
          </div>
          
          <div className="col-lg-5">
            <div className="about-video-container">
              <video controls>
                <source src="/videos/cloudflare_video/homelift.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}