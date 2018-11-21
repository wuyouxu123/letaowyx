$(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChartl = echarts.init(document.querySelector(".ecarts-l"));
  var myChartr = echarts.init(document.querySelector(".ecarts-r"));
  // 指定图表的配置项和数据
  var optionl = {
    title: {
      text: '18年各区神奇海螺生死'
    },
    tooltip: {},
    legend: {
      data: ['死亡数', '出生数']
    },
    xAxis: {
      data: ["1区", "2区", "3区", "4区", "5区", "6区"]
    },
    yAxis: {},
    series: [{
      name: '死亡数',
      type: 'bar',
      data: [199, 88, 138, 233, 255, 203]
    }, {
      name: '出生数',
      type: 'bar',
      data: [212, 241, 236, 153, 166, 292]
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChartl.setOption(optionl);

  optionr = {
    title: {
      text: '上下五千年反派死因',
      subtext: '有理有据',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} | {c} | {d}%"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['没有b数', '脸黑', '自己做', '招惹主角', '死于话多', '自作孽', '其他']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
          value: 1234,
          name: '没有b数'
        },
        {
          value: 1551,
          name: '脸黑'
        },
        {
          value: 1,
          name: '食了屎'
        },
        {
          value: 998,
          name: '招惹主角'
        },
        {
          value: 2333,
          name: '死于话多'
        },
        {
          value: 888,
          name: '自作孽'
        },
        {
          value: 1258,
          name: '其他'
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'yellow'
        }
      }
    }]
  };
  myChartr.setOption(optionr);
})