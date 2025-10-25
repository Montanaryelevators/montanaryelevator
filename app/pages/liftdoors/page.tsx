'use client';

import { useEffect, useState } from 'react';

interface DoorCategory {
  id: number;
  title: string;
  description: string;
  doors: Door[];
  gridColumns?: number;
  maxWidth?: string;
}

interface Door {
  id: number;
  name: string;
  image: string;
}

export default function LiftDoors() {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [fullscreenName, setFullscreenName] = useState<string>('');

  const categories: DoorCategory[] = [
    {
      id: 1,
      title: "Automatic Doors",
      description: "Automatic doors are designed for ease of access and are commonly used in commercial and residential settings. These doors open and close automatically, ensuring convenience and safety for users.",
      doors: [],
      gridColumns: 1,
      maxWidth: "300px"
    },
    {
      id: 2,
      title: "Swing Doors",
      description: "Swing doors are classic and versatile, perfect for traditional and modern spaces. These doors swing open either inward or outward and are often chosen for their aesthetic appeal.",
      doors: [
        { id: 1, name: "Latest Automatic Swing Door", image: "/images/src/swingdoor1.jpg" },
        { id: 2, name: "Swing Door Full Glass", image: "/images/src/homelift2.jpg" }
      ],
      gridColumns: 2,
      maxWidth: "650px"
    },
    {
      id: 3,
      title: "Center Opening Doors",
      description: "Center opening doors provide an elegant solution where space is limited. These doors open from the center, offering symmetry and efficient use of space.",
      doors: [
        { id: 1, name: "Automatic Center Opening Door", image: "/images/src/centeropeningdoor1.jpg" },
        { id: 2, name: "Gold SS Center Opening Auto Door", image: "/images/src/centeropeningdoor2.jpg" },
        { id: 3, name: "SS Plain Automatic Center Opening Door", image: "/images/src/centeropeningdoor3.png" }
      ],
      gridColumns: 3,
      maxWidth: "100%"
    },
    {
      id: 4,
      title: "Big Vision Doors",
      description: "Big vision doors feature large glass panels that offer expansive views and bring in natural light. They are ideal for modern spaces looking to make a bold statement.",
      doors: [
        { id: 1, name: "SS Big Vision Door", image: "/images/src/bigvision1.jpg" },
        { id: 2, name: "SS Automatic Door Big Vision", image: "/images/src/bigvision2.jpg" },
        { id: 3, name: "MS Sliding Door Big Vision", image: "/images/src/homelift3.jpg" }
      ],
      gridColumns: 3,
      maxWidth: "100%"
    },
    {
      id: 5,
      title: "Sliding Doors",
      description: "Sliding doors offer a sleek and modern solution for spaces where traditional swinging doors aren't practical. They are perfect for maximizing space efficiency and enhancing interiors.",
      doors: [],
      gridColumns: 1,
      maxWidth: "300px"
    },
    {
      id: 6,
      title: "Wood Color Doors",
      description: "Wood-colored doors bring warmth and elegance to any setting. These doors mimic the look of natural wood, adding sophistication to both modern and traditional interiors.",
      doors: [
        { id: 1, name: "MS Wood Color Door", image: "/images/src/mswooddoor.jpg" }
      ],
      gridColumns: 1,
      maxWidth: "300px"
    },
    {
      id: 7,
      title: "Collapsible Doors",
      description: "Collapsible doors are ideal for spaces that require security with a compact design. They fold easily and are commonly used in industrial and commercial buildings.",
      doors: [
        { id: 1, name: "Collapsible Door", image: "/images/src/collasablegate.jpeg" }
      ],
      gridColumns: 1,
      maxWidth: "300px"
    }
  ];

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate__animated');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          const animationClass = element.classList[1];
          element.classList.add(animationClass);
        }
      });
    };

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

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
    <div className="lift-doors-page">
      <style jsx>{`
        .lift-doors-page {
          font-family: 'Poppins', sans-serif;
          background-color: #f8f9fa;
          color: #34495e;
          overflow-x: hidden;
          padding-top: 100px;
          min-height: 100vh;
        }

        .page-title {
          text-align: center;
          margin: 0 0 40px 0;
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

        /* Category Styles */
        .category {
          margin: 60px auto;
          padding: 0 15px;
          max-width: 1200px;
          text-align: center; /* Center align all category content */
        }

        .category h2 {
          position: relative;
          display: inline-block;
          margin-bottom: 30px;
          font-size: 2.2rem;
          font-weight: 700;
          color: #2c3e50;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .category h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 4px;
          background: linear-gradient(to right, #f39c12, #e74c3c);
          border-radius: 2px;
        }

        .category p {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 40px;
          color: #34495e;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          text-align: center; /* Ensure paragraph text is centered */
        }

        .lifts {
          display: grid;
          gap: 30px;
          margin-top: 30px;
          justify-items: center; /* Center grid items horizontally */
          justify-content: center; /* Center the entire grid */
          margin-left: auto;
          margin-right: auto;
        }

        .lift {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          max-width: 300px;
          cursor: pointer;
          margin: 0 auto; /* Center individual lift items */
        }

        .lift::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(243, 156, 18, 0.1), rgba(231, 76, 60, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .lift:hover::before {
          opacity: 1;
        }

        .lift img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .lift:hover img {
          transform: scale(1.05);
        }

        .lift-name {
          padding: 20px;
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c3e50;
          text-align: center;
          background-color: white;
          transition: all 0.3s ease;
          line-height: 1.4;
        }

        .lift:hover .lift-name {
          color: #e74c3c;
        }

        /* Fullscreen View */
        .fullscreen {
          display: ${fullscreenImage ? 'flex' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 2000;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          animation: fadeIn 0.3s ease;
        }

        .fullscreen img {
          max-width: 90%;
          max-height: 70%;
          object-fit: contain;
          border: 5px solid white;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: zoomIn 0.4s ease;
        }

        .fullscreen .close {
          position: absolute;
          top: 30px;
          right: 30px;
          font-size: 2.5rem;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 2001;
        }

        .fullscreen .close:hover {
          color: #f39c12;
          transform: rotate(90deg);
        }

        .fullscreen .lift-name {
          color: white;
          font-size: 1.8rem;
          margin-top: 20px;
          text-align: center;
          max-width: 80%;
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
          z-index: 2001;
          padding: 0 20px;
        }

        /* Animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .category h2 {
            font-size: 1.8rem;
          }
          
          .page-title h1 {
            font-size: 2rem;
          }
          
          .lift-doors-page {
            padding-top: 90px;
          }
        }

        @media (max-width: 768px) {
          .category {
            margin: 40px auto;
          }
          
          .category h2 {
            font-size: 1.6rem;
          }
          
          .category p {
            font-size: 1rem;
          }
          
          .lift-name {
            font-size: 1.1rem;
            padding: 15px;
          }
          
          .page-title {
            margin: 0 0 30px 0;
          }
          
          .page-title h1 {
            font-size: 1.8rem;
          }
          
          .lift-doors-page {
            padding-top: 80px;
          }

          /* Adjust grid for mobile */
          .lifts {
            grid-template-columns: 1fr !important;
            max-width: 300px !important;
          }
        }

        @media (max-width: 576px) {
          .lifts {
            grid-template-columns: 1fr;
          }
          
          .fullscreen .lift-name {
            font-size: 1.4rem;
          }
          
          .page-title h1 {
            font-size: 1.6rem;
          }
          
          .lift-doors-page {
            padding-top: 70px;
          }
        }
      `}</style>

      {/* Page Title */}
      <div className="page-title">
        <div className="container">
          <h1>Lift Doors</h1>
          <p>Discover our comprehensive range of elevator doors designed for safety, style, and functionality</p>
        </div>
      </div>

      <main className="container">
        {categories.map((category, index) => (
          <div key={category.id} className="category">
            <h2 className="animate__animated animate__fadeIn">{category.title}</h2>
            <p className="animate__animated animate__fadeIn animate__delay-1s">{category.description}</p>
            <div 
              className="lifts" 
              style={{
                gridTemplateColumns: `repeat(${category.gridColumns}, minmax(300px, 1fr))`,
                maxWidth: category.maxWidth
              }}
            >
              {category.doors.map((door, doorIndex) => (
                <div 
                  key={door.id}
                  className="lift animate__animated animate__fadeInUp"
                  data-name={door.name}
                  onClick={() => openFullscreen(door.image, door.name)}
                >
                  <img src={door.image} alt={door.name} />
                  <div className="lift-name">{door.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

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