'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  relatedQuestions?: number[];
  pageLink?: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<Question[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const questions: Question[] = [
    {
      id: 1,
      question: "What types of elevator cabins do you offer?",
      answer: "We offer 7 premium elevator cabin types:\n\n• SS Cabin - Stainless steel, rust-resistant\n• Gold Glass Cabin - Luxury gold tint\n• Premium Glass Cabin - Transparent design\n• Luxury Marble Cabin - Natural marble\n• Wooden Finish Cabin - Engineered wood\n• Black Pearl Cabin - Sophisticated black finish\n• Champagne Finish Cabin - Soft gold tone\n\nWould you like to see our cabin gallery?",
      category: "Cabins",
      relatedQuestions: [2, 3, 4],
      pageLink: "/pages/liftcabin"
    },
    {
      id: 2,
      question: "What are your elevator door options?",
      answer: "We provide comprehensive door solutions:\n\n• Automatic Doors - Hands-free operation\n• Swing Doors - Classic design\n• Center Opening Doors - Space-efficient\n• Big Vision Doors - Panoramic views\n• Sliding Doors - Modern design\n• Wood Color Doors - Traditional appeal\n• Collapsible Doors - Security-focused\n\nInterested in viewing our door collection?",
      category: "Doors",
      relatedQuestions: [1, 3, 4],
      pageLink: "/pages/liftdoors"
    },
    {
      id: 3,
      question: "Do you have senior-friendly elevators?",
      answer: "Yes! Our Senior-Friendly Elevators include:\n\n• Wheelchair accessibility\n• Large high-contrast buttons\n• Voice assistance\n• Emergency call systems\n• Non-slip flooring\n• Slow-close mechanisms\n\nPerfect for retirement homes and accessible housing.",
      category: "Features",
      relatedQuestions: [1, 2, 4]
    },
    {
      id: 4,
      question: "What tech features do you offer?",
      answer: "Our Tech-Advanced Elevators feature:\n\n• AI Voice Control\n• Smartphone App\n• Touchless Operation\n• Biometric Access\n• Smart Home Integration\n• Energy Optimization\n\nFuture-proof technology for modern buildings.",
      category: "Features",
      relatedQuestions: [1, 2, 3]
    },
    {
      id: 5,
      question: "Where are you located?",
      answer: "📍 Main Branch: 10-7-34/1 Rangreej Peta, Rajahmundry, E.G. Dist, A.P\n\nWe serve: Razole, Palacole, Tadepalligudem, Narsapur, Amalapuram, Bhimavaram, Kakinada, and both E.G & W.G Districts.",
      category: "Contact",
      relatedQuestions: [6]
    },
    {
      id: 6,
      question: "How can I contact you?",
      answer: "📞 Phone: 9000737676, 8500884447\n📞 Senior Support: 9000737677\n📧 Email: montanaryelevators@gmail.com\n🕒 Hours: Mon-Sun, 8:00 AM - 8:00 PM",
      category: "Contact",
      relatedQuestions: [5]
    }
  ];

  const quickActions = [
    { icon: "📞", text: "Call Now", action: () => window.open('tel:+919000737676') },
    { icon: "💬", text: "WhatsApp", action: () => window.open('https://wa.me/919000737676') },
    { icon: "📧", text: "Email Us", action: () => window.open('mailto:montanaryelevators@gmail.com') },
    { icon: "📍", text: "Get Directions", action: () => window.open('https://maps.google.com/?q=10-7-34/1+Rangreej+Peta,+Rajahmundry') }
  ];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm your Montanary Elevators assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = (duration: number = 1000) => {
    setIsTyping(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsTyping(false);
        resolve(true);
      }, duration);
    });
  };

  const findBestAnswer = (question: string): { answer: string; category: string; relatedQuestions?: number[]; pageLink?: string } => {
    const lowerQuestion = question.toLowerCase();
    
    const exactMatch = questions.find(q => 
      q.question.toLowerCase() === lowerQuestion
    );
    if (exactMatch) return exactMatch;

    const keywords = {
      'cabin': [1],
      'door': [2],
      'senior': [3],
      'tech': [4],
      'location': [5],
      'contact': [6]
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
      if (match) return match;
    }

    return {
      answer: "I can help you with information about our elevator cabins, doors, features, and contact details. What would you like to know?",
      category: "General"
    };
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowSuggestions(false);

    await simulateTyping(1000);

    const { answer, category, relatedQuestions: relatedIds, pageLink } = findBestAnswer(inputText);
    
    const botMessage: Message = {
      id: Date.now() + 1,
      text: answer,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);

    // Set current category and related questions
    if (category && category !== "General") {
      setCurrentCategory(category);
      if (relatedIds && relatedIds.length > 0) {
        const related = questions.filter(q => relatedIds.includes(q.id));
        setRelatedQuestions(related);
      } else {
        setRelatedQuestions([]);
      }

      // Ask if user wants to visit the page
      if (pageLink && (category === "Cabins" || category === "Doors")) {
        setTimeout(async () => {
          await simulateTyping(800);
          const pageMessage: Message = {
            id: Date.now() + 2,
            text: `Would you like to visit our ${category.toLowerCase()} gallery page to see more details and images?`,
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, pageMessage]);
        }, 500);
      }
    } else {
      setCurrentCategory(null);
      setRelatedQuestions([]);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleQuickAction = (action: () => void) => {
    action();
  };

  const handlePageNavigation = (pageLink: string) => {
    setIsOpen(false);
    setTimeout(() => {
      router.push(pageLink);
    }, 300);
  };

  const handleBackToMain = () => {
    setCurrentCategory(null);
    setRelatedQuestions([]);
    setShowSuggestions(true);
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

  const getMainQuestions = () => {
    return questions.filter(q => !currentCategory || q.category === currentCategory);
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
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
        }

        .chatbot-window {
          position: absolute;
          bottom: 90px;
          right: 0;
          width: 380px;
          height: 500px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-header {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chatbot-title {
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-actions {
          display: flex;
          gap: 5px;
        }

        .header-action {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .header-action:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .back-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 0.8rem;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
          margin-right: 10px;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chatbot-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: #f8f9fa;
          display: flex;
          flex-direction: column;
        }

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
          margin-bottom: 12px;
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
          padding: 10px 14px;
          border-radius: 15px;
          font-size: 0.85rem;
          line-height: 1.4;
          word-wrap: break-word;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          white-space: pre-line;
        }

        .message-user .message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-bottom-right-radius: 5px;
        }

        .message-bot .message-bubble {
          background: white;
          color: #2d3748;
          border: 1px solid #e0e0e0;
          border-bottom-left-radius: 5px;
        }

        .message-time {
          font-size: 0.65rem;
          color: #718096;
          margin-top: 4px;
        }

        .section-header {
          padding: 10px 15px;
          background: rgba(255, 255, 255, 0.9);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .section-title {
          font-size: 0.8rem;
          color: #4a5568;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .toggle-icon {
          color: #667eea;
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }

        .toggle-icon.open {
          transform: rotate(180deg);
        }

        .hide-icon {
          color: #718096;
          font-size: 0.8rem;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .hide-icon:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #4a5568;
        }

        .quick-actions {
          background: rgba(255, 255, 255, 0.95);
          max-height: ${showQuickActions ? '110px' : '0'};
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .action-buttons {
          padding: 12px 15px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .action-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 18px;
          padding: 6px 12px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-weight: 500;
          flex: 1;
          min-width: calc(50% - 6px);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .action-button:hover {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          transform: translateY(-1px);
        }

        .suggested-questions {
          background: rgba(255, 255, 255, 0.95);
          max-height: ${showSuggestions ? '140px' : '0'};
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .question-buttons {
          padding: 12px 15px;
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .question-button {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border: none;
          border-radius: 18px;
          padding: 6px 12px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-weight: 500;
          flex: 1;
          min-width: calc(50% - 6px);
          text-align: center;
          line-height: 1.3;
        }

        .question-button:hover {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          transform: translateY(-1px);
        }

        .page-button {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
          border: none;
          border-radius: 18px;
          padding: 8px 16px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          font-weight: 600;
          margin: 8px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .page-button:hover {
          background: linear-gradient(135deg, #ff8e8e 0%, #ff7f50 100%);
          transform: translateY(-1px);
        }

        .chatbot-input {
          padding: 12px 15px;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .chatbot-input input {
          flex: 1;
          padding: 10px 12px;
          border: 1px solid #e0e0e0;
          border-radius: 20px;
          outline: none;
          font-size: 0.85rem;
          transition: all 0.3s ease;
          background: #f8fafc;
        }

        .chatbot-input input:focus {
          border-color: #667eea;
          background: white;
        }

        .send-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .send-button:hover {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          transform: scale(1.05);
        }

        .send-button:disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          transform: none;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 10px 14px;
          background: white;
          border-radius: 15px;
          border-bottom-left-radius: 5px;
          max-width: 70px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background: #999;
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
            transform: translateY(-3px);
          }
        }

        @media (max-width: 768px) {
          .chatbot-container {
            bottom: 20px;
            right: 20px;
          }

          .chatbot-window {
            width: 340px;
            height: 450px;
            right: -10px;
          }

          .chatbot-button {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }
        }

        @media (max-width: 480px) {
          .chatbot-container {
            bottom: 15px;
            right: 15px;
          }

          .chatbot-window {
            width: 320px;
            height: 400px;
            right: -15px;
          }

          .action-button, .question-button {
            min-width: 100%;
            font-size: 0.7rem;
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {currentCategory && (
                <button className="back-button" onClick={handleBackToMain}>
                  <i className="fas fa-arrow-left"></i>
                  Back
                </button>
              )}
              <div className="chatbot-title">
                <i className="fas fa-robot"></i>
                {currentCategory ? `${currentCategory} Questions` : 'Elevator Assistant'}
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="header-action"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
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
            {isTyping && (
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

          {/* Page Navigation Button */}
          {currentCategory && (currentCategory === "Cabins" || currentCategory === "Doors") && (
            <button 
              className="page-button"
              onClick={() => handlePageNavigation(currentCategory === "Cabins" ? "/pages/liftcabin" : "/pages/liftdoors")}
            >
              <i className="fas fa-external-link-alt"></i>
              Visit {currentCategory} Gallery Page
            </button>
          )}

          {/* Quick Actions Section */}
          {/* <div className="section-header" onClick={() => setShowQuickActions(!showQuickActions)}>
            <div className="section-title">
              <i className="fas fa-bolt"></i>
              Quick Actions
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="toggle-icon" style={{ transform: showQuickActions ? 'rotate(180deg)' : 'none' }}>
                <i className="fas fa-chevron-down"></i>
              </span>
              <span 
                className="hide-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickActions(false);
                }}
                title="Hide section"
              >
                <i className="fas fa-eye-slash"></i>
              </span>
            </div>
          </div> */}

          {/* <div className="quick-actions">
            <div className="action-buttons">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="action-button"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <span>{action.icon}</span>
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
          </div> */}

          {/* Suggested Questions Section */}
          <div className="section-header" onClick={() => setShowSuggestions(!showSuggestions)}>
            <div className="section-title">
              <i className="fas fa-lightbulb"></i>
              {currentCategory ? 'Related Questions' : 'Common Questions'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="toggle-icon" style={{ transform: showSuggestions ? 'rotate(180deg)' : 'none' }}>
                <i className="fas fa-chevron-down"></i>
              </span>
              <span 
                className="hide-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSuggestions(false);
                }}
                title="Hide section"
              >
                <i className="fas fa-eye-slash"></i>
              </span>
            </div>
          </div>

          <div className="suggested-questions">
            <div className="question-buttons">
              {(currentCategory && relatedQuestions.length > 0 ? relatedQuestions : getMainQuestions()).map((question) => (
                <button
                  key={question.id}
                  className="question-button"
                  onClick={() => handleQuickQuestion(question.question)}
                >
                  {question.question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="chatbot-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              maxLength={500}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
