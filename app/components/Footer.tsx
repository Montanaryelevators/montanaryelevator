export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content text-center">
          <p>&copy; 2024 Montanary Elevators. All Rights Reserved.</p>
          
          <div className="social-icons">
            <a href="https://www.instagram.com/montanary_elevators?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@hitacheelevators6589" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="mailto:montanaryelevators@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        
        <div className="locations-container">
          <div className="branch-info">
            <h4>Main Branch</h4>
            <p>Address: 10-7-34/1, Rangreej Peta, Rajahmundry, E.G. Dist, A.P</p>
            <p>Contact: 9000737676</p>
          </div>
          
          <div className="service-areas">
            <h4>Services Available Areas</h4>
            <ul>
              <li>Razole</li>
              <li>Palacole</li>
              <li>Tadepalligudem</li>
              <li>Narsapur</li>
              <li>Amalapuram</li>
              <li>Bhimavaram</li>
              <li>Kakinada</li>
              <li>E.G & W.G Dist</li>
              <li>Senior Support: 9000737677</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}