import PropTypes from 'prop-types';
import React, {useMemo, useContext, useCallback, createContext,   } from 'react';

import { useSessionStorageState } from 'src/hooks/CustomHook';


const AuthContext = createContext({
  isLoggedIn: {},
  setIsLoggedIn: () => { },
});
export default AuthContext;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  /** 로그인 상태관리 */
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);

  /** 커스텀 훅을 이용한 세션스토리지 로그인 상태 관리 */
  const [isLoggedIn, setIsLoggedIn] = useSessionStorageState('isLoggedIn', false);
  const login = useCallback(() => setIsLoggedIn(true), [setIsLoggedIn]);
  const logout = useCallback(() => setIsLoggedIn(false), [setIsLoggedIn]);



  /** 커스텀 훅을 이용한 로컬스토리지 로그인 상태 관리 */
  // const [isLoggedIn, setIsLoggedIn] = useLocalStorageState('isLoggedIn', false);
  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);


  const value = useMemo(() => ({
    isLoggedIn, login, logout 
  }), [isLoggedIn, login, logout]); // 의존성 배열에 login, logout 추가

  AuthProvider.propTypes = {
    children: PropTypes.node,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


