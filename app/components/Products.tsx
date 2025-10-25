export default function Products() {
  return (
    <section id="products" className="section py-5">
      <div className="container">
        <h2 className="section-title text-center">Our Products</h2>
        
        <div className="services-grid">
          <div className="service-item" style={{backgroundImage: "url('/images/products_cloudflare/liftdoor.jpg')"}}>
            <div className="content">
              <h3>Accessible Doors</h3>
              <p>Wider openings with slow-close mechanisms for safety</p>
              <a href="/pages/liftdoors" className="read-more">See Options</a>
            </div>
          </div>
          
          <div className="service-item" style={{backgroundImage: "url('/images/products_cloudflare/liftcabin1.jpg')"}}>
            <div className="content">
              <h3>Smart Cabins</h3>
              <p>Voice-controlled cabins with customizable lighting</p>
              <a href="/pages/liftcabin" className="read-more">Explore</a>
            </div>
          </div>
          
          <div className="service-item" style={{backgroundImage: "url('/images/products_cloudflare/touchscreen.jpg')"}}>
            <div className="content">
              <h3>Touch screen</h3>
              <p>High-contrast displays with adjustable text sizes</p>
            </div>
          </div>
          
          <div className="service-item" style={{backgroundImage: "url('/images/products_cloudflare/accesscard1.jpg')"}}>
            <div className="content">
              <h3>Biometric Access</h3>
              <p>Fingerprint and facial recognition for secure access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}