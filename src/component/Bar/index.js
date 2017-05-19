const option = {
    title: {
        text: '耗占比柱状图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['科室一', '科室二', '科室三']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['2017年1月', '2017年2月', '2017年3月']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name: '科室一',
            type: 'bar',
            stack: '科室一',
            data: [90, 84, 60]
        },
        {
            name: '科室二',
            type: 'bar',
            stack: '科室二',
            data:[30, 15, 20]
        },
        {
            name:'科室三',
            type:'bar',
            stack: '科室三',
            data:[33.33, 17.86, 33.33]
        }
    ]
};

export default option;