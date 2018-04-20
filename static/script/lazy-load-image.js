/* 图片赖加载 */

(function(_document, _window){
  var lazyLoadImage = null;
  var lazyLoadImageLen = null;
  var n = 0;

  function onWindowScroll(event){
    var seeHeight = _window.innerHeight;
    var scrollTop = _document.documentElement.scrollTop || _document.body.scrollTop;
    for(var i = n; i < lazyLoadImageLen; i++){
      var item = lazyLoadImage[i];
      if(item.getBoundingClientRect().top < seeHeight + scrollTop - 150 && item.src === ''){
        item.src = item.getAttribute('data-src');
        n = i + 1;
      }
    }
    if(n === lazyLoadImageLen){
      _window.removeEventListener('scroll', onWindowScroll);
    }
  }

  function onDocumentReady(event){
    lazyLoadImage = _document.querySelectorAll('.lazy-load-image');
    lazyLoadImageLen = lazyLoadImage.length;
    onWindowScroll();
    _document.removeEventListener('DOMContentLoaded', onDocumentReady);
    _window.addEventListener('scroll', onWindowScroll, false);
  }

  _document.addEventListener('DOMContentLoaded', onDocumentReady, false);
})(document, window);