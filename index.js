/**
 * 移动端适配方案
 * 1rem = viewWidth / 10
 *
 * 参考：手淘(https://github.com/amfe/article/issues/17) 移动端适配方案
 */
(function (win, doc) {
  var docEl = doc.documentElement;
  var dpr = parseInt(win.devicePixelRatio || 1, 10);
  var tid;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  docEl.setAttribute('data-dpr', dpr);

  // 设置 harilines 属性
  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }

  // set 1rem = viewWidth / 10
  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    /**
     * 这个540其实是个经验值，或者最大值
     * 目前主流手机最大的css像素尺寸，是540（比如devicePixelRatio为2，分辨率是1080x1920的手机），所以用了这个经验值。
     * 这样可以让在ipad横屏这种情况下浏览无线页面，不至于因为拉伸适配后体验太差。
     */
    // if (width > 540) {
    //   width = 540;
    // }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
  }

  win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 100);
  }, false);

  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 100);
    }
  }, false);

  refreshRem();
})(window, document);