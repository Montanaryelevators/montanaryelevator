'use client';

import { useEffect, useState } from 'react';

interface Lift {
  id: number;
  name: string;
  image: string;
  material: string;
  features: string[];
  applications: string[];
  advantages: string[];
}

export default function LiftCabin() {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenName, setFullscreenName] = useState<string>('');

  const lifts: Lift[] = [
    {
      id: 1,
      name: "SS Cabin (Stainless Steel Cabin)",
      image: "/images/src/sscabin.jpg",
      material: "Made from high-grade stainless steel (SS 304 or SS 316), known for its durability, corrosion resistance, and longevity.",
      features: [
        "Rust-resistant: Suitable for humid and harsh environments.",
        "Easy to clean: Stainless steel surfaces are easy to wipe and maintain.",
        "Modern Look: Sleek, shiny finish that reflects light and adds a contemporary feel",
        "Durability: Resists dents, scratches, and wear over time."
      ],
      applications: [
        "Elevators in industrial buildings.",
        "Commercial settings like malls, hospitals, and offices.",
        "Modern residential spaces needing a minimalistic look."
      ],
      advantages: [
        "Requires minimal maintenance.",
        "Hygienic and germ-resistant, making it ideal for hospitals or public spaces."
      ]
    },
    {
      id: 2,
      name: "Gold Glass Cabin",
      image: "/images/src/goldglasscabin.jpg",
      material: "Crafted using tempered or laminated glass with a gold-tinted coating, offering both strength and a premium finish.",
      features: [
        "Aesthetic Appeal: Luxurious gold tint adds a sophisticated, premium feel to the cabin.",
        "Strength: Glass is tempered for durability and safety.",
        "Reflective Surface: Enhances brightness and makes the cabin feel more spacious."
      ],
      applications: [
        "Premium hotels, luxury offices, and elite residential spaces.",
        "VIP or executive buildings needing a statement design."
      ],
      advantages: [
        "Enhances interior décor with its rich, reflective appearance.",
        "Allows natural light to flow through, providing a brighter environment.",
        "Creates a high-end ambiance for special spaces."
      ]
    },
    {
      id: 3,
      name: "Premium Glass Cabin",
      image: "/images/src/premiumglasscabin.jpg",
      material: "High-quality tempered or laminated glass for safety and durability.",
      features: [
        "Transparency: Allows visibility and natural light for a modern, open design.",
        "Safety: Laminated glass ensures strength, while tempered glass resists shattering.",
        "Clean Design: Smooth, polished edges provide a premium feel."
      ],
      applications: [
        "Luxury residential buildings.",
        "Corporate offices requiring elegant interiors.",
        "Elevators with scenic views."
      ],
      advantages: [
        "Enhances the look of high-end spaces.",
        "Durable, clean, and modern design.",
        "Maintains a sense of openness with visibility."
      ]
    },
    {
      id: 4,
      name: "Luxury Marble Cabin",
      image: "/images/src/luxurymarblecabin1.jpg",
      material: "Panels made from natural marble, engineered marble, or marble laminate.",
      features: [
        "Luxury Appeal: Marble provides a rich, opulent look.",
        "Unique Designs: Veining patterns create natural, timeless beauty.",
        "Durability: Resistant to scratches and wear"
      ],
      applications: [
        "High-end residential elevators.",
        "Five-star hotels and luxury buildings.",
        "Offices needing an upscale appearance."
      ],
      advantages: [
        "Adds luxury and grandeur.",
        "Long-lasting material with easy maintenance.",
        "Enhances value and aesthetics of interiors."
      ]
    },
    {
      id: 5,
      name: "Wooden Finish Cabin",
      image: "/images/src/woodenfinishcabin.jpg",
      material: "Engineered wood, high-quality veneer, or wood-textured laminates. Optional combination with stainless steel or glass panels for added durability and design balance.",
      features: [
        "Natural Appeal: Replicates the warmth and elegance of real wood.",
        "Variety of Finishes: Available in various wood grains (oak, walnut, teak, maple) and shades.",
        "Durability: Engineered wood and laminates are treated to resist moisture, warping, and scratches.",
        "Modern Fusion: Often combined with steel or glass for a contemporary look."
      ],
      applications: [
        "Luxury residential buildings, hotels, executive offices, and heritage interiors.",
        "Elevators or cabins where traditional and modern styles blend."
      ],
      advantages: [
        "Provides a cozy and sophisticated ambiance.",
        "Durable and easy to clean compared to natural wood.",
        "Enhances interior décor with a premium touch."
      ]
    },
    {
      id: 6,
      name: "Black Pearl Cabin",
      image: "/images/src/blackpearlcabin.jpg",
      material: "High-quality stainless steel with a black pearl finish (PVD-coated or brushed). Can include glass panels with a smoky tint or black accents for an elegant look.",
      features: [
        "Sophisticated Look: Deep black finish gives a modern, bold, and luxurious appearance.",
        "Anti-Fingerprint: The matte or pearl finish reduces visible fingerprints and smudges.",
        "Modern Elegance: Suits contemporary, minimalist interiors",
        "Durability: PVD-coating ensures resistance to wear, corrosion, and fading."
      ],
      applications: [
        "Corporate offices, premium apartments, luxury hotels, and designer spaces.",
        "Elevators in environments demanding modern sophistication."
      ],
      advantages: [
        "Offers a sleek, modern design with a bold aesthetic.",
        "Durable, low-maintenance finish.",
        "Reduces glare compared to glossy surfaces."
      ]
    },
    {
      id: 7,
      name: "Champagne Finish Cabin",
      image: "/images/src/champangefinishcabin.png",
      material: "Stainless steel with a champagne gold PVD finish for a soft, elegant gold tone. Can include textured patterns or frosted glass accents for added luxury",
      features: [
        "Subtle Luxury: Champagne gold offers a softer, understated alternative to bright gold.",
        "Versatility: Complements wood, glass, or marble accents.",
        "Elegant Finish: Suitable for creating a refined, premium atmosphere.",
        "Durability: PVD-coated panels ensure resistance to scratches, corrosion, and tarnishing."
      ],
      applications: [
        "Luxury hotels, corporate offices, high-end apartments, and event spaces.",
        "Elevators in environments requiring a sophisticated, elegant touch."
      ],
      advantages: [
        "Enhances interiors with subtle opulence.",
        "Long-lasting finish with minimal maintenance.",
        "Combines luxury with modern design elements."
      ]
    }
  ];

  useEffect(() => {
    const animateOnScroll = () => {
      const liftElements = document.querySelectorAll('.lift');
      
      liftElements.forEach(lift => {
        const rect = lift.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          lift.classList.add('animate__fadeInUp');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const openFullscreen = (image: string, name: string) => {
    setFullscreenImage(image);
    setFullscreenName(name);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    setFullscreenName('');
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="lift-cabin-page">
      <style jsx>{`
        .lift-cabin-page {
          font-family: 'Poppins', sans-serif;
          background-color: #f8f9fa;
          color: #34495e;
          overflow-x: hidden;
          padding-top: 100px; /* Increased padding to prevent header overlap */
          min-height: 100vh;
        }

        .page-title {
          text-align: center;
          margin: 0 0 40px 0; /* Reduced top margin since we have padding-top */
          color: #2c3e50;
          padding: 20px 0;
        }

        .page-title h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          position: relative;
          display: inline-block;
        }

        .page-title h1::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, #f39c12, #e74c3c);
          border-radius: 2px;
        }

        .page-title p {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        /* Lift Section Styles */
        .lift {
          margin-bottom: 60px; /* Increased margin between lifts */
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: white;
          opacity: 0;
          transform: translateY(30px);
        }
        
        .lift.animate__fadeInUp {
          opacity: 1;
          transform: translateY(0);
        }
        
        .lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        
        .lift img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          transition: transform 0.5s ease;
          padding: 20px; /* Increased padding */
          border-radius: 10px;
          margin: 15px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          cursor: pointer;
        }
        
        .img-contain {
          object-fit: contain !important;
          background-color: #f8f9fa;
          padding: 25px; /* Increased padding */
        }
        
        .lift-content {
          padding: 35px; /* Increased padding */
        }
        
        .lift h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 20px; /* Increased margin */
          position: relative;
          padding-bottom: 15px; /* Increased padding */
        }
        
        .lift h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: #f39c12;
        }
        
        .lift h4 {
          font-size: 1.2rem;
          color: #e74c3c;
          margin: 25px 0 15px 0; /* Increased margins */
          font-weight: 600;
        }
        
        .lift p {
          color: #34495e;
          line-height: 1.7;
          margin-bottom: 20px; /* Increased margin */
          font-size: 1rem;
        }
        
        .lift ul {
          padding-left: 25px; /* Increased padding */
          margin-bottom: 20px;
        }
        
        .lift ul li {
          margin-bottom: 10px; /* Increased margin */
          position: relative;
          list-style-type: none;
          padding-left: 30px; /* Increased padding */
          color: #34495e;
          line-height: 1.6;
        }
        
        .lift ul li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #f39c12;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        /* Alternate Layout */
        .lift:nth-child(even) .row {
          flex-direction: row-reverse;
        }
        
        /* Fullscreen View */
        .fullscreen {
          display: ${fullscreenImage ? 'flex' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.9);
          z-index: 2000;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        
        .fullscreen img {
          max-width: 90%;
          max-height: 90%;
          border: 5px solid white;
          border-radius: 10px;
          box-shadow: 0 0 30px rgba(255,255,255,0.2);
        }
        
        .fullscreen .close {
          position: absolute;
          top: 30px;
          right: 30px;
          color: white;
          font-size: 2.5rem;
          cursor: pointer;
          transition: transform 0.3s ease;
          z-index: 2001;
        }
        
        .fullscreen .close:hover {
          transform: rotate(90deg);
          color: #f39c12;
        }
        
        .fullscreen .lift-name {
          position: absolute;
          bottom: 30px;
          left: 0;
          width: 100%;
          text-align: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          text-shadow: 0 2px 5px rgba(0,0,0,0.5);
          z-index: 2001;
          padding: 0 20px;
        }
        
        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .lift img {
            height: 300px;
          }
          
          .page-title h1 {
            font-size: 2rem;
          }
          
          .lift-cabin-page {
            padding-top: 90px;
          }
        }
        
        @media (max-width: 768px) {
          .lift {
            margin-bottom: 40px;
          }
          
          .lift img {
            height: 250px;
            margin: 10px;
            padding: 15px;
          }
          
          .img-contain {
            height: auto !important;
            max-height: 300px;
            padding: 20px;
          }
          
          .lift-content {
            padding: 25px;
          }
          
          .lift h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
          }
          
          .lift:nth-child(even) .row {
            flex-direction: column;
          }
          
          .page-title {
            margin: 0 0 30px 0;
          }
          
          .page-title h1 {
            font-size: 1.8rem;
          }
          
          .lift-cabin-page {
            padding-top: 80px;
          }
        }

        @media (max-width: 576px) {
          .lift img {
            height: 200px;
            padding: 10px;
            margin: 8px;
          }
          
          .lift-content {
            padding: 20px;
          }
          
          .page-title h1 {
            font-size: 1.6rem;
          }
          
          .lift h3 {
            font-size: 1.3rem;
          }
          
          .lift-cabin-page {
            padding-top: 70px;
          }
        }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Page Title */}
      <div className="page-title">
        <div className="container">
          <h1>Lift Cabins</h1>
          <p>Explore our premium range of elevator cabins designed for comfort, safety, and style</p>
        </div>
      </div>

      <div className="container">
        {lifts.map((lift, index) => (
          <div key={lift.id} className="lift animate__animated">
            <div className="row g-0">
              <div className="col-lg-6">
                <img 
                  src={lift.image} 
                  alt={lift.name}
                  className="img-contain"
                  onClick={() => openFullscreen(lift.image, lift.name)}
                />
              </div>
              <div className="col-lg-6">
                <div className="lift-content">
                  <h3>{lift.name}</h3>
                  <h4>Material:</h4>
                  <p>{lift.material}</p>
                  <h4>Features:</h4>
                  <ul>
                    {lift.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <h4>Applications:</h4>
                  <ul>
                    {lift.applications.map((application, idx) => (
                      <li key={idx}>{application}</li>
                    ))}
                  </ul>
                  <h4>Advantages:</h4>
                  <ul>
                    {lift.advantages.map((advantage, idx) => (
                      <li key={idx}>{advantage}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen View */}
      <div className="fullscreen" onClick={closeFullscreen}>
  <span className="close" onClick={closeFullscreen}>
    <i className="fas fa-times"></i>
  </span>
  {fullscreenImage && (
    <img src={fullscreenImage} alt={fullscreenName || "Full Screen View"} />
  )}
  <div className="lift-name">{fullscreenName}</div>
</div>

    </div>
  );
}