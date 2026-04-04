let authToken = "";
let tokenCallback: (() => string) | null = null;

export const getToken = () => {
   if (tokenCallback) {
      return tokenCallback();
   }
   return authToken;
};

export const setToken = (token: string) => {
   authToken = token;
};

export const setTokenCallback = (callback: (() => string) | null) => {
   tokenCallback = callback;
};

export const getTokenCallback = () => tokenCallback;
