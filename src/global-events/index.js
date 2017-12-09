
export const LOCATION_UPDATE = 'LOCATION_UPDATE';

/**
 * @description Dispatch event
 * @param type
 * @returns {*}
 */
export const dispatchEvent = (type) => {
  switch ( type ) {
    case LOCATION_UPDATE:
      return document.dispatchEvent(new Event('readable.location.update'));
    default:
      return '';
  }
};

/**
 * @description Intercept event
 * @param type
 * @param callback
 * @returns {*}
 */
export const interceptEvent = (type, callback) => {
  switch ( type ) {
    case LOCATION_UPDATE:
      return document.addEventListener('readable.location.update', callback);
    default:
      return '';
  }
};
