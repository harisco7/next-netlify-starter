import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps;
  return (
    <UserProvider user={user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}
export default MyApp;
