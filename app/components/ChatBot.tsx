'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [suggestedQuestions, setSuggestedQuestions] = useState<Question[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "What types of elevator cabins do you offer?",
      answer: "We offer 7 types of premium elevator cabins: SS Cabin (Stainless Steel), Gold Glass Cabin, Premium Glass Cabin, Luxury Marble Cabin, Wooden Finish Cabin, Black Pearl Cabin, and Champagne Finish Cabin. Each is designed for specific needs and aesthetics.",
      category: "Products"
    },
    {
      id: 2,
      question: "What are your elevator door options?",
      answer: "We provide Automatic Doors, Swing Doors, Center Opening Doors, Big Vision Doors, Sliding Doors, Wood Color Doors, and Collapsible Doors. Each type offers unique features for different applications.",
      category: "Products"
    },
    {
      id: 3,
      question: "Do you have senior-friendly elevators?",
      answer: "Yes! Our senior-friendly elevators feature wheelchair accessibility, large high-contrast buttons, voice assistance, emergency call systems, and non-slip flooring for enhanced safety and comfort.",
      category: "Features"
    },
    {
      id: 4,
      question: "What tech features do you offer?",
      answer: "Our tech-advanced elevators include AI voice control, smartphone app integration, touchless operation, biometric access, smart home integration, and energy-efficient AI optimization.",
      category: "Features"
    },
    {
      id: 5,
      question: "Where are you located?",
      answer: "Our main branch is at: 10-7-34/1 Rangreej Peta, Rajahmundry, E.G. Dist, A.P. We serve areas including Razole, Palacole, Tadepalligudem, Narsapur, Amalapuram, Bhimavaram, Kakinada, and both E.G & W.G Districts.",
      category: "Contact"
    },
    {
      id: 6,
      question: "How can I contact you?",
      answer: "You can reach us at: Phone: 9000737676, 8500884447 | Email: montanaryelevators@gmail.com | Senior Support: 9000737677. We're available for consultations and support.",
      category: "Contact"
    },
    {
      id: 7,
      question: "Do you provide installation services?",
      answer: "Yes, we provide complete installation services including site assessment, custom design, professional installation, and after-sales support. Our team handles everything from planning to completion.",
      category: "Services"
    },
    {
      id: 8,
      question: "What maintenance services do you offer?",
      answer: "We offer comprehensive maintenance packages including regular inspections, emergency repairs, part replacements, safety checks, and 24/7 technical support to ensure your elevator operates smoothly.",
      category: "Services"
    },
    {
      id: 9,
      question: "Are your elevators energy efficient?",
      answer: "Absolutely! Our elevators feature AI-powered energy optimization that reduces power consumption by up to 40%. We use efficient motors and smart control systems to minimize energy usage.",
      category: "Features"
    },
    {
      id: 10,
      question: "What safety features do you include?",
      answer: "All our elevators include emergency brakes, backup power, emergency call buttons, safety sensors, overload protection, and fire-rated doors for maximum passenger safety.",
      category: "Features"
    },
    {
      id: 11,
      question: "Can I see your elevator videos?",
      answer: "Yes! Visit our Videos page to see demonstrations of home lifts, touch pad models, automatic doors, swing doors, wood color cabins, and motor assembling processes.",
      category: "Products"
    },
    {
      id: 12,
      question: "Do you offer custom designs?",
      answer: "Yes, we specialize in custom elevator solutions. We can customize cabin materials, door styles, control systems, and finishes to match your specific requirements and interior design.",
      category: "Services"
    }
  ];

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm your Montanary Elevators assistant. How can I help you today? You can ask me about our products, services, features, or contact information.",
          isUser: false,
          timestamp: new Date()
        }
      ]);
      setSuggestedQuestions(questions.slice(0, 4));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findBestAnswer = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Exact match
    const exactMatch = questions.find(q => 
      q.question.toLowerCase() === lowerQuestion
    );
    if (exactMatch) return exactMatch.answer;

    // Keyword matching
    const keywords = {
      'cabin': [1],
      'door': [2],
      'senior': [3],
      'old': [3],
      'elderly': [3],
      'tech': [4],
      'smart': [4],
      'ai': [4],
      'location': [5],
      'address': [5],
      'contact': [6],
      'phone': [6],
      'email': [6],
      'install': [7],
      'maintenance': [8],
      'service': [7, 8],
      'energy': [9],
      'power': [9],
      'safety': [10],
      'secure': [10],
      'video': [11],
      'custom': [12],
      'design': [12]
    };

    let bestMatchId = 0;
    let maxMatches = 0;

    Object.entries(keywords).forEach(([keyword, ids]) => {
      if (lowerQuestion.includes(keyword)) {
        ids.forEach(id => {
          const matchCount = (lowerQuestion.match(new RegExp(keyword, 'g')) || []).length;
          if (matchCount > maxMatches) {
            maxMatches = matchCount;
            bestMatchId = id;
          }
        });
      }
    });

    if (bestMatchId > 0) {
      const match = questions.find(q => q.id === bestMatchId);
      if (match) return match.answer;
    }

    // Default response for unknown questions
    return "I'm sorry, I don't have specific information about that. You can ask me about our elevator cabins, doors, senior-friendly features, tech features, contact information, services, or safety features. Would you like to know about any of these?";
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Auto-hide suggestions after user sends a message
    setShowSuggestions(false);

    // Simulate typing delay
    setTimeout(() => {
      const answer = findBestAnswer(inputText);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: answer,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Update suggested questions based on context
      const relevantQuestions = questions.filter(q => 
        !inputText.toLowerCase().includes(q.question.toLowerCase().split(' ')[0])
      ).slice(0, 4);
      setSuggestedQuestions(relevantQuestions);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  };

  return (
    <div className="chatbot-container">
      <style jsx>{`
        .chatbot-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1001;
          font-family: 'Poppins', sans-serif;
        }

        .chatbot-button {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 28px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .chatbot-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 50%;
        }

        .chatbot-button:hover {
          transform: scale(1.15) rotate(5deg);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
        }

        .chatbot-button:hover::before {
          opacity: 1;
        }

        .chatbot-button i {
          position: relative;
          z-index: 2;
          transition: transform 0.3s ease;
        }

        .chatbot-button:hover i {
          transform: scale(1.1);
        }

        .chatbot-window {
          position: absolute;
          bottom: 90px;
          right: 0;
          width: 380px;
          height: 520px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chatbot-header {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          color: white;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chatbot-title {
          font-weight: 700;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .chatbot-title::before {
          content: '🤖';
          font-size: 1.4rem;
        }

        .chatbot-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .chatbot-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .chatbot-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          display: flex;
          flex-direction: column;
        }

        /* Custom scrollbar */
        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-messages::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .chatbot-messages::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 3px;
        }

        .message {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        .message-user {
          align-items: flex-end;
        }

        .message-bot {
          align-items: flex-start;
        }

        .message-bubble {
          max-width: 85%;
          padding: 15px 18px;
          border-radius: 20px;
          font-size: 0.92rem;
          line-height: 1.5;
          word-wrap: break-word;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .message-user .message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-bottom-right-radius: 8px;
          animation: messageSlideInRight 0.3s ease;
        }

        .message-bot .message-bubble {
          background: white;
          color: #2d3748;
          border-bottom-left-radius: 8px;
          animation: messageSlideInLeft 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        @keyframes messageSlideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes messageSlideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .message-time {
          font-size: 0.75rem;
          color: #718096;
          margin-top: 8px;
          font-weight: 500;
        }

        .suggestions-toggle {
          padding: 12px 20px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .suggestions-toggle:hover {
          background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 100%);
        }

        .suggestions-title {
          font-size: 0.85rem;
          color: #4a5568;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .suggestions-title::before {
          content: '💡';
          font-size: 1rem;
        }

        .toggle-icon {
          color: #667eea;
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }

        .toggle-icon.open {
          transform: rotate(180deg);
        }

        .suggested-questions {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          max-height: ${showSuggestions ? '150px' : '0'};
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .question-chips {
          padding: 15px 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .question-chip {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 20px;
          padding: 8px 14px;
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          flex: 1;
          min-width: calc(50% - 8px);
          text-align: center;
          line-height: 1.3;
        }

        .question-chip:hover {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);
        }

        .chatbot-input {
          padding: 18px 20px;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .chatbot-input input {
          flex: 1;
          padding: 14px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 25px;
          outline: none;
          font-size: 0.92rem;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .chatbot-input input:focus {
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .send-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .send-button:hover {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);
        }

        .send-button:disabled {
          background: #cbd5e0;
          transform: none;
          box-shadow: none;
          cursor: not-allowed;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 15px 18px;
          background: white;
          border-radius: 20px;
          border-bottom-left-radius: 8px;
          max-width: 90px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .typing-dot {
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }

        /* Pulse animation for chatbot button */
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          }
          50% {
            box-shadow: 0 8px 35px rgba(102, 126, 234, 0.8);
          }
          100% {
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          }
        }

        .chatbot-button {
          animation: pulse-glow 2s infinite;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .chatbot-container {
            bottom: 20px;
            right: 20px;
          }

          .chatbot-window {
            width: 340px;
            height: 480px;
            right: -10px;
          }

          .chatbot-button {
            width: 65px;
            height: 65px;
            font-size: 26px;
          }
        }

        @media (max-width: 480px) {
          .chatbot-container {
            bottom: 15px;
            right: 15px;
          }

          .chatbot-window {
            width: 320px;
            height: 450px;
            right: -15px;
          }

          .chatbot-button {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }

          .question-chip {
            min-width: 100%;
            font-size: 0.75rem;
          }
        }
      `}</style>

      {/* Chat Button */}
      {!isOpen && (
        <button 
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          title="Chat with us"
        >
          <i className="fas fa-robot"></i>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              Elevator Assistant
            </div>
            <button 
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`message ${message.isUser ? 'message-user' : 'message-bot'}`}
              >
                <div className="message-bubble">
                  {message.text}
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            {messages[messages.length - 1]?.isUser && (
              <div className="message message-bot">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions Toggle */}
          {suggestedQuestions.length > 0 && (
            <>
              <div className="suggestions-toggle" onClick={toggleSuggestions}>
                <div className="suggestions-title">
                  Quick Questions
                </div>
                <div className={`toggle-icon ${showSuggestions ? 'open' : ''}`}>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>

              {/* Suggested Questions (Collapsible) */}
              <div className="suggested-questions">
                <div className="question-chips">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question.id}
                      className="question-chip"
                      onClick={() => handleQuickQuestion(question.question)}
                    >
                      {question.question}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Input Area */}
          <div className="chatbot-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about elevators..."
              maxLength={500}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}