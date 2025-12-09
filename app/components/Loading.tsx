'use client';

import { useState, useEffect, useRef } from 'react';

const AIElevatorLoading = () => {
  const [progress, setProgress] = useState(0);
  const [currentFloor, setCurrentFloor] = useState('G');
  const [aiStatus, setAiStatus] = useState('Initializing AI Systems...');
  const [elevatorState, setElevatorState] = useState('idle');
  const [displayMessages, setDisplayMessages] = useState<string[]>([]);
  const [energyEfficiency, setEnergyEfficiency] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // AI elevator floor names with benefits
  const floors = [
    { id: 'G', name: 'Ground', feature: 'Accessibility Mode', color: '#FF6B35' },
    { id: '1', name: 'Floor 1', feature: 'Voice Control', color: '#FF7F50' },
    { id: '2', name: 'Floor 2', feature: 'Predictive AI', color: '#FF8C42' },
    { id: '3', name: 'Floor 3', feature: 'Energy Saving', color: '#FFA07A' },
    { id: '4', name: 'Floor 4', feature: 'Smart Routing', color: '#FFB347' },
    { id: '5', name: 'Floor 5', feature: 'Face Recognition', color: '#4A90E2' },
    { id: '6', name: 'Floor 6', feature: 'IoT Integration', color: '#5D9CEC' },
    { id: '7', name: 'Floor 7', feature: 'Cloud Analytics', color: '#70A8FF' },
    { id: '8', name: 'Floor 8', feature: 'Predictive Maintenance', color: '#83B6FF' },
    { id: '9', name: 'Floor 9', feature: 'Emergency AI', color: '#96C4FF' },
    { id: '10', name: 'Penthouse', feature: 'Full AI Control', color: '#A9D2FF' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const loadSequence = () => {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          
          // Update floor based on progress
          const floorIndex = Math.floor(newProgress / 10);
          if (floorIndex <= 10) {
            setCurrentFloor(floors[floorIndex].id);
            setAiStatus(`Activating: ${floors[floorIndex].feature}`);
            
            // Add message to display
            if (newProgress % 20 === 0) {
              setDisplayMessages(prev => [
                `✓ ${floors[floorIndex].feature} enabled`,
                ...prev.slice(0, 3)
              ]);
            }
          }
          
          // Update elevator state
          if (newProgress % 25 === 0) {
            setElevatorState('doors-opening');
            setTimeout(() => setElevatorState('doors-closing'), 500);
            setTimeout(() => setElevatorState('moving'), 1000);
          }
          
          // Update energy efficiency
          setEnergyEfficiency(Math.min(100, newProgress * 0.8));
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setElevatorState('arrived');
            setAiStatus('System Ready ✓');
            // Add final messages
            setDisplayMessages(prev => [
              '✓ AI Elevator System Online',
              '✓ All Safety Systems Active',
              '✓ Ready for Installation',
              ...prev
            ].slice(0, 5));
          }
          
          return newProgress;
        });
      }, 40);
    };
    
    loadSequence();
    
    return () => clearInterval(interval);
  }, []);

  // Draw particle effect for AI visualization
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];
    
    // Create particles with orange-blue gradient
    for (let i = 0; i < 60; i++) {
      const isOrange = Math.random() > 0.5;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: isOrange 
          ? `hsl(${25 + Math.random() * 10}, 100%, ${60 + Math.random() * 10}%)`
          : `hsl(${210 + Math.random() * 10}, 100%, ${60 + Math.random() * 10}%)`
      });
    }
    
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(255, 107, 53, 0.1)');
      gradient.addColorStop(0.5, 'rgba(74, 144, 226, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 107, 53, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw neural network connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, p1.color.replace(')', ', 0.3)').replace('hsl', 'hsla'));
            gradient.addColorStop(1, p2.color.replace(')', ', 0.3)').replace('hsl', 'hsla'));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [progress]);

  return (
    <div className="ai-elevator-loading" ref={containerRef}>
      {/* Background Elements */}
      <canvas ref={canvasRef} className="ai-canvas" />
      
      {/* Scan Lines Effect */}
      <div className="scan-lines"></div>
      
      {/* Grid Pattern */}
      <div className="grid-pattern"></div>
      
      <div className="loading-content">
        {/* Main Container with Better Layout */}
        <div className="main-container">
          
          {/* Left Column - 3D Elevator & AI Orb */}
          <div className="left-column">
            <div className="elevator-section">
              <div className="section-header">
                <i className="fas fa-cube"></i>
                <h3>3D ELEVATOR SIMULATION</h3>
              </div>
              
              <div className="elevator-hologram">
                <div className={`elevator-3d ${elevatorState}`}>
                  <div className="elevator-frame">
                    <div className="door left"></div>
                    <div className="door right"></div>
                    <div className="interior">
                      <div className="ai-panel">
                        <div className="neural-grid"></div>
                        <div className="data-stream">
                          {[...Array(12)].map((_, i) => (
                            <div key={i} className="data-bit"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floor Counter */}
                  <div className="floor-counter">
                    <div className="counter-label">FLOOR</div>
                    <div className="counter-value">{currentFloor}</div>
                  </div>
                </div>
                
                {/* AI Orb */}
                <div className="ai-orb">
                  <div className="orb-core">
                    <div className="orb-inner"></div>
                  </div>
                  <div className="orb-ring ring-1"></div>
                  <div className="orb-ring ring-2"></div>
                  <div className="orb-ring ring-3"></div>
                </div>
              </div>
              
              {/* Trust Badge - ADDED THIS SECTION */}
              <div className="trust-badge">
                <div className="badge-content">
                  <div className="badge-icon">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div className="badge-text">
                    <div className="badge-title">TRUSTED EXPERIENCE</div>
                    <div className="badge-stats">
                      <span className="stat-item">
                        <i className="fas fa-calendar-check"></i>
                        2 Years Completed
                      </span>
                      <span className="stat-item">
                        <i className="fas fa-smile"></i>
                        20+ Happy Clients
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="vertical-progress">
                <div className="progress-track">
                  <div 
                    className="progress-indicator"
                    style={{ height: `${progress}%` }}
                  ></div>
                </div>
                <div className="progress-label">
                  <span className="percentage">{progress}%</span>
                  <span className="text">SYSTEM LOAD</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - AI Status & Features */}
          <div className="right-column">
            
            {/* AI Status Panel */}
            <div className="status-panel">
              <div className="panel-header">
                <div className="header-left">
                  <i className="fas fa-brain"></i>
                  <h2>MONTANARY AI ELEVATOR</h2>
                </div>
                <div className="header-right">
                  <div className="version">v2.5.1</div>
                </div>
              </div>
              
              <div className="status-content">
                <div className="status-item large">
                  <div className="status-label">AI STATUS</div>
                  <div className="status-value typing">{aiStatus}</div>
                </div>
                
                <div className="status-grid">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-bolt"></i>
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{energyEfficiency.toFixed(1)}%</div>
                      <div className="stat-label">ENERGY EFFICIENCY</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-shield-alt"></i>
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">99.9%</div>
                      <div className="stat-label">SAFETY RATING</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">0.{progress.toFixed(1)}s</div>
                      <div className="stat-label">RESPONSE TIME</div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="fas fa-cloud"></i>
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">ONLINE</div>
                      <div className="stat-label">CLOUD STATUS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Console */}
            <div className="ai-console">
              <div className="console-header">
                <div className="header-left">
                  <i className="fas fa-terminal"></i>
                  <span>AI SYSTEM LOG</span>
                </div>
                <div className="header-right">
                  <div className="connection-status">
                    <span className="dot"></span>
                    <span>CONNECTED</span>
                  </div>
                </div>
              </div>
              <div className="console-messages">
                {displayMessages.map((msg, index) => (
                  <div key={index} className="console-message">
                    <span className="timestamp">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                    <span className="message">{msg}</span>
                    <span className="blinker">▋</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Features Panel */}
            <div className="features-panel">
              <div className="panel-header">
                <i className="fas fa-layer-group"></i>
                <h3>AI FEATURES ACTIVATION</h3>
              </div>
              <div className="features-grid">
                {floors.slice(0, 6).map((floor) => (
                  <div 
                    key={floor.id} 
                    className={`feature-item ${parseInt(currentFloor) >= parseInt(floor.id) ? 'active' : ''}`}
                    style={{
                      '--feature-color': floor.color
                    } as React.CSSProperties}
                  >
                    <div className="feature-icon">
                      <div className="icon-bg"></div>
                      <span className="floor-number">{floor.id}</span>
                    </div>
                    <div className="feature-details">
                      <div className="feature-name">{floor.feature}</div>
                      <div className="feature-status">
                        {parseInt(currentFloor) >= parseInt(floor.id) ? (
                          <>
                            <span className="status-dot active"></span>
                            <span className="status-text">ACTIVE</span>
                          </>
                        ) : (
                          <>
                            <span className="status-dot"></span>
                            <span className="status-text">PENDING</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Banner */}
        <div className="bottom-banner">
          <div className="banner-content">
            <div className="tagline">
              <h1>ELEVATING THE FUTURE</h1>
              <p>Experience Next-Generation AI-Powered Vertical Transportation</p>
            </div>
            
            {/* Experience Stats - ADDED THIS SECTION */}
            <div className="experience-stats">
              <div className="experience-card">
                <div className="exp-icon">
                  <i className="fas fa-history"></i>
                </div>
                <div className="exp-details">
                  <div className="exp-value">2 Years</div>
                  <div className="exp-label">Industry Experience</div>
                </div>
              </div>
              <div className="experience-card">
                <div className="exp-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="exp-details">
                  <div className="exp-value">20+</div>
                  <div className="exp-label">Happy Clients</div>
                </div>
              </div>
            </div>
            
            <div className="company-info">
              <div className="logo">
                <i className="fas fa-mountain"></i>
                <span>MONTANARY</span>
              </div>
              <div className="slogan">Smart • Safe • Sustainable</div>
            </div>
          </div>
          
          {/* Loading Bar */}
          <div className="loading-bar">
            <div 
              className="loading-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="loading-glow"></div>
            </div>
            <div className="loading-text">
              INITIALIZING SYSTEM COMPONENTS • {progress}% COMPLETE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIElevatorLoading;
