'use client';

import { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import SeniorFriendly from './components/SeniorFriendly';
import TechAdvanced from './components/TechAdvanced';
import Features from './components/Features';
import ElevatorSpecifications from './components/ElevatorSpecifications';
import Products from './components/Products';
import Projects from './components/Projects';
import Contact from './components/Contact';
import EnquiryForm from './components/EnquiryForm';

export default function Home() {
  useEffect(() => {
    // Initialize animations when elements come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate__animated');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          const animationClass = element.classList[1];
          element.classList.add('animate__' + animationClass.split('animate__')[1]);
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  const openFullscreen = (imageSrc: string) => {
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.style.position = 'fixed';
    fullscreenDiv.style.top = '0';
    fullscreenDiv.style.left = '0';
    fullscreenDiv.style.width = '100%';
    fullscreenDiv.style.height = '100%';
    fullscreenDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    fullscreenDiv.style.display = 'flex';
    fullscreenDiv.style.justifyContent = 'center';
    fullscreenDiv.style.alignItems = 'center';
    fullscreenDiv.style.zIndex = '10000';
    fullscreenDiv.style.cursor = 'zoom-out';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.objectFit = 'contain';
    img.style.borderRadius = '5px';

    fullscreenDiv.appendChild(img);

    fullscreenDiv.addEventListener('click', function() {
      document.body.removeChild(fullscreenDiv);
    });

    document.body.appendChild(fullscreenDiv);
  };

  return (
    <>
      <Hero />
      <About />
      <SeniorFriendly />
      <TechAdvanced />
      <Features />
      <ElevatorSpecifications openFullscreen={openFullscreen} />
      <Products />
      <Projects />
      <Contact />
      <EnquiryForm />
    </>
  );
}