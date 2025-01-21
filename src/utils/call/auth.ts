let authToken = "";
export const getToken = () => {
   return authToken;
};
export const setToken = (token: string) => {
   authToken = token;
};
