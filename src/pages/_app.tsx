import React, { useReducer, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import AuthContext from "lib/AuthContext";
import authReducer from "lib/authReducer";
import { listenAuthState } from "lib/firebase";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(
    authReducer.reducer,
    authReducer.initialState
  );
  useEffect(() => {
    return listenAuthState(dispatch);
  }, []);
  return (
    <AuthContext.Provider value={state}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
