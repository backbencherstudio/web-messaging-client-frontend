// components/CookieBanner.js

"use client";

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function CookieBanner() {

    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
    const [marketingEnabled, setMarketingEnabled] = useState(false);
  
    useEffect(() => {
      // Show banner only if the cookie doesn't exist
      if (!Cookies.get('cookieConsent')) {
        setShowBanner(true);
      }
    }, []);
  
    const handleAccept = () => {
      Cookies.set('cookieConsent', 'all', { expires: 365 });
      Cookies.set('analytics', 'true', { expires: 365 });
      Cookies.set('marketing', 'true', { expires: 365 });
      setShowBanner(false);
    };
  
    const handleSavePreferences = () => {
      Cookies.set('cookieConsent', 'custom', { expires: 365 });
      Cookies.set('analytics', analyticsEnabled.toString(), { expires: 365 });
      Cookies.set('marketing', marketingEnabled.toString(), { expires: 365 });
      setShowBanner(false);
    };
  
    if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full bg-[#2B373B]/95 backdrop-blur-sm text-white p-6 shadow-lg z-50">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-xl font-semibold">🍪 Cookie Settings</h3>
          <p className="text-gray-300 max-w-2xl">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies. Read more about how we use cookies in our 
            <button 
              onClick={() => window.open('/privacy-policy', '_blank')}
              className="text-primary hover:text-primary/80 underline ml-1"
            >
              Cookie Policy
            </button>.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 min-w-[300px] justify-center">
          <button 
            onClick={handleAccept} 
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white dark:text-black rounded-lg transition-colors duration-200 font-medium"
          >
            Accept All
          </button>
          <button 
            onClick={() => setShowBanner(false)} 
            className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Reject All
          </button>
          <button 
            onClick={() => setShowPreferences(true)} 
            className="px-6 py-2.5 border border-gray-400 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Preferences
          </button>
        </div>
      </div>

      {/* Cookie categories - shown when preferences is clicked */}
      {showPreferences && (
        <div className="mt-6 border-t border-gray-600 pt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Essential Cookies</h4>
              <input 
                type="checkbox" 
                checked={true} 
                disabled 
                className="h-4 w-4 accent-primary"
              />
            </div>
            <p className="text-sm text-gray-400">Required for the website to function properly.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Analytics Cookies</h4>
              <input 
                type="checkbox" 
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                className="h-4 w-4 accent-primary cursor-pointer"
              />
            </div>
            <p className="text-sm text-gray-400">Help us improve our website by collecting anonymous data.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Marketing Cookies</h4>
              <input 
                type="checkbox" 
                checked={marketingEnabled}
                onChange={(e) => setMarketingEnabled(e.target.checked)}
                className="h-4 w-4 accent-primary cursor-pointer"
              />
            </div>
            <p className="text-sm text-gray-400">Used to deliver personalized advertisements.</p>
          </div>

          <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-4">
            <button 
              onClick={() => {
                handleSavePreferences();
                setShowPreferences(false);
              }} 
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}
