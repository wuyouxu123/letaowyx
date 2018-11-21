$(function () {
  //顶部进度条
  $(document).ajaxStart(function () {
    NProgress.start();
  });

  $(document).ajaxStop(function () {
    NProgress.done();
  });
})