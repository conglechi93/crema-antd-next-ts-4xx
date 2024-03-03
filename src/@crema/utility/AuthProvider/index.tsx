import { AppState } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  onCheckSessionInSSO,
  onLogoutAll,
  onSetAccessToken,
} from 'redux/actions/Auth';
import { CodeChallengePayload } from 'types/payload/Auth.payload';
import { createChallenge } from 'utils/CodeChallenge';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthActionsProps {
  loginCRM: () => void;
  logoutCRM: () => void;
}

const AuthActionsContext = createContext<AuthActionsProps>({
  loginCRM: () => {},
  logoutCRM: () => {},
});

export const useAuthActions = () => useContext(AuthActionsContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [AuthListenerData, setAuthListenerData] = useState({
    isAuthenticated: false,
    isLoading: true,
  });
  const { accessToken } = useSelector<AppState, AppState['auth']>(
    ({ auth }) => auth,
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const removeQueryParams = (paramName: string) => {
    const param = searchParams.get(paramName);
    if (param) {
      searchParams.delete(paramName);
      setSearchParams(searchParams);
    }
  };
  const [searchParams, setSearchParams] = useSearchParams('');
  const handleGetAccessToken = async (
    codeChallengePayload: CodeChallengePayload,
  ) => {
    await dispatch(onSetAccessToken(codeChallengePayload));
    await removeQueryParams('authCode');
    setAuthListenerData({
      isAuthenticated: true,
      isLoading: false,
    });
  };

  useEffect(() => {
    setAuthListenerData({
      isAuthenticated: false,
      isLoading: true,
    });
    const authCode = searchParams.get('authCode');
    console.log('authCode: ', authCode);
    if (authCode && !accessToken) {
      const codeVerifier = localStorage.getItem('codeVerifier');
      const codeChallengePayload = {
        authCode: authCode,
        codeVerifier: codeVerifier,
      };
      handleGetAccessToken(codeChallengePayload);
      return;
    }
    const handleCheckSessionInSSO = async () => {
      const res: any = await dispatch(onCheckSessionInSSO());
      if (res && !accessToken) {
        handleLogin();
        return;
      }
      setAuthListenerData({
        isAuthenticated: true,
        isLoading: false,
      });
    };
    handleCheckSessionInSSO();
  }, [accessToken]);

  const handleLogin = async () => {
    const REACT_APP_SSO_SERVER_URL = process.env.REACT_APP_SSO_SERVER_URL;
    const REACT_APP_SSO_APP_CODE = process.env.REACT_APP_SSO_APP_CODE;
    const REACT_APP_SSO_CLIENT_ID = process.env.REACT_APP_SSO_CLIENT_ID;
    const challenge = await createChallenge();
    const urlObj = new URL(window.location.href);
    urlObj.hash = '';
    window.history.pushState('', '', urlObj);
    const redirectTo = window.location.href;
    const codeVerifier = challenge.code_verifier;
    localStorage.setItem('codeVerifier', codeVerifier);
    const codeChallenge = challenge.code_challenge;
    const url = `${REACT_APP_SSO_SERVER_URL}?redirectTo=${redirectTo}&appCode=${REACT_APP_SSO_APP_CODE}&clientId=${REACT_APP_SSO_CLIENT_ID}&codeChallenge=${codeChallenge}`;
    router.push(url);
  };

  const handleLogoutSSO = async () => {
    await dispatch(onLogoutAll(accessToken));
  };

  return (
    <AuthContext.Provider value={AuthListenerData}>
      <AuthActionsContext.Provider
        value={{ loginCRM: handleLogin, logoutCRM: handleLogoutSSO }}
      >
        {children}
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
