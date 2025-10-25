'use client';

import { useEffect } from 'react';

interface Video {
  id: number;
  title: string;
  src: string;
  poster: string;
}

export default function Videos() {
  const videos: Video[] = [
    {
      id: 1,
      title: "Home Lift",
      src: "/videos/vsrc/homelift1.mp4",
      poster: "/images/video-thumbnails/homelift.jpg"
    },
    {
      id: 2,
      title: "Latest Touch Pad Model",
      src: "/videos/vsrc/tochpadmodel.mp4",
      poster: "/images/video-thumbnails/touchpad.jpg"
    },
    {
      id: 3,
      title: "Ms Auto Door",
      src: "/videos/vsrc/Msautodoor.mp4",
      poster: "/images/video-thumbnails/autodoor.jpg"
    },
    {
      id: 4,
      title: "Latest Automatic Swing Door",
      src: "/videos/vsrc/latestautomaticswingdoor.mp4",
      poster: "/images/video-thumbnails/swingdoor.jpg"
    },
    {
      id: 5,
      title: "Wood Color Cabin",
      src: "/videos/vsrc/woodcolorcabin.mp4",
      poster: "/images/video-thumbnails/woodcabin.jpg"
    },
    {
      id: 6,
      title: "Motor Assembling",
      src: "/videos/vsrc/motorassembling.mp4",
      poster: "/images/video-thumbnails/motor.jpg"
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

  return (
    <div className="videos-page">
      <style jsx>{`
        :root {
          --primary-color: #2c3e50;
          --secondary-color: #e74c3c;
          --accent-color: #f39c12;
          --light-color: #ecf0f1;
          --dark-color: #2c3e50;
          --text-color: #34495e;
        }
        
        .videos-page {
          font-family: 'Poppins', sans-serif;
          background-color: #f8f9fa;
          color: var(--text-color);
          overflow-x: hidden;
        }

        /* Video Section Styles */
        .video-section {
          padding: 80px 0;
          position: relative;
        }

        .video-section h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 50px;
          text-align: center;
          position: relative;
          display: inline-block;
          left: 50%;
          transform: translateX(-50%);
        }

        .video-section h2::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, var(--accent-color), var(--secondary-color));
          border-radius: 2px;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          padding: 0 20px;
        }

        .video-item {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .video-item::before {
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

        .video-item:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .video-item:hover::before {
          opacity: 1;
        }

        .video-item video {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          border-bottom: 3px solid var(--accent-color);
        }

        .video-title {
          padding: 20px;
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          text-align: center;
          background: linear-gradient(135deg, var(--primary-color), var(--dark-color));
          transition: all 0.3s ease;
        }

        .video-item:hover .video-title {
          background: linear-gradient(135deg, var(--secondary-color), #c0392b);
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

        /* Responsive Adjustments */
        @media (max-width: 992px) {
          .video-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
          
          .video-section h2 {
            font-size: 2rem;
          }
        }

        @media (max-width: 768px) {
          .video-section {
            padding: 60px 0;
          }
          
          .video-section h2 {
            font-size: 1.8rem;
            margin-bottom: 40px;
          }
          
          .video-item video {
            height: 200px;
          }
        }

        @media (max-width: 576px) {
          .video-grid {
            grid-template-columns: 1fr;
          }
          
          .video-section h2 {
            font-size: 1.6rem;
          }
        }
      `}</style>

      <section className="video-section" id="videos">
        <div className="container">
          <h2 className="animate__animated animate__fadeIn">Our Videos</h2>
          <div className="video-grid">
            {videos.map((video, index) => (
              <div 
                key={video.id}
                className={`video-item animate__animated animate__fadeInUp ${index > 0 ? `animate__delay-${index % 3}s` : ''}`}
              >
                <video controls poster={video.poster}>
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-title">{video.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}