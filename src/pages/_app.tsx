import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import "styles/globals.css";
import { AppProps } from "next/app";
import { AuthProvider } from "context/Auth";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
