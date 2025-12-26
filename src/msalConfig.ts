import { LogLevel } from "@azure/msal-browser";
import type { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "53435daa-f8e8-4099-8ae8-51ab103eeb90",
    authority: "https://login.microsoftonline.com/af6d0c9d-3447-4207-8e1a-936fe897c7a3",
    redirectUri: "https://dev.iapps.aidenai.com:3000/",
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (level === LogLevel.Error) console.error(message);
      },
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"],
};
