'use client';

import { useState, useEffect } from 'react';


const MobileAIElevatorLoading = () => {
  const [progress, setProgress] = useState(0);
  const [currentFloor, setCurrentFloor] = useState('G');
  const [aiStatus, setAiStatus] = useState('Starting AI Systems...');
  const [displayMessages, setDisplayMessages] = useState<string[]>([
    'Welcome to Montanary AI Elevators',
    'Initializing core systems...'
  ]);

  const floors = [
    { id: 'G', feature: 'Basic Systems', icon: '🔄' },
    { id: '1', feature: 'Voice Control', icon: '🎤' },
    { id: '2', feature: 'Predictive AI', icon: '🧠' },
    { id: '3', feature: 'Energy Saving', icon: '⚡' },
    { id: '4', feature: 'Smart Routing', icon: '📍' },
    { id: '5', feature: 'Safety AI', icon: '🛡️' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 1, 100);
        
        // Update floor
        const floorIndex = Math.floor(newProgress / 20);
        if (floorIndex <= 5) {
          setCurrentFloor(floors[floorIndex].id);
          setAiStatus(`Loading: ${floors[floorIndex].feature}`);
          
          // Add new message
          if (newProgress % 25 === 0 && newProgress < 100) {
            setDisplayMessages(prev => [
              `✓ ${floors[floorIndex].feature} activated`,
              ...prev.slice(0, 2)
            ]);
          }
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setAiStatus('System Ready ✓');
          setDisplayMessages(prev => [
            '✓ All systems online',
            '✓ Ready to elevate',
            ...prev
          ]);
        }
        
        return newProgress;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mobile-loading">
      {/* Background Gradient */}
      <div className="mobile-bg"></div>
      
      {/* Main Content */}
      <div className="mobile-content">
        
        {/* Header */}
        <div className="mobile-header">
          <div className="logo">
            <div className="logo-icon">M</div>
            <div className="logo-text">
              <span className="brand">MONTANARY</span>
              <span className="tag">AI Elevators</span>
            </div>
          </div>
          <div className="version">v2.0</div>
        </div>
        
        {/* Trust Badge - ADDED THIS SECTION */}
        <div className="mobile-trust-badge">
          <div className="trust-content">
            <div className="trust-icon">🏆</div>
            <div className="trust-text">
              <div className="trust-title">PROVEN TRACK RECORD</div>
              <div className="trust-stats">
                <span className="trust-stat">
                  <span className="stat-icon">📅</span>
                  2 Years Experience
                </span>
                <span className="trust-stat">
                  <span className="stat-icon">😊</span>
                  20+ Happy Clients
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elevator Visualization */}
        <div className="mobile-elevator">
          {/* Building */}
          <div className="mobile-building">
            {/* Shaft */}
            <div className="shaft">
              {/* Elevator Car */}
              <div 
                className="elevator-car"
                style={{ bottom: `${progress}%` }}
              >
                <div className="car-body">
                  <div className="door left"></div>
                  <div className="door right"></div>
                  <div className="ai-display">
                    <span className="floor-display">{currentFloor}</span>
                    <div className="ai-indicator">
                      <div className="pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floor Indicators */}
              <div className="floor-indicators">
                <div className="floor">5</div>
                <div className="floor">4</div>
                <div className="floor">3</div>
                <div className="floor">2</div>
                <div className="floor">1</div>
                <div className="floor ground">G</div>
              </div>
            </div>
          </div>
          
          {/* Progress Ring */}
          <div className="progress-ring">
            <svg viewBox="0 0 100 100" className="ring-svg">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B35" />
                  <stop offset="100%" stopColor="#4A90E2" />
                </linearGradient>
              </defs>
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                className="ring-bg" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                className="ring-progress"
                style={{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`
                }}
              />
            </svg>
            <div className="ring-content">
              <div className="percentage">{progress}%</div>
              <div className="status">LOADING</div>
            </div>
          </div>
        </div>
        
        {/* AI Status */}
        <div className="mobile-status">
          <div className="status-header">
            <div className="ai-icon">🤖</div>
            <h3>AI STATUS</h3>
          </div>
          <div className="status-text typing">{aiStatus}</div>
          
          {/* Progress Bar */}
          <div className="mobile-progress">
            <div className="progress-track">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-labels">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="mobile-features">
          <div className="features-header">
            <h4>ACTIVATING FEATURES</h4>
          </div>
          <div className="features-grid">
            {floors.map((floor, index) => (
              <div 
                key={floor.id}
                className={`feature ${index * 20 <= progress ? 'active' : ''}`}
              >
                <div className="feature-icon">{floor.icon}</div>
                <div className="feature-info">
                  <div className="feature-name">{floor.feature}</div>
                  <div className="feature-floor">Floor {floor.id}</div>
                </div>
                <div className="feature-status">
                  {index * 20 <= progress ? '✓' : `${index * 20}%`}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Console */}
        <div className="mobile-console">
          <div className="console-header">
            <div className="console-title">
              <span className="dot green"></span>
              SYSTEM LOG
            </div>
          </div>
          <div className="console-messages">
            {displayMessages.map((msg, index) => (
              <div key={index} className="console-message">
                <span className="timestamp">[{index + 1}]</span>
                <span className="message">{msg}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className="mobile-info">
          {/* Experience Stats - ADDED THIS SECTION */}
          <div className="experience-stats">
            <div className="exp-stat">
              <div className="exp-value">2 Years</div>
              <div className="exp-label">Experience</div>
            </div>
            <div className="exp-stat">
              <div className="exp-value">20+</div>
              <div className="exp-label">Happy Clients</div>
            </div>
            <div className="exp-stat">
              <div className="exp-value">99.9%</div>
              <div className="exp-label">Satisfaction</div>
            </div>
          </div>
          
          <div className="loading-text">
            Elevating your experience...
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAIElevatorLoading;
