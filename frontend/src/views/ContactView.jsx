import React, { useState } from 'react';

// --- Placeholder for ModernCard Component ---
// Single-file mandate ke liye ModernCard ko yahan define kiya gaya hai.
const ModernCard = ({ children, className = '' }) => (
  <div 
    className={`bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 ${className}`}
  >
    {children}
  </div>
);
// --- End ModernCard Placeholder ---


// IMPORTANT: Replace this with the URL where your backend server is running.
const API_ENDPOINT = 'http://localhost:3001/send-email'; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });
  // 'loading' state ab global overlay ko control karega
  const [loading, setLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Global loading shuru
    setSuccessMessage('');
    setErrorMessage('');

    // Simple validation
    if (!formData.fullName || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      // Exponential backoff mechanism for API call retry (max 3 retries)
      let response;
      const maxRetries = 3;
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          // If successful, break the loop
          if (response.ok || response.status < 500) break; 
        } catch (error) {
          // If it's the last attempt, rethrow the error
          if (attempt === maxRetries - 1) throw error;
          // Wait for 2^attempt seconds before retrying
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }

      // Handle the final response
      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Message sent successfully! We will get back to you shortly.');
        setFormData({ fullName: '', email: '', message: '' }); // Clear form
      } else {
        // If the server returns a non-200 status
        setErrorMessage(result.message || 'An error occurred while sending the message. Check your server status.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setErrorMessage('Network error. Please ensure the backend server is running.');
    } finally {
      setLoading(false); // Global loading khatam
      
      // Clear success/error message after 4 seconds (pehla 5 seconds tha)
      setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 4000);
    }
  };

  // Toast/Pop-up Message Component
  const ToastMessage = () => {
    const isVisible = successMessage || errorMessage;
    const isSuccess = !!successMessage;
    const message = successMessage || errorMessage;

    return (
      <div 
        className={`fixed top-0 left-0 right-0 z-[1000] p-4 transition-transform duration-500 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div 
          className={`max-w-md mx-auto p-4 rounded-xl text-center font-bold shadow-2xl flex items-center justify-center space-x-2 ${
            isSuccess 
              ? 'bg-green-600/95 text-white' 
              : 'bg-red-600/95 text-white'
          }`}
        >
          {isSuccess ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{message}</span>
        </div>
      </div>
    );
  };
  
  // Global Loading Overlay Component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-gray-900/80 transition-opacity duration-300">
        <div className="flex flex-col items-center p-8 bg-gray-800/90 rounded-2xl shadow-2xl border border-cyan-700">
            {/* Loading Spinner */}
            <svg className="animate-spin h-14 w-14 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-white text-lg font-bold tracking-wider">Sending Message...</p>
        </div>
    </div>
  );


  return (
    // Relative positioning for z-index context (though fixed elements don't strictly need it)
    <div className="space-y-10 p-4 sm:p-8 relative"> 
      
      {/* Global Loading Overlay */}
      {loading && <LoadingOverlay />}

      {/* Toast Message (Fixed Position) */}
      <ToastMessage />

      <h2 className="text-4xl font-extrabold text-cyan-400 text-center border-b border-gray-700 pb-3">
        CONTACT ME
      </h2>
      
      <ModernCard className="p-8 max-w-lg mx-auto transition-all duration-500 hover:shadow-cyan-500/30">
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-white font-medium text-sm block">Full Name:</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 transition duration-300"
              placeholder="Enter your full name"
              disabled={loading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-white font-medium text-sm block">Email:</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 transition duration-300"
              placeholder="Enter your email address"
              disabled={loading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-white font-medium text-sm block">Message:</label>
            <textarea
              id="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 transition duration-300 resize-none"
              placeholder="Write your message here..."
              disabled={loading}
              required
            ></textarea>
          </div>
          
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              // Button ab 'loading' state se disabled rahega
              disabled={loading} 
              className={`px-8 py-3 text-base font-bold tracking-wider rounded-xl text-white transition-all duration-300 transform active:scale-95 flex items-center justify-center shadow-lg ${
                // Button ab hamesha ek hi tarah dikhega (loading spinner alag se hai)
                loading ? 'bg-cyan-700/50 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 hover:shadow-cyan-500/50'
              }`}
            >
              {/* Button ke andar se loading spinner hata diya gaya */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Send Message
            </button>
          </div>
        </form>
      </ModernCard>
      
      <p className="text-center text-sm text-gray-400 pt-4">I'll usually respond within 24 hours.</p>

    </div>
  );
};

// Main App component setup for the single-file mandate
const App = () => {
    // Styling the background for a portfolio-like feel
    return (
        <div className="min-h-screen bg-gray-900 font-sans p-4 sm:p-8">
            <ContactForm />
        </div>
    );
};

export default App;
