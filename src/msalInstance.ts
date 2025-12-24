import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';

// Single MSAL instance for the app. Keep this module HMR-stable.
export const msalInstance = new PublicClientApplication(msalConfig);
