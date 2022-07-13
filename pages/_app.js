import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}) {
  // const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 50);
  });

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {loading ? (
          <Loader open={loading} />
        ) : (
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        )}
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
