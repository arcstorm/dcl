require('css/app.less');
require('zepto');
require('./zepto.fullpage');

$('.wp-inner').fullpage({
  change: function (e) {
    // 移除动画属性
    $('.page').eq(e.cur).find('.js-animate').each(function () {
      $(this).removeClass($(this).data('animate')).hide();
    });
  },
  afterChange: function (e) {
    // 添加动画属性
    $('.page').eq(e.cur).find('.js-animate').each(function () {
      var $this = $(this);
      var time = $this.data('time');
      setTimeout(function () {
        $this.addClass($this.data('animate')).show();
      }, time)
    });
  }
});
