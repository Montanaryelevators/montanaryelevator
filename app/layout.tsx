import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

export const metadata = {
  title: 'Montanary Elevators | Next-Gen Elevator Solutions',
  description: 'Montanary Elevators offers modern, accessible elevator solutions for all generations',
  keywords: 'accessible elevators, smart elevators, modern lifts, senior-friendly elevators, high-tech elevators',
  author: 'Montanary Elevators',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatBot />
        
        {/* Call Button (Left Side) */}
        <a href="tel:+919000737676" className="call-button" title="Call Us">
          <i className="fas fa-phone"></i>
        </a>

        {/* WhatsApp Button (Left Side) */}
        <div id="whatsapp-chat">
          <a href="https://wa.me/919000737676" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Chat" />
          </a>
        </div>

        {/* Bootstrap JS Bundle with Popper */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" async></script>
      </body>
    </html>
  );
}