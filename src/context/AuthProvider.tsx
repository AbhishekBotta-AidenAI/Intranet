// // @refresh skip
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { InteractionRequiredAuthError } from '@azure/msal-browser';
// import { AuthContext } from './AuthContext';
// import type { AuthContextValue } from './AuthContext';
// import { msalInstance } from '../msalInstance';
// import { loginRequest } from '../msalConfig';
// import { authAPI } from '../services/auth';

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     const t = sessionStorage.getItem('access_token');
//     if (t) return true;
//     try {
//       const acct = msalInstance.getAllAccounts().at(0);
//       return !!acct;
//     } catch (e) {
//       return false;
//     }
//   });
//   const [error, setError] = useState<string | null>(null);
//   const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
//     const name = localStorage.getItem('user_name') ?? sessionStorage.getItem('user_name');
//     const email = localStorage.getItem('user_email') ?? sessionStorage.getItem('user_email');
//     if (name || email) return { name: name ?? 'User', email: email ?? '' };
//     try {
//       const acct = msalInstance.getAllAccounts().at(0);
//       if (acct) return { name: acct.name ?? 'User', email: acct.username ?? '' };
//     } catch (e) {
//       // ignore
//     }
//     return null;
//   });
//   const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('access_token'));
//   const initializedRef = useRef(false);

//   useEffect(() => {
//     if (initializedRef.current) return;
//     initializedRef.current = true;

//     let cancelled = false;

//     const bootstrap = async () => {
//       // console.log('[AuthProvider] bootstrap start - initializedRef:', initializedRef.current);
//       try {
//         await msalInstance.initialize();

//         const redirectResult = await msalInstance.handleRedirectPromise();
//         if (redirectResult?.account) {
//           msalInstance.setActiveAccount(redirectResult.account);
//         }

//         const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts().at(0);

//         if (!account) {
//           await msalInstance.loginRedirect(loginRequest);
//           return;
//         }

//         try {
//           const acctName = account.name ?? '';
//           const acctEmail = account.username ?? '';
//           sessionStorage.setItem('user_name', acctName);
//           sessionStorage.setItem('user_email', acctEmail);
//           try {
//             localStorage.setItem('user_name', acctName);
//             localStorage.setItem('user_email', acctEmail);
//           } catch (e) {
//             // ignore localStorage write errors
//           }
//           if (!cancelled) {
//             setUser({ name: acctName || 'User', email: acctEmail || '' });
//             setIsAuthenticated(true);
//           }
//          // console.log('[AuthProvider] wrote sessionStorage and localStorage and setUser', { acctName, acctEmail });
//         } catch (e) {
//           // ignore sessionStorage errors
//         }

//         const authResult = await msalInstance.acquireTokenSilent({
//           ...loginRequest,
//           account,
//         });

//         const idToken = authResult.idToken;
//         if (!idToken) throw new Error('Missing idToken from MSAL auth result');

//         const userDetails = {
//           id: account.homeAccountId,
//           username: account.username,
//           name: account.name,
//           email: account.username,
//         //   givenName: account.givenName,
//         //   familyName: account.familyName,
//         };

//         // console.log('=== 👤 MICROSOFT USER DETAILS ===');
//         // console.log('Username:', userDetails.username);
//         // console.log('Email:', userDetails.email);
//         // console.log('Full Name:', userDetails.name);
//         // // console.log('Given Name:', userDetails.givenName);
//         // // console.log('Family Name:', userDetails.familyName);
//         // console.log('Home Account ID:', userDetails.id);
//         // console.log('ID Token:', idToken);
//         // console.log('===================================');

//         if (cancelled) return;

//         const exchangeResponse = await authAPI.exchangeMicrosoftIdToken(idToken, 'aidenai');

//         // Log Microsoft refresh token for debugging (REMOVE before production!)
//         console.log('[AuthProvider] Microsoft refresh_token:', exchangeResponse);

//         if (!cancelled) {
//           const accessToken = exchangeResponse.access_token ?? '';
//           sessionStorage.setItem('access_token', accessToken);
//           sessionStorage.setItem('user_email', userDetails.email ?? '');
//           sessionStorage.setItem('user_name', userDetails.name ?? '');
//           try {
//             localStorage.setItem('user_email', userDetails.email ?? '');
//             localStorage.setItem('user_name', userDetails.name ?? '');
//           } catch (e) {
//             // ignore localStorage write errors
//           }
//           setUser({ name: userDetails.name || 'User', email: userDetails.email || '' });
//           setToken(accessToken || null);
//           setIsAuthenticated(true);
//           setError(null);

//           // console.log('✅ Authentication successful!');
//           // console.log('Access Token:', accessToken);
//         }
//       } catch (err) {
//         if (err instanceof InteractionRequiredAuthError) {
//           await msalInstance.loginRedirect(loginRequest);
//           return;
//         }

