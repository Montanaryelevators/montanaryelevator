'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const mobileNav = document.querySelector('.mobile-nav');
      const menuIcon = document.querySelector('.menu-icon');
      
      if (mobileNav && !mobileNav.contains(event.target as Node) && 
          event.target !== menuIcon && !menuIcon?.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Function to handle navigation with hash
  const handleNavigation = (sectionId: string) => {
    if (pathname !== '/') {
      // Navigate to home page with hash using router
      router.push(`/#${sectionId}`);
    } else {
      // If we're already on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Function to handle regular page navigation
  const handlePageNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="header" className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-3">
          <div className="header-left d-flex align-items-center gap-3">
            <img src="/images/cloudflare_img/favicon.ico" alt="Montanary Elevators Logo" className="img-fluid" />
            <Link href="/" className="logo">Montanary Elevators</Link>
          </div>
          
          <div className="menu-icon d-lg-none" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </div>
          
          <nav className={`mobile-nav ${isMobileMenuOpen ? 'd-block' : 'd-none'}`}>
            <ul>
              <li><Link href="/" onClick={() => handlePageNavigation('/')}><i className="fas fa-home"></i> Home</Link></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavigation('about'); }}><i className="fas fa-info-circle"></i> About Us</a></li>
              <li><a href="#senior-friendly" onClick={(e) => { e.preventDefault(); handleNavigation('senior-friendly'); }}><i className="fas fa-wheelchair"></i> Senior-Friendly</a></li>
              <li><a href="#tech-advanced" onClick={(e) => { e.preventDefault(); handleNavigation('tech-advanced'); }}><i className="fas fa-microchip"></i> Tech-Advanced</a></li>
              <li><a href="#products" onClick={(e) => { e.preventDefault(); handleNavigation('products'); }}><i className="fas fa-box-open"></i> Products</a></li>
              <li><Link href="/pages/videos" onClick={() => handlePageNavigation('/pages/videos')}><i className="fas fa-video"></i> Videos</Link></li>
              <li><a href="#projects" onClick={(e) => { e.preventDefault(); handleNavigation('projects'); }}><i className="fas fa-project-diagram"></i> Projects</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}><i className="fas fa-envelope"></i> Contact</a></li>
            </ul>
          </nav>
          
          <nav className="desktop-nav d-none d-lg-flex">
            <Link href="/" onClick={() => handlePageNavigation('/')}>Home</Link>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigation('about'); }}>About Us</a>
            <a href="#senior-friendly" onClick={(e) => { e.preventDefault(); handleNavigation('senior-friendly'); }}>Senior-Friendly</a>
            <a href="#tech-advanced" onClick={(e) => { e.preventDefault(); handleNavigation('tech-advanced'); }}>Tech-Advanced</a>
            <a href="#products" onClick={(e) => { e.preventDefault(); handleNavigation('products'); }}>Products</a>
            <Link href="/pages/videos" onClick={() => handlePageNavigation('/pages/videos')}>Videos</Link>
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavigation('projects'); }}>Projects</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}>Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
}