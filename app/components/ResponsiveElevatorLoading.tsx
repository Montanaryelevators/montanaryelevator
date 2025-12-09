'use client';

import { useState, useEffect } from 'react';
import AIElevatorLoading from './Loading';
import MobileAIElevatorLoading from './MobileAIElevatorLoading';
import './loading.css'
const ResponsiveElevatorLoading = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileAIElevatorLoading />;
  }
  
  return <AIElevatorLoading />;
};

export default ResponsiveElevatorLoading;
