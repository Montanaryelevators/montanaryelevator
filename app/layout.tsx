'use client';

import { useState, useEffect } from 'react';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ResponsiveElevatorLoading from './components/ResponsiveElevatorLoading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Restore scrolling and position
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
        setShowContent(true);
      }, 300);
    }, 3800); // 3.8 seconds

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    };
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Viewport meta tag for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Bootstrap CSS */}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        
        {/* Animate.css */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        <link rel="icon" href="/images/cloudflare_img/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        {isLoading && <ResponsiveElevatorLoading />}
        
        <div 
          className={`content-wrapper ${showContent ? 'visible' : 'hidden'}`}
          style={{ 
            opacity: showContent ? 1 : 0, 
            transition: 'opacity 0.3s ease',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
          <ChatBot />
          
          {/* Call Button */}
          <a href="tel:+919000737676" className="call-button" title="Call Us">
            <i className="fas fa-phone"></i>
          </a>

          {/* WhatsApp Button */}
          <div id="whatsapp-chat">
            <a href="https://wa.me/919000737676" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Chat" />
            </a>
          </div>

          {/* Bootstrap JS Bundle */}
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" async></script>
        </div>
      </body>
    </html>
  );
}
