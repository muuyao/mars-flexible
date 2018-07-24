/**
 * 移动端适配方案
 * 1rem = viewWidth / 10
 *
 * 参考：手淘(https://github.com/amfe/article/issues/17) 移动端适配方案
 */
(function(win, doc) {
  var docEl = doc.documentElement;
  var dpr = 0;
  var tid;

  var isAndroid = win.navigator.appVersion.match(/android/gi);
  var isIPhone = win.navigator.appVersion.match(/iphone/gi);
  var devicePixelRatio = win.devicePixelRatio;
  if (isIPhone) {
    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
      dpr = 3;
    } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
      dpr = 2;
    } else {
      dpr = 1;
    }
  } else {
    // 其他设备下，仍旧使用1倍的方案
    dpr = 1;
  }

  docEl.setAttribute('data-dpr', dpr);

  // 设置 harilines 属性
  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body');
    var testElement = document.createElement('div');
    testElement.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody);
  }

  // set 1rem = viewWidth / 10
  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    // if (width / dpr > 1080) {
    //   width = 1080 * dpr;
    // }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
  }

  win.addEventListener(
    'resize',
    function() {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 100);
    },
    false
  );

  win.addEventListener(
    'pageshow',
    function(e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 100);
      }
    },
    false
  );

  // adjust body font size
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    doc.addEventListener(
      'DOMContentLoaded',
      function(e) {
        doc.body.style.fontSize = 12 * dpr + 'px';
      },
      false
    );
  }

  refreshRem();
})(window, document);
