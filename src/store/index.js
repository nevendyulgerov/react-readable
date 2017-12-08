import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import { syncLocalStore } from './actions';
import { persistentStore, persistentStoreInterceptor, getCachedItem } from '../persistent-store';

// expose part of the PersistentStore API
export { persistentStore, persistentStoreInterceptor, getCachedItem };

// expose store
export const store = createStore(
  reducers,
  compose(applyMiddleware(persistentStoreInterceptor))
);

const syncPersistentStore = () => {
  if ( ! persistentStore.getData() ) {
    persistentStore.setData(store.getState());
  }
  store.dispatch(syncLocalStore(persistentStore.getData()));
};

// synchronize store with persistent store
syncPersistentStore();
