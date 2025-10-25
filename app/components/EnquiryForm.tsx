'use client';

import { useState } from 'react';

export default function EnquiryForm() {
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const interest = formData.get('interest') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (name && email && phone && interest) {
      // Prepare WhatsApp message
      const whatsappMessage = `
        *Enquiry Details*%0A%0A
        *Name*: ${name}%0A
        *Email*: ${email}%0A
        *Phone*: ${phone}%0A%0A
        *Primary Interest*: ${interest}%0A
        *Specific Requirements*: ${message || 'None provided'}
      `;

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/919000737676?text=${whatsappMessage}`, '_blank');

      // Show success message
      setResponseMessage('Thank you! Your enquiry has been sent. We will contact you shortly.');
      
      // Reset form
      e.currentTarget.reset();
    } else {
      setResponseMessage('Please fill in all required fields.');
    }
  };

  return (
    <section className="section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="enquiry-form-container">
              <h2>Request an Enquiry</h2>
              <p>Please fill out the form below, and we will get back to you soon.</p>
              
              <form id="enquiryForm" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" name="name" className="form-control" placeholder="Your Full Name" required />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" className="form-control" placeholder="Your Email Address" required />
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="tel" id="phone" name="phone" className="form-control" placeholder="Your Phone Number" required pattern="[0-9]{10}" title="Enter a valid 10-digit phone number" />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="interest">Primary Interest</label>
                      <select id="interest" name="interest" className="form-control" required>
                        <option value="">Select Interest</option>
                        <option value="Senior-Friendly">Senior-Friendly Features</option>
                        <option value="Tech-Advanced">Tech-Advanced Features</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Specific Requirements</label>
                  <textarea id="message" name="message" className="form-control" rows={3} placeholder="Tell us about your specific needs"></textarea>
                </div>
                
                <button type="submit" className="submit-btn">Send Enquiry</button>
                {responseMessage && (
                  <div 
                    id="responseMessage" 
                    style={{
                      color: responseMessage.includes('Thank you') ? 'green' : 'red',
                      backgroundColor: responseMessage.includes('Thank you') ? '#e8f5e9' : '#ffebee',
                      marginTop: '20px',
                      fontSize: '1rem',
                      textAlign: 'center',
                      padding: '10px',
                      borderRadius: '5px'
                    }}
                  >
                    {responseMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}