import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginNavbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full bg-white border-b border-neutral-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/login') }>
          <div style={{padding:"20px" }}>
            <img src="/login/AidenaiTextLogo.png" alt="AidenAInexus" className="h-6" />
          </div>
        </div>
        <div className="text-sm text-neutral-600">&nbsp;</div>
      </div>
    </header>
  );
};

export default LoginNavbar;
