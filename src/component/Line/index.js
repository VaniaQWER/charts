const option = {
    title: {
        text: '骨科耗占比折叠图'
    },
    legend: {
        data:['总金额', '金额', '占比']
    },
    grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2017年1月', '2017年2月', '2017年3月']
    },
    yAxis: {
        data: null
    },
    series: [
        {
            name:'总金额',
            type:'line',
            stack: '总量',
            data: [90, 84, 60]
        },
        {
            name:'金额',
            type:'line',
            stack: 'aaaaaa',
            data:[30, 15, 22]
        },
        {
            name:'占比',
            type:'line',
            stack: '总量',
            data:[33.33, 17.86, 33.33]
        }
    ]
};

export default option;