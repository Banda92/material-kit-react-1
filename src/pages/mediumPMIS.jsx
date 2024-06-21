import { Helmet } from 'react-helmet-async';

import { PMIS } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function mediumPMIS() {
  return (
    <>
      <Helmet>
        <title> mediumPMIS | Acute Kidney Failure Prediction </title>
      </Helmet>

      <PMIS />
    </>
  );
}
