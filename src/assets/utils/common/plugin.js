import {
  MessageBox,
} from 'element-ui';
import { api } from './api/ajax.js';
import { getTimeString } from './util.js';


export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$api', {
      value: api,
    });
    Object.defineProperty(Vue.prototype, '$messageBox', {
      value: MessageBox,
    });
    Object.defineProperty(Vue.prototype, '$getTimeString', {
      value: getTimeString,
    });
  },
};
