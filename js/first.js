$(function () {
  var currentPage = 1;
  var pageSize = 5;


  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (info) {
        var htmlStr = template("firsttmp", info);
        $("tbody").html(htmlStr);
        // console.log(info);

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
  };

  $("#addCate").click(function () {
    $("#addmodal").modal("show");
  });

  $("#form").bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类名'
          }
        }
      },
    }

  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      dataType: "json",
      data: $("#form").serialize(),
      success: function (info) {
        if (info.success) {
          $("#addmodal").modal("hide");
          currentPage = 1;
          render();
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  });


})