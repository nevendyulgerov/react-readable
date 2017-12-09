import ammo from '../common/libs/ammo';
import { storeReducer } from './reducers';

const storeKey = 'readable';

export const persistentStore = ammo.store(storeKey);

export const getCachedItems = (itemKey, key, value) => {
  const data = persistentStore.getItem(itemKey);
  return data.filter(item => item[key] === value);
};

export const getCachedItem = (itemKey, key, value) => {
  const matches = getCachedItems(itemKey, key, value);
  return matches[0];
};

export const persistentStoreInterceptor = store => next => action => {
  const storeData = store.getState();
  storeReducer(persistentStore, storeData, action);
  return next(action);
};
