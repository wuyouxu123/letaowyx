$(function () {
  var currentPage = 1;
  var pageSize = 5;


  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      dateType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template("secondtmp", info);
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
    });

  }

  $("#addCate").click(function () {
    $("#addmodal").modal("show");
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        console.log(info);
        var htmlStr = template("addtmp", info);
        $(".dropdown-menu").html(htmlStr);
      }
    })
  });

  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $("#dropdown1").text(txt);

    var id = $(this).data("id");
    $('[name="categoryId"]').val(id);
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  });

  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var result = data.result;
      var purl = result.picAddr;
      $("#img1 img").attr("src", purl);
      $("[name='brandLogo']").val(purl);
      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  $('#form').bootstrapValidator({
    // 配置排除项, 需要对隐藏域进行校验
    excluded: [],

    // 配置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    // 配置校验字段
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      dataType: 'json',
      data: $("#form").serialize(),
      success: function (info) {
        if (info.success) {
          $("#addmodal").modal("hide");

          currentPage = 1;
          render();

          $("#form").data('bootstrapValidator').resetForm(true);
          $("#dropdown1").text("请选择一级分类");
          $("#img1 img").attr("src", "./images/none.png");
        }
      }
    })
  });

})