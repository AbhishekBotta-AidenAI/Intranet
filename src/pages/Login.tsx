import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginNavbar from '../components/common/LoginNavbar';
import { FaMicrosoft } from 'react-icons/fa6';
import { authAPI } from '../services/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    if (!code) return;

    const storedState = sessionStorage.getItem('ms_oauth_state');
    if (storedState && state && storedState !== state) {
      setError('State mismatch. Please try signing in again.');
      return;
    }

    const finishLogin = async () => {
      try {
        setLoading(true);
        setError(null);
        await authAPI.exchangeCode(code, state || undefined);
        // Clean query params
        navigate('/?login=success', { replace: true });
      } catch (err) {
        console.error(err);
        setError('Sign-in failed. Please try again.');
      } finally {
        setLoading(false);
        sessionStorage.removeItem('ms_oauth_state');
      }
    };

    finishLogin();
  }, [location.search, navigate]);

  const handleMicrosoftLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { auth_url, state } = await authAPI.getLoginUrl();
      sessionStorage.setItem('ms_oauth_state', state);
      window.location.assign(auth_url);
    } catch (err) {
      console.error(err);
      setError('Unable to start Microsoft sign-in.');
      setLoading(false);
    }
  };

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
          <div className="w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center" style={{paddingBottom:"40px"}}>Login To <em className="italic text-[#073663]">Aiden Nexus</em></h2>
            {/* <p className="text-neutral-500 mb-6">Sign in to continue to the intranet.</p> */}

            <button className="w-[300px] flex items-center justify-center gap-3 border border-neutral-300 rounded-md py-3 px-4 hover:shadow-sm transition bg-[#073663]" style={{padding:"5px 10px 5px 10px",borderRadius:"25px"}}>
              <img src="/login/microsoftLogo.svg" alt="Microsoft Logo" className="w-5 h-5" />
              <span className="font-[10px] text-white ">Continue with Microsoft</span>
            </button>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
