$(function () {
  var currentPage = 1;
  var pageSize = 5;

  var currentId = 1;
  var isDelete;

  // template模板渲染页面
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (info) {
        console.log(info)
        var htmlStr = template("usertmp", info);
        $("tbody").html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });

      }
    })
  }

  //改变用户状态模态框
  $("tbody").on('click', '.btn', function () {
    $("#usermodal").modal("show");

    currentId = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    // console.log(currentId)
  })
  $("#changeBtn").click(function () {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      dataType: "json",
      data: {
        id: currentId,
        isDelete: isDelete,
      },
      success: function (info) {
        if (info.success) {
          // console.log(info)
          $("#usermodal").modal("hide");
          render();
        }
      }
    })
  })


})