import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import CombinedContextProvider from './utils/Context API/CombinedContextProvider';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
    <CombinedContextProvider>
      <Suspense>
        <App />
      </Suspense>
      </CombinedContextProvider>
    </BrowserRouter>
  </HelmetProvider>
);
