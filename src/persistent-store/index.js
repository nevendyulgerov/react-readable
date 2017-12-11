import ammo from '../common/libs/ammo';
import { storeInterceptor } from './interceptors';

const storeKey = 'readable';

export const persistentStore = ammo.store(storeKey);

export const getPersistentStoreData = itemKey => persistentStore.getItem(itemKey);

export const getCachedItems = (itemKey, key, value) => {
  const data = getPersistentStoreData(itemKey);
  return data.filter(item => item[key] === value);
};

export const getCachedItem = (itemKey, key, value) => {
  const matches = getCachedItems(itemKey, key, value);
  return matches[0];
};

export const persistentStoreInterceptor = store => next => action => {
  const storeData = store.getState();
  storeInterceptor(persistentStore, storeData, action);
  return next(action);
};
