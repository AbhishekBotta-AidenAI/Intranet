import React, { useEffect } from 'react';
import LoginNavbar from '../components/common/LoginNavbar';
import { FaMicrosoft } from 'react-icons/fa6';

const Login: React.FC = () => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F8FF] flex flex-col overflow-hidden">
      <LoginNavbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Left - 45% full-height banner with centered logo + text */}
        <div className="w-full md:w-[45%] relative">
          <img
            src="/login/loginSideBanner.png"
            alt="Banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center text-left px-6 md:pl-12" style={{paddingLeft:"30px" }}>
            <img
              src="/login/loginBannerLogo.png"
              alt="Aiden Nexus Logo"
              className="w-30 h-auto mb-4"
              style={{paddingBottom:"40px"}}
            />
            <h1 className="text-xl md:text-xl text-[#ffffff] "style={{fontWeight:"500"}}>Welcome to <em className="italic text-[#d4ffa0]">AidenNexus !</em></h1>
            <p className="mt-2 text-white/70">please log in to Aiden Intranet Portal</p>
          </div>
        </div>

        {/* Right - 55% login actions */}
        <div className="w-full md:w-[55%] flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4" style={{paddingBottom:"40px"}}>Login To <em className="italic text-[#073663]">AidenNexus</em></h2>
            {/* <p className="text-neutral-500 mb-6">Sign in to continue to the intranet.</p> */}

            <button className="w-full flex items-center justify-center gap-3 border border-neutral-300 rounded-md py-3 px-4 hover:shadow-sm transition" style={{padding:"10px"}}>
              <FaMicrosoft className="text-2xl text-blue-600" />
              <span className="font-medium">Continue with Microsoft</span>
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
