import { Helmet } from 'react-helmet-async';

import { HDCS } from 'src/sections/user/view/';

// ----------------------------------------------------------------------

export default function mediumHDCS() {
  return (
    <>
      <Helmet>
        <title> mediumHDCS | Minimal UI </title>
      </Helmet>

      <HDCS />
    </>
  );
}