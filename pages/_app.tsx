import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { useStore } from '../src/stores';

// import "@/styles/app.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState)
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default App