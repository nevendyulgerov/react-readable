
/**
 * Library: Ammo
 * Version: 1.4.1
 * Standard: ECMAScript 2015
 * Author: Neven Dyulgerov
 * License: Released under the MIT license
 *
 * Description: Provides general purpose utility belt for building front-end applications
 */


import ammo from "../index";

/**
 * @description Provide DOM context
 * Contx
 * @param context
 * @returns {*|HTMLDocument}
 */
export const contx = (context) => context || document;


/**
 * @description Event handler for DOM Ready
 * @param callback
 */
export const onDomReady = (callback) => {
  document.addEventListener('DOMContentLoaded', callback);
  return this;
};


/**
 * @description Event handler for hover
 * @param domEls
 * @param onIn
 * @param onOut
 */
export const onHover = (domEls, onIn, onOut) => {
  let lastHovered;
  each(domEls, (el) => {
    el.addEventListener('mouseenter', (e) => {
      lastHovered = e.target;
      onIn(e);
    });
    el.addEventListener('mouseout', (e) => {
      onOut(e, lastHovered);
    });
  });
};


/**
 * @description Delegate event to given selector with className
 * @param event
 * @param className
 * @param callback
 * @param context
 */
export const delegateEvent = (event, className, callback, context) => {
  let classNames = className.indexOf('.') > -1 ? className.split('.') : [className];
  classNames = classNames.filter(item => !isUndef(item) && item !== '');
  let containsCounter = 0;

  contx(context).addEventListener(event, (e) => {
    if ( e.target ) {
      classNames.map(className => {
        if ( e.target.classList.contains(className) ) {
          containsCounter++;
        }
        return className;
      });
    }

    if ( containsCounter === classNames.length && containsCounter > 0 ) {
      callback(e);
    }
    containsCounter = 0;
  });
};


/**
 * @description Get node by given selector
 * @param selector
 * @param context
 * @returns {Node}
 */
export const getEl = (selector, context) => contx(context).querySelector(selector);


/**
 * @description Get node list by given selector
 * @param selector
 * @param context
 */
export const getEls = (selector, context) => contx(context).querySelectorAll(selector);


/**
 * @description Remove node from the DOM
 * @param domEl
 */
export const removeEl = (domEl) => {
  domEl.parentNode.removeChild(domEl);
  return this;
};


/**
 * @description Check if element is hovered
 * @param selector
 * @returns {boolean}
 */
export const isHovered = (selector) => {
  const domEl = getEl(selector);
  return domEl.parentNode.querySelector(':hover') === domEl;
};


/**
 * @description Append HTML content after the end of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const appendAfter = (html, context) => {
  contx(context).insertAdjacentHTML('afterend', html.toString());
  return this;
};


/**
 * @description Append HTML content before the end of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const appendBefore = (html, context) => {
  contx(context).insertAdjacentHTML('beforeend', html.toString());
  return this;
};


/**
 * @description Prepend HTML content after the beginning of a node
 * @param html
 * @param context
 * @returns {*}
 */
export const prependAfter = (html, context) => {
  contx(context).insertAdjacentHTML('afterbegin', html.toString());
  return this;
};


/**
 * @description Prepend HTML content before the beginning of a node
 * @param html
 * @param context
 */
export const prependBefore = (html, context) => {
  contx(context).insertAdjacentHTML('beforebegin', html.toString());
  return this;
};


/**
 * @description Linear iterator for object properties
 * @param elements
 * @param callback
 */
export const each = (elements, callback) => {
  Object.keys(elements).forEach((k, i) => {
    callback(elements[k], i);
  });
  return this;
};


/**
 * @description Check if value is of type 'object'
 * @param val
 * @returns {boolean}
 */
export const isObj = val => typeof val === 'object' && !isArr(val) && !isNull(val);


/**
 * @description Check if value is of type 'null'
 * @param val
 * @returns {boolean}
 */
export const isNull = val => val === null;


/**
 * @description Check if value is of type 'number'
 * @param val
 * @returns {boolean}
 */
export const isNum = val => typeof val === 'number' && !isNaN(val);


/**
 * @description Check if value is of type 'function'
 * @param val
 * @returns {boolean}
 */
export const isFunc = val => typeof val === 'function';


/**
 * @description Check if value is of type 'array'
 * @param val
 * @returns {boolean}
 */
export const isArr = val => Array.isArray(val);


/**
 * @description Check if value is of type 'string'
 * @param val
 * @returns {boolean}
 */
export const isStr = val => typeof val === 'string';


/**
 * @description Check if value is of type 'undefined'
 * @param val
 * @returns {boolean}
 */
