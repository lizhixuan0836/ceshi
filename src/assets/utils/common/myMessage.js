import { Message } from 'element-ui';

const myMessage = function (options) {
  Message({
    visible: options.visible || false,
    message: options.message || '警告哦，这是一条警告消息',
    duration: options.duration || 4000,
    type: options.type || 'info',
    iconClass: options.iconClass || '',
    customClass: options.customClass || '',
    onClose: options.onClose || null,
    showClose: options.showClose || false,
    closed: options.closed || false,
    timer: options.timer || null,
    dangerouslyUseHTMLString: true,
  });
};

['success', 'warning', 'info', 'error'].forEach((type) => {
  myMessage[type] = function (options) {
    if (typeof options === 'string') {
      options = {
        message: options,
      };
    }

    options.type = type;
    return myMessage(options);
  };
});

export default myMessage;
