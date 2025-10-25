interface ElevatorSpecificationsProps {
  openFullscreen: (imageSrc: string) => void;
}

export default function ElevatorSpecifications({ openFullscreen }: ElevatorSpecificationsProps) {
  return (
    <section className="elevator-specifications py-5">
      <div className="container">
        <h2 className="section-title text-center">Elevator Specifications</h2>
        
        <div className="specifications-grid">
          <div className="specification-item animate__animated animate__fadeIn">
            <a href="#" onClick={(e) => { e.preventDefault(); openFullscreen('/images/specification_cloudflare/passengerelevator.jpeg'); }}>
              <img src="/images/specification_cloudflare/passengerelevator.jpeg" alt="Passenger Elevator" className="specification-icon img-fluid" />
            </a>
            <h3>Accessibility Line</h3>
            <p>Designed specifically for seniors with extra-wide cabins, handrails, and emergency features</p>
          </div>
          
          <div className="specification-item animate__animated animate__fadeIn" data-wow-delay="0.1s">
            <a href="#" onClick={(e) => { e.preventDefault(); openFullscreen('/images/specification_cloudflare/homelevator.jpg'); }}>
              <img src="/images/specification_cloudflare/homelevator.jpg" alt="Home Elevator" className="specification-icon img-fluid" />
            </a>
            <h3>Smart Home Line</h3>
            <p>Voice-controlled, app-enabled elevators with smart home integration</p>
          </div>
          
          <div className="specification-item animate__animated animate__fadeIn" data-wow-delay="0.2s">
            <a href="#" onClick={(e) => { e.preventDefault(); openFullscreen('/images/specification_cloudflare/strectherelevator.jpg'); }}>
              <img src="/images/specification_cloudflare/strectherelevator.jpg" alt="Stretcher Elevator" className="specification-icon img-fluid" />
            </a>
            <h3>Health Care Line</h3>
            <p>Medical-grade elevators with stretcher capacity and emergency response systems</p>
          </div>
          
          <div className="specification-item animate__animated animate__fadeIn" data-wow-delay="0.3s">
            <a href="#" onClick={(e) => { e.preventDefault(); openFullscreen('/images/specification_cloudflare/observationelevator.jpg'); }}>
              <img src="/images/specification_cloudflare/observationelevator.jpg" alt="Observation Elevator" className="specification-icon img-fluid" />
            </a>
            <h3>Luxury Tech Line</h3>
            <p>Premium elevators with panoramic views and cutting-edge technology</p>
          </div>
        </div>
      </div>
    </section>
  );
}