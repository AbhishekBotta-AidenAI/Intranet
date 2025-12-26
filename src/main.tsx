import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { msalInstance } from './msalInstance';

async function bootstrap() {
  // 1️⃣ Initialize MSAL FIRST
  await msalInstance.initialize();

  // 2️⃣ Handle Microsoft redirect BEFORE React loads
  const redirectResult = await msalInstance.handleRedirectPromise();

  if (redirectResult?.account) {
    msalInstance.setActiveAccount(redirectResult.account);
  }

  // 3️⃣ Always clean URL hash (#code, #state)
  if (window.location.hash) {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + window.location.search
    );
  }

  // 4️⃣ Start React ONLY after MSAL redirect handling
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// 🚀 Boot the app
bootstrap();