//         console.error('Auth bootstrap failed', err);
//         if (!cancelled) {
//           setError(err instanceof Error ? err.message : 'Authentication failed');
//           setIsAuthenticated(false);
//         }
//       } finally {
//         if (!cancelled) setIsLoading(false);
//       }
//     };

//     bootstrap();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const value: AuthContextValue = useMemo(
//     () => ({ isAuthenticated, isLoading, error, token, user }),
//     [isAuthenticated, isLoading, error, token, user]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
// @refresh skip
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { AuthContext } from './AuthContext';
import type { AuthContextValue } from './AuthContext';
import { msalInstance } from '../msalInstance';
import { loginRequest } from '../msalConfig';
import { authAPI } from '../services/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const t = sessionStorage.getItem('access_token');
    if (t) return true;
    try {
      const acct = msalInstance.getAllAccounts().at(0);
      return !!acct;
    } catch (e) {
      return false;
    }
  });
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(() => {
    const name = localStorage.getItem('user_name') ?? sessionStorage.getItem('user_name');
    const email = localStorage.getItem('user_email') ?? sessionStorage.getItem('user_email');
    if (name || email) return { name: name ?? 'User', email: email ?? '' };
    try {
      const acct = msalInstance.getAllAccounts().at(0);
      if (acct) return { name: acct.name ?? 'User', email: acct.username ?? '' };
    } catch (e) {
      // ignore
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('access_token'));
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    let cancelled = false;

    const bootstrap = async () => {
      // console.log('[AuthProvider] bootstrap start - initializedRef:', initializedRef.current);
      try {
        await msalInstance.initialize();

        const redirectResult = await msalInstance.handleRedirectPromise();
        if (redirectResult?.account) {
          msalInstance.setActiveAccount(redirectResult.account);
        }

        const account = msalInstance.getActiveAccount() || msalInstance.getAllAccounts().at(0);

        if (!account) {
          await msalInstance.loginRedirect(loginRequest);
          return;
        }

        try {
          const acctName = account.name ?? '';
          const acctEmail = account.username ?? '';
          sessionStorage.setItem('user_name', acctName);
          sessionStorage.setItem('user_email', acctEmail);
          try {
            localStorage.setItem('user_name', acctName);
            localStorage.setItem('user_email', acctEmail);
          } catch (e) {
            // ignore localStorage write errors
          }
          if (!cancelled) {
            setUser({ name: acctName || 'User', email: acctEmail || '' });
            setIsAuthenticated(true);
          }
         // console.log('[AuthProvider] wrote sessionStorage and localStorage and setUser', { acctName, acctEmail });
        } catch (e) {
          // ignore sessionStorage errors
        }

        const authResult = await msalInstance.acquireTokenSilent({
          ...loginRequest,
          account,
        });

        const idToken = authResult.idToken;
        if (!idToken) throw new Error('Missing idToken from MSAL auth result');

        const userDetails = {
          id: account.homeAccountId,
          username: account.username,
          name: account.name,
          email: account.username,
        //   givenName: account.givenName,
        //   familyName: account.familyName,
        };

        // console.log('=== 👤 MICROSOFT USER DETAILS ===');
        // console.log('Username:', userDetails.username);
        // console.log('Email:', userDetails.email);
        // console.log('Full Name:', userDetails.name);
        // // console.log('Given Name:', userDetails.givenName);
        // // console.log('Family Name:', userDetails.familyName);
        // console.log('Home Account ID:', userDetails.id);
        // console.log('ID Token:', idToken);
        // console.log('===================================');

        if (cancelled) return;

        const exchangeResponse = await authAPI.exchangeMicrosoftIdToken(idToken, 'aidenai');

        // Log Microsoft refresh token for debugging (REMOVE before production!)
        console.log('[AuthProvider] Microsoft refresh_token:', exchangeResponse);

        if (!cancelled) {
          const accessToken = exchangeResponse.access_token ?? '';
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('user_email', userDetails.email ?? '');
          sessionStorage.setItem('user_name', userDetails.name ?? '');
          try {
            localStorage.setItem('user_email', userDetails.email ?? '');
            localStorage.setItem('user_name', userDetails.name ?? '');
          } catch (e) {
            // ignore localStorage write errors
          }
          setUser({ name: userDetails.name || 'User', email: userDetails.email || '' });
          setToken(accessToken || null);
          setIsAuthenticated(true);
          setError(null);

          // console.log('✅ Authentication successful!');
          // console.log('Access Token:', accessToken);
        }
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          await msalInstance.loginRedirect(loginRequest);
          return;
        }

        console.error('Auth bootstrap failed', err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Authentication failed');
          setIsAuthenticated(false);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const value: AuthContextValue = useMemo(
    () => ({ isAuthenticated, isLoading, error, token, user }),
    [isAuthenticated, isLoading, error, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
