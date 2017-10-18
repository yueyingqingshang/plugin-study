(function() {
    var datepicker = {};

    //获取当月数据
    datepicker.getMonthData = function(year, month) {
        var ret = [];
        //检测是否传入年份月份
        if(!year || (!month && month != 0)) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        };

        //获取当月的第一天
        var firstDay = new Date(year,month - 1,1);
        //获取当月第一天是星期几
        var firstDayWeekDay = firstDay.getDay();
        if(firstDayWeekDay == 0) {
            firstDayWeekDay = 7;
        };
        firstDayWeekDay = firstDayWeekDay - 1;

        //重新设置年份月份
        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;
        //获取上一个月的最后一天
        var lastDayOfLastMonth = new Date(year,month - 1,0);
        //获取上一个月最后一天的日期
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
        //需要显示上一个月的天数
        var preMonthDayCount = firstDayWeekDay - 1;

        //获取当月的最后一天
        var lastDay = new Date(year,month,0);
        var lastDate = lastDay.getDate();

        //通过循环获取当月数据
        for(var i = 0;i<7*6;i++) {
            var date = (i + 1) - firstDayWeekDay;
            var thisMonth = month;
            var showDate = date;
            var isCurrMonth = true;
            //判断日期越界（上月、下月）
            if(date<=0) {
                //上个月
                isCurrMonth = false;
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if(date > lastDate) {
                //下一个月
                isCurrMonth = false;
                thisMonth = month + 1;
                showDate = date - lastDate;
            };

            if(thisMonth == 0) {
                thisMonth = 12;
            };
            if(thisMonth == 13) {
                thisMonth = 1;
            };
            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate,
                isCurrMonth: isCurrMonth
            });
        };
        return {
            year: year,
            month: month,
            days: ret
        };
    };
    window.datepicker = datepicker;
})();
