import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import { updateGlobalStore } from './actions';
import { persistentStore, persistentStoreInterceptor } from '../persistent-store';

// expose store
export const store = createStore(
  reducers,
  compose(applyMiddleware(persistentStoreInterceptor))
);

const syncPersistentStore = () => {
  if ( ! persistentStore.getData() ) {
    persistentStore.setData(store.getState());
  }
  store.dispatch(updateGlobalStore(persistentStore.getData()));
};

// synchronize store with persistent store
syncPersistentStore();
