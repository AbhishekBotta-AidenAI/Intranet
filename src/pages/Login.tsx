import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from '../components/common/LoginNavbar';
import { useAuth } from '../context/useAuth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [message] = useState<string>('Redirecting to Aiden Nexus...');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  /**
   * Silent SSO automatically authenticates users via Microsoft Entra ID.
   * If user is authenticated, redirect to dashboard.
   * If not authenticated, AuthProvider redirects to MyApps.
   */
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Show loading state while authentication is being verified
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F8FF] flex flex-col overflow-hidden">
        <LoginNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FF] flex flex-col overflow-hidden">
      <LoginNavbar />

      <div className="flex-1 flex overflow-hidden">
        {/* Left - 50% full-height banner with centered logo + text */}
        <div className="w-full md:w-[50%] relative">
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
            <p className="mt-2 text-white/70">Automatic authentication via Microsoft Entra ID</p>
          </div>
        </div>

        {/* Right - 50% login actions */}
        <div className="w-full md:w-[50%] flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center" style={{paddingBottom:"40px"}}>Aiden Nexus</h2>
            <div className="text-center mb-6 text-gray-600">
              <p>You will be automatically authenticated via your Microsoft account.</p>
              <p className="mt-2 text-sm">If you are not redirected shortly, you may need to log in through MyApps.</p>
            </div>
            
            <div className="w-full h-0.5 bg-gray-200 my-6"></div>
            
            <p className="text-sm text-gray-500">Authenticating...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
