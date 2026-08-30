import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <p className="font-semibold text-white">Smart Procurement Portal © 2026</p>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Designed & Developed for Smart India Hackathon | Govt of India MSP Initiative
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-slate-400">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <span>•</span>
          <a href="#terms" className="hover:underline">Terms of Service</a>
          <span>•</span>
          <a href="#helpdesk" className="hover:underline">Toll Free: 1800-1100-2026</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
