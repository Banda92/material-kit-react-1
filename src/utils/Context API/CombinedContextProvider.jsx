import PropTypes from 'prop-types';

import { AuthProvider } from "./AuthContext";
import { StatusProvider } from "./StatusContext";


const CombinedContextProvider = ({ children }) => (
    <AuthProvider>
        <StatusProvider>
            {children}
        </StatusProvider>
    </AuthProvider>
);

CombinedContextProvider.propTypes = {
    children: PropTypes.node,
};

export default CombinedContextProvider