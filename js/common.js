$(function () {
  //顶部进度条
  $(document).ajaxStart(function () {
    NProgress.start();
  });

  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });

  $("#category").click(function () {
    $(this).next().stop().slideToggle();
  });

  $(".icon-left").click(function () {
    $(".left-side").toggleClass("hidemenu");
    $(".right-side").toggleClass("hidemenu");
    $(".topbar").toggleClass("hidemenu");
  })
})