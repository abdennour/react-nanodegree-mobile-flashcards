import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import { AsyncStorage } from 'react-native';
import pushNotifications from './middlewares/pushNotifications';
import reducers from './reducers';

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(pushNotifications), autoRehydrate())
);

persistStore(store, { storage: AsyncStorage });

export default store;