export const isUndef = val => typeof val === 'undefined';


/**
 * @description Check if value is of type 'boolean'
 * @param val
 * @returns {boolean}
 */
export const isBool = val => typeof val === 'boolean';


/**
 * @description Check if object has property
 * @param obj
 * @param prop
 * @returns {boolean}
 */
export const hasProp = (obj, prop) => obj.hasOwnProperty(prop);


/**
 * @description Check if object has method
 * @param obj
 * @param method
 * @returns {boolean}
 */
export const hasMethod = (obj, method) => hasProp(obj, method) && isFunc(method);


/**
 * @description Check if object has key
 * @param obj
 * @param key
 * @returns {boolean}
 */
export const hasKey = (obj, key) => getKeys(obj).indexOf(key) > -1;


/**
 * @description Get object keys
 * @param obj
 * @returns {Array}
 */
export const getKeys = obj => Object.keys(obj);


/**
 * @description Iterate over each key of an object
 * @param obj
 * @param callback
 */
export const eachKey = (obj, callback) => {
  Object.keys(obj).forEach((k, i) => callback(obj[k], k, i));
};


/**
 * @description Get url param
 * @param name
 * @returns {Array|{index: number, input: string}|*|string}
 */
export const getUrlParam = (name) => {
  const match = new RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};


/**
 * @description Get random integer between two numbers
 * @param min
 * @param max
 * @returns {*}
 */
export const randomInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 * @description Iterate recursively
 * @param handler
 * @param complete
 * @param index
 * @returns {*}
 */
export const recurIter = (handler, complete, index) => {
  index = index || 0;
  handler(index, (canRecur) => {
    if ( ! canRecur ) {
      return complete();
    }
    recurIter(handler, complete, ++index);
  });
};


/**
 * @description Poll over an interval of time
 * @param handler
 * @param complete
 * @param interval
 */
export const poll = (handler, complete, interval) => {
  setTimeout(() => {
    handler((canPoll) => {
      if ( canPoll ) {
        return poll(handler, complete, interval);
      }
      complete();
    });
  }, interval);
};


/**
 * @description Buffer high-frequency events
 * @returns {function(*=, *=, *=)}
 */
export const buffer = function() {
  let timers = {};
  return (id, ms, clb) => {
    if ( ! id ) {
      timers[id] = '0';
    }
    if ( timers[id] ) {
      clearTimeout(timers[id]);
    }
    timers[id] = setTimeout(clb, ms);
  };
};


/**
 * @description Local storage API
 * @param key
 * @returns {*}
 */
export const store = function(key) {
  let storage;
  if ( ! isStr(key) ) {
    return new Error("[Storage] Invalid storage key. Provide a key {string}.");
  }

  let storageTemplates = {
    localStorage: {
      getStorage: function() {
        return localStorage;
      },
      setStorageItem: function(key, value) {
        this.getStorage().setItem(key, value);
      },
      getStorageItem: function(key) {
        return this.getStorage().getItem(key);
      },
      removeStorageItem: function(key) {
        this.getStorage().removeItem(key);
      }
    }
  };
  storage = storageTemplates.localStorage;

  const decodeData = function(data) {
    return JSON.parse(data);
  };
  const encodeData = function(data) {
    return JSON.stringify(data);
  };
  const getData = function(key) {
    return decodeData(storage.getStorageItem(key));
  };
  const setData = function(key, data) {
    storage.setStorageItem(key, encodeData(data));
  };
  const removeData = function(key) {
    storage.removeStorageItem(key);
  };

  return {
    getData: function() {
      let data = getData(key);
      return data !== null ? getData(key) : undefined;
    },
    setData: function(newData) {
      setData(key, newData);
      return this;
    },
    removeData: function() {
      removeData(key);
      return this;
    },
    getItem: function(itemKey) {
      let data = this.getData();
      return data[itemKey];
    },
    setItem: function(itemKey, itemValue) {
      let data = this.getData();
      data[itemKey] = itemValue;
      setData(key, data);
      return this;
    },
    removeItem: function(itemKey) {
      let data = this.getData();
      data[itemKey] = undefined;
      setData(key, data);
      return this;
    }
  };
};


/**
 * @description Create sequential execution for async functions
 * @returns {{chain: chain, execute: execute}}
 */
export const sequence = function() {
  let chained = [];
  let value;
  let error;

  const chain = function(func) {
    if ( chained ) {
      chained.push(func);
    }
    return this;
  };
  const execute = function(index) {
    let callback;
    index = typeof index === "number" ? index : 0;
    if ( ! chained || index >= chained.length ) {
      return true;
    }

    callback = chained[index];
    callback({
      resolve(_value) {
        value = _value;
        execute(++index);
      },
      reject(_error) {
        error = _error;
        execute(++index);
      },
      response: {
        value: value,
        error: error
      }
    });
  };

  return {
    chain,
    execute
  };
};


