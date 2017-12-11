
export const LOCATION_UPDATE = 'LOCATION_UPDATE';

/**
 * @description Dispatch event
 * @param type
 * @returns {*}
 */
const dispatchEvent = (type) => {
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
const interceptEvent = (type, callback) => {
  switch ( type ) {
    case LOCATION_UPDATE:
      return document.addEventListener('readable.location.update', callback);
    default:
      return '';
  }
};

/**
 * @description Dispatch location update event
 * @returns {*}
 */
export const dispatchLocationUpdate = () => dispatchEvent(LOCATION_UPDATE);

/**
 * @description Intercept location update event
 * @param callback
 * @returns {*}
 */
export const interceptLocationUpdate = callback => interceptEvent(LOCATION_UPDATE, callback);
