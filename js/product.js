$(function () {
  var currentPage = 1;
  var pageSize = 3;

  var picArr = [];
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      dataType: 'json',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (info) {
        // console.log(info)
        var htmlStr = template("productTmp", info);
        $("tbody").html(htmlStr);

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, page) {
            // 更新当前页
            currentPage = page;
            render();
          }
        })


      }
    })
  };

  $("#addProduct").click(function () {
    $("#addmodal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      dataType: "json",
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        var liStr = template("secondTmp", info);
        $(".dropdown-menu").html(liStr);


      }
    })
  });

  $(".dropdown-menu").on("click", "a", function () {
    var txt = $(this).text();
    $("#dropdown2").text(txt);

    $("[name='brandId']").val($(this).data("id"));

    $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID");
  })

  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      var result = data.result;
      var purl = result.picAddr;
      picArr.unshift(result);
      $('#img1').prepend('<img src="' + purl + '" style="width: 100px;">');
      if (picArr.length > 3) {
        picArr.pop();
        $("#img1 img:last-of-type").remove();
      }
      if (picArr.length === 3) {
        $("#form").data('bootstrapValidator').updateStatus("picStatus", "VALID")
      };
    }
  });

  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            //正则校验, 非零(1-9)
            // \d  0-9
            // *    表示0次或多次
            // +    表示1次或多次
            // ?    表示0次或一次
            // {m,n}
            regexp: /^[1-9]\d*$/,
            message: "商品库存必须是非零开头的数字"
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "必须是xx-xx的格式, xx是两位数字, 例如: 36-44"
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      },
    }

  });


  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();

    var uploadStr = $("#form").serialize();

    uploadStr += "&picName1=" + picArr[0].picName + "&picAddr1" + picArr[0].picAddr;
    uploadStr += "&picName2=" + picArr[1].picName + "&picAddr2" + picArr[1].picAddr;
    uploadStr += "&picName3=" + picArr[2].picName + "&picAddr3" + picArr[2].picAddr;
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      dataType: 'json',
      data: uploadStr,
      success: function (info) {
        $("#addmodal").modal("hide");
        currentPage = 1;
        render();

        $("#form").data('bootstrapValidator').resetForm(true);
        $("#dropdown2").text("请选择二级分类");
        $("#img1 img").remove();
        picArr = [];
      }
    })
  });


})