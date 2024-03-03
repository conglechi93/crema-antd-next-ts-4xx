import Auth from './Auth';
import App from './App';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: [''],
  whitelist: [
    'accessToken',
    'refreshToken',
    'isAuthenticated',
    'currentUser',
    'varsId',
    'listProfile',
  ],
};
const shopPersistConfig = {
  key: 'shop',
  storage,
  blacklist: [''],
  whitelist: ['shopInfo'],
};

const appPersistConfig = {
  key: 'app',
  storage,
  blacklist: [''],
  whitelist: ['loadingApp'],
};

const categoriesPersistConfig = {
  key: 'category',
  storage,
  blacklist: [''],
  whitelist: ['categories', 'configurations', 'imageUrls'],
};

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, Auth),
  app: persistReducer(appPersistConfig, App),
});

export default reducers;
