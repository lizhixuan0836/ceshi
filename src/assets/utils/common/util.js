import webMessage from './myMessage.js';

// 获取cookie
export function getCookie(name) {
  if (document.cookie.length > 0) {
    let cookieStart = document.cookie.indexOf(`${name}=`);

    if (cookieStart !== -1) {
      cookieStart = cookieStart + name.length + 1;
      let cookieEnd = document.cookie.indexOf(';', cookieStart);

      if (cookieEnd === -1) cookieEnd = document.cookie.length;

      return document.cookie.substring(cookieStart, cookieEnd);
    }
  }
  return '';
}

export function addZero(n) {
  return n < 10
    ? `0${n}`
    : `${n}`;
}

// 传入毫秒数
// hasTime为true得到yy-mm-dd HH:ii:ss
// hasTime为false得到yy-mm-dd
// 不传默认为true
export function getTimeString(t, hasTime, sep) {
  const d = new Date(t);
  const dateArr = [];
  const timeArr = [];
  sep = sep || '-';

  dateArr[0] = d.getFullYear();
  dateArr[1] = addZero(d.getMonth() + 1);
  dateArr[2] = addZero(d.getDate());
  timeArr[0] = addZero(d.getHours());
  timeArr[1] = addZero(d.getMinutes());
  timeArr[2] = addZero(d.getSeconds());

  if (arguments.length < 2 || hasTime) {
    return `${dateArr.join(sep)} ${timeArr.join(':')}`;
  } else {
    return dateArr.join(sep);
  }
}

// 设置cookie
export function setCookie(cname, cvalue, exdays, domainStr) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  const domain = domainStr
    ? `;domain=${domainStr}`
    : '';
  document.cookie = `${cname}=${cvalue}; ${expires}${domain}`;
}
// 清除cookie
export function clearCookie(name, domainStr) {
  setCookie(name, '', -1, domainStr);
}

// 复制
export function copyAction(text) {
  const oInput = document.createElement('textarea');

  oInput.value = text;
  document.body.appendChild(oInput);
  oInput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  oInput.style.display = 'none';

  webMessage.success('复制成功');
}


// 复制到剪贴板方法
export function copyText(text) {
  const textarea = document.createElement('textarea');
  const currentFocus = document.activeElement;
  let flag = false;

  document.body.appendChild(textarea);
  textarea.value = text;
  textarea.focus();
  if (textarea.setSelectionRange) { textarea.setSelectionRange(0, textarea.value.length); } else { textarea.select(); }
  try {
    flag = document.execCommand('copy');
  } catch (eo) {
    flag = false;
  }
  document.body.removeChild(textarea);
  currentFocus.focus();
  return flag;
}


// 映射关系转化方法
export function transData(dataArray, keyName, valueName, transVal) {
  let transName = '';
  (dataArray || []).forEach(element => {
    if (element[keyName] === transVal) {
      transName = element[valueName];
    }
  });
  return transName;
}

// 随机数
export function getRandom() {
  return `${Math.random().toString(16).substring(2)}_${Date.now()}`;
}
