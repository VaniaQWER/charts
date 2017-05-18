const option = {
    title: {
        text: '骨科耗占比(同比)'
    },
    tooltip: {},
    legend: {
        data: ['2015年1月', '2016年1月', '2017年1月']
    },
    radar: {
        // shape: 'circle',
        indicator: [
           { name: '总金额', max: 100},
           { name: '金额', max: 100},
           { name: '占比', max: 100},
           { name: '临时占位符', max: 100}
        ]
    },
    series: [{
        name: '骨科耗占比同比',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [90, 30 , 33.33, 100],
                name : '2015年1月数据'
            },
             {
                value : [84, 15, 17.86, 100],
                name : '2016年1月数据'
            } ,
            {
                value : [60, 20, 33.33, 100],
                name : '2017年1月数据'
            }
        ]
    }]
};

export default option;