/**
 * @description Set style property for given node
 * @param selection
 * @param index
 * @param prop
 * @param value
 */
const style = (selection, prop, value, index) => {
  const currStyle = selection.style.getPropertyValue(prop);
  selection.style.setProperty(prop, isFunc(value) ? (value(selection, currStyle, index) || selection.style.getProperty(prop, currStyle)) : value, '');
};


/**
 * @description Set attribute property for given node
 * @param {object} selection
 * @param {string} prop
 * @param {string/function} value
 * @param {number} index
 */
const attr = (selection, prop, value, index) => {
  const currValue = selection.getAttribute(prop);
  selection.setAttribute(prop, isFunc(value) ? (value(selection, currValue, index) || currValue) : value);
};


/**
 * @description Set innerHTML for given node
 * @param {object} selection
 * @param {(string|function)} value
 * @param {number=} index
 */
const elText = (selection, value, index) => {
  selection.innerHTML = isFunc(value) ? value(selection.innerHTML, index) || selection.innerHTML : value;
};


/**
 * @description Filter nodes based on signature (static - value is a string, dynamic - value is a function)
 * @param {object} selection
 * @param {(string|function)} value
 * @param {string} selector
 * @param {number=} index
 * @returns {*}
 */
const filter = (selection, value, selector, index) => {
  if ( isFunc(value) ) {
    return value(selection, index);
  }
  if ( isStr(value) ) {
    if ( value.indexOf(':') === -1 ) {
      return selection.classList.contains(value);
    }

    const matches = selection.parentNode.querySelectorAll(`${selector}${value}`);
    let isMatch = false;
    each(matches, el => {
      if ( el.isSameNode(selection) && ! isMatch ) {
        isMatch = true;
      }
    });
    return isMatch;
  }
};


/**
 * @description DOM manipulation API for single node
 * @param {(string|object)} selector
 * @param {object=} context
 * @returns {object}
 */
export const select = function(selector, context) {
  let selection = isStr(selector) ? getEl(selector, context) : selector;
  return {
    find(findSelector) {
      selection = getEl(findSelector, selection);
      return this;
    },
    text(value) {
      elText(selection, value, 0);
      return this;
    },
    style(prop, value) {
      style(selection, prop, value, 0);
      return this;
    },
    attr(prop, value) {
      attr(selection, prop, value, 0);
      return this;
    },
    data(data) {
      selection.innerHTML = data;
      return this;
    },
    on(event, callback) {
      selection.addEventListener(event, callback);
      return this;
    },
    get: () => selection
  }
};


/**
 * @description DOM manipulation API for node lists
 * @param {string} selector
 * @param {object=} context
 * @returns {object}
 */
export const selectAll = function(selector, context) {
  let selection = isStr(selector) ? getEls(selector, context) : selector;
  let filtered;
  return {
    filter(value) {
      filtered = [];
      each(selection, (el, index) => {
        if ( filter(el, value, selector, index) ) {
          filtered.push(el);
        }
      });
      selection = filtered;
      return this;
    },
    find(findSelector) {
      if ( filtered ) {
        filtered = getEls(findSelector, filtered.firstChild);
      } else {
        selection = getEls(findSelector, selection.firstChild);
      }
      return this;
    },
    text(value) {
      each(filtered || selection, (el, index) => elText(el, value, index));
      return this;
    },
    style(prop, value) {
      each(filtered || selection, (el, index) => style(el, prop, value, index));
      return this;
    },
    attr(prop, value) {
      each(filtered || selection, (el, index) => attr(el, prop, value, index));
      return this;
    },
    data(data) {
      each(filtered || selection, (el, index) => el.innerHTML = data[index]);
      return this;
    },
    on(event, callback) {
      each(filtered || selection, (el, index) => el.addEventListener(event, callback));
      return this;
    },
    each(handler) {
      each(filtered || selection, handler);
      return this;
    },
    eq(index) {
      const nodes = filtered || selection;
      return nodes.length > 0 && isObj(nodes[index]) ? nodes[index]: undefined;
    },
    index(indexSelector) {
      let matchIndex = -1;
      each(filtered || selection, (el, index) => {
        if ( el.classList.contains(indexSelector) && matchIndex === -1 ) {
          matchIndex = index;
        }
      });
      return matchIndex;
    },
    async(handler, complete) {
      const sequencer = sequence();

      each(filtered || selection, (el, index) => {
        sequencer.chain(seq => handler(seq.resolve, el, index));
      });

      if ( isFunc(complete) ) {
        sequencer.chain(() => complete());
      }

      sequencer.execute();
      return this;
    },
    get: () => filtered || selection
  }
};


