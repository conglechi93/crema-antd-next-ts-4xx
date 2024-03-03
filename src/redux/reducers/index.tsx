import Settings from './Setting';
import Common from './Common';
import Auth from './Auth';
import Shop from './Shop';
import App from './App';
import Category from './Categories';
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
  settings: Settings,
  auth: persistReducer(authPersistConfig, Auth),
  common: Common,
  shop: persistReducer(shopPersistConfig, Shop),
  app: persistReducer(appPersistConfig, App),
  category: persistReducer(categoriesPersistConfig, Category),
});

export default reducers;
