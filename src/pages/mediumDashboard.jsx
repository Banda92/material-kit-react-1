import { Helmet } from 'react-helmet-async';

import { Dashboard } from 'src/sections/dashboard/view/';

// ----------------------------------------------------------------------

export default function mediumDashboard() {
  return (
    <>
      <Helmet>
        <title> mediumDashboard | Minimal UI </title>
      </Helmet>

      <Dashboard />
    </>
  );
}