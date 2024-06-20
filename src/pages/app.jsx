import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> AKFP | Acute Kidney Failure Prediction </title>
      </Helmet>

      <AppView />
    </>
  );
}
