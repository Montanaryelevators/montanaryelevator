export default function SeniorFriendly() {
  return (
    <section id="senior-friendly" className="section py-5 senior-section text-white">
      <div className="container">
        <h2 className="section-title text-center">Senior-Friendly Features</h2>
        <p className="text-center mb-5">Designed with accessibility and ease-of-use for older adults</p>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="text-center p-4">
              <div className="generation-icon">
                <i className="fas fa-wheelchair"></i>
              </div>
              <h3>Wheelchair Accessible</h3>
              <p>Spacious cabins with wide doors and low thresholds for easy wheelchair access</p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="text-center p-4">
              <div className="generation-icon">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <h3>Easy-to-Use Controls</h3>
              <p>Large, high-contrast buttons with tactile feedback and optional voice control</p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="text-center p-4">
              <div className="generation-icon">
                <i className="fas fa-bell"></i>
              </div>
              <h3>Emergency Systems</h3>
              <p>24/7 emergency call buttons with direct connection to monitoring services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}