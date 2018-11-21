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
  // 二级菜单下拉切换 
  $("#category").click(function () {
    $(this).next().stop().slideToggle();
  });
  // 左侧隐藏
  $(".icon-left").click(function () {
    $(".left-side").toggleClass("hidemenu");
    $(".right-side").toggleClass("hidemenu");
    $(".topbar").toggleClass("hidemenu");
  });
  // 登出模态框弹出
  $(".icon-right").click(function () {
    $("#logoutmodal").modal("show");
  });

  //登出
  $("#logoutBtn").click(function () {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function (info) {
        if (info.success) {
          location.href = "login.html"
        }
      }
    })
  })
})