/**
 * @description Convert text to a title text - first word's first letter is upper case
 * @param text
 * @param splitBy
 * @returns {string}
 */
export const titlize = (text, splitBy) => {
  return text.split(splitBy).map((word, index) => index > 0 ? word : word.charAt(0).toUpperCase()+word.slice(1).toLowerCase()).join(' ');
};


/**
 * @description AJAX API based on XMLHttpRequest
 * @param options
 */
export const request = options => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if ( xhr.readyState === XMLHttpRequest.DONE ) {
      if ( xhr.status === 200 ) {
        options.callback(null, JSON.parse(xhr.responseText));
      } else {
        options.callback(xhr.responseText, null);
      }
    }
  };

  xhr.open(options.type || 'GET', options.url);

  if ( options.headers ) {
    eachKey(options.headers, (val, key) => xhr.setRequestHeader(key, val));
  }

  if ( options.data ) {
    xhr.setRequestHeader('Content-Type', 'application/json');
    let params = [];
    getKeys(options.data).forEach(key => params.push(`${key}=${(options.data[key])}`));
    xhr.send(JSON.stringify(options.data));
  } else {
    xhr.send();
  }
};


/**
 * Format time to MMM. DD, YYYY
 * @param milliseconds
 * @returns {string}
 */
export const formatTime = milliseconds => {
  if ( ! isNum(milliseconds) ) {
    milliseconds = parseInt(milliseconds, 10);
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(milliseconds);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${months[month]}. ${day}, ${year}`;
};


/**
 * @description Random gradient
 * @param multiplier
 * @returns {string}
 */
export const randomGradient = multiplier => {
  const c1 = {
    r: Math.floor(Math.random() * multiplier),
    g: Math.floor(Math.random() * multiplier),
    b: Math.floor(Math.random() * multiplier)
  };
  const c2 = {
    r: Math.floor(Math.random() * multiplier),
    g: Math.floor(Math.random() * multiplier),
    b: Math.floor(Math.random() * multiplier)
  };
  c1.rgb = `rgb(${c1.r}, ${c1.g}, ${c1.b})`;
  c2.rgb = `rgb(${c2.r}, ${c2.g}, ${c2.b})`;
  return 'radial-gradient(at top left, '+c1.rgb+', '+c2.rgb+')';
};


/**
 * @description Reduce two arrays into one containing unique values
 * @param arrA
 * @param arrB
 * @param prop
 */
export const unique = (arrA, arrB, prop) => {
  const uniqueA = arrA.reduce((accumulator, itemA) => {
    const duplicates = accumulator.filter(item => itemA[prop] === item[prop]);

    if ( duplicates.length === 0 ) {
      accumulator.push(itemA);
    }
    return accumulator;
  }, []);

  return arrB.reduce((accumulator, itemB) => {
    const duplicates = accumulator.filter(item => itemB[prop] === item[prop]);

    if ( duplicates.length === 0 ) {
      accumulator.push(itemB);
    }
    return accumulator;
  }, uniqueA);
};

/**
 * @description Get url parts
 * @returns {string[]}
 */
export const getUrlParts = () => window.location.pathname.split('/').filter(item => ammo.isStr(item) && item !== '');


/**
 * @description Create encapsulated, augmentative, object-based application
 * @param {object=} store
 * @param {object=} props
 * @returns {Error}
 */
export const app = function(store = {}, props = {}) {
  let app = {
    store,
    props,
    nodes: {}
  };
  let schemas = {
    'default': ['events', 'renderers', 'actions'],
    app: ['events', 'actions', 'common', 'modules', 'core'],
    module: ['events', 'actions', 'templates', 'views']
  };
  let storage;
  const persistentStorage = store;
  const date = new Date();

  const factory = function() {
    const augment = function(nodeFamily) {
      let nodes = app.nodes;
      const families = !isArr(nodeFamily) ? [nodeFamily] : nodeFamily;
      families.map(family => {
        if ( ! hasProp(nodes, family) ) {
          nodes[family] = {};
        }
        return family;
      });
      return this;
    };

    const addSchema = function(schemaName, schema) {
      if ( ! hasProp(schemas, schemaName) && isArr(schema) ) {
        schemas[schemaName] = schema;
      }
      return this;
    };

    const schema = function(schema) {
      if ( hasProp(schemas, schema) ) {
        augment(schemas[schema]);
      }
      return this;
    };

    const addNode = function(nodeFamily, nodeName, func) {
      let nodes = app.nodes;
      if ( hasProp(nodes, nodeFamily) && ! hasProp(nodes[nodeFamily], nodeName) && isFunc(func) ) {
        nodes[nodeFamily][nodeName] = func;
      }
      return this;
    };

    const getNode = function(nodeFamily, nodeName) {
      let nodes = app.nodes;
      if ( hasProp(nodes, nodeFamily) && hasProp(nodes[nodeFamily], nodeName) && isFunc(nodes[nodeFamily][nodeName]) ) {
        return nodes[nodeFamily][nodeName];
      } else {
        return false;
      }
    };

    const callNode = function(nodeFamily, nodeName, params) {
      const nodeParams = ! isUndef(params) ? params : {};
      let node = getNode(nodeFamily, nodeName);
      if ( node ) {
        node(nodeParams);
      }
      return this;
    };

    const getNodes = function(nodeFamily) {
      return nodeFamily && hasProp(app.nodes, nodeFamily) ? app.nodes[nodeFamily] : app.nodes;
    };

    const configure = function(nodeFamily) {
      const nodes = app.nodes;
      if ( hasProp(nodes, nodeFamily) ) {
        return {
          node: function(nodeName, func) {
            addNode(nodeFamily, nodeName, func);
            return this;
          },
          configure: configure
        };
      }
      return false;
    };

    const nodeExists = function(nodeFamily, nodeName) {
      return hasProp(app.nodes, nodeFamily) && isFunc(app.nodes[nodeFamily][nodeName]);
    };

    const getProps = function(name) {
      const props = app.props;
      return hasProp(props, name) ? props[name] : props;
    };

    const inherit = function(app, nodeFamilies) {
      const nodes = app.getNodes();

      eachKey(nodes, (nodeFamily, familyName) => {
        if ( nodeFamilies && nodeFamilies.indexOf(familyName) === -1 ) {
          return false;
        }
        augment(familyName);
        eachKey(nodeFamily, (node, nodeName) => addNode(familyName, nodeName, node));
      });
      return this;
    };

    const overwrite = function(nodeFamily) {
      const nodes = app.nodes;
      if ( hasProp(nodes, nodeFamily) ) {
        return {
          node: function(nodeName, func) {
            nodes[nodeFamily][nodeName] = func;
            return this;
          },
          overwrite: this.overwrite
        };
      }
      return false;
    };

    const getStore = function(storeKey) {
      const store = app.store;
      return hasProp(store, storeKey) ? store[storeKey] : store;
    };

    const getStoreData = function(storeKey) {
      const store = app.store;
      return hasProp(store, storeKey) ? (store[storeKey].lastValue ? store[storeKey].lastValue : store[storeKey]) : store;
    };

    const updateStore = function(storeKey, handler) {
      const store = app.store;
      if ( ! hasProp(store, storeKey) ) {
        return false;
      }

      if ( ! isObj(store[storeKey]) && ! isArr(store[storeKey]) ) {
        const originalStoreVal = store[storeKey];
        store[storeKey] = { lastValue: originalStoreVal };
      }

      const dataItem = {
        value: store[storeKey].lastValue ? handler(store[storeKey].lastValue) : handler(store[storeKey]),
        modified: date.getTime()
      };

      store[storeKey] = {
        history: isArr(store[storeKey].history) ? [...store[storeKey].history, ...[dataItem]] : [dataItem],
        lastValue: dataItem.value,
        lastModified: dataItem.modified
      };

      if ( storage ) {
        storage.setItem(storeKey, dataItem.value);
      }
    };

    const syncStorage = function() {
      if ( isUndef(app.props.storeKey) ) {
        throw new Error(`[Ammo.app] Invalid synchronization with localStorage. Synchronized apps require a store key. Pass a store key as part of the app's props.`);
      }
      storage = persistentStorage(app.props.storeKey);

      if ( ! storage.getData() ) {
        storage.setData(app.store);
      }
      return this;
    };

    const clearStorage = function() {
      if ( ! storage ) {
        return false;
      }
      storage.setData({});
    };

    const getStorage = function(storeKey) {
      return isStr(storeKey) ? storage.getItem(storeKey) : storage.getData();
    };

    const createInstance = function() {
      return {
        schema,
        addSchema,
        augment,
        configure,
        addNode,
        getNode,
        callNode,
        nodeExists,
        getNodes,
        getProps,
        inherit,
        overwrite,
        getStore,
        getStoreData,
        updateStore,
        syncStorage,
        clearStorage,
        getStorage
      };
    };

    return createInstance();
  };

  return factory();
};
