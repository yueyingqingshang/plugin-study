(function() {
    var datepicker = window.datepicker;
    var result;
    var $wraper;
    datepicker.buildUi = function(year,month) {
        result = datepicker.getMonthData(year,month);
        var html = '<div class="ui-datepicker-header">'+
    			'<a href="javascript:;" class="ui-datepicker-btn ui-prev">&lt;</a>'+
    			'<span class="ui-datepicker-curr-month">'+result.year+'-'+result.month+'</span>'+
    			'<a href="javascript:;" class="ui-datepicker-btn ui-next">&gt;</a>'+
    		'</div>'+
    		'<div class="ui-datepicker-body">'+
    			'<table>'+
    				'<thead>'+
    					'<tr>'+
    						'<th>一</th>'+
    						'<th>二</th>'+
    						'<th>三</th>'+
    						'<th>四</th>'+
    						'<th>五</th>'+
    						'<th>六</th>'+
    						'<th>日</th>'+
    					'</tr>'+
    				'</thead>'+
    				'<tbody>';
                for(var i = 0,len = result.days.length;i<len;i++) {
                    var date = result.days[i];
                    if(i % 7 == 0) {
                        html += '<tr>';
                    };
                    if(date.isCurrMonth) {
                        html += '<td data-date="'+date.date+'" class="currDay">'+date.showDate+'</td>';
                    } else {
                        html += '<td data-date="'+date.date+'">'+date.showDate+'</td>';
                    };
                    if(i % 7 == 6) {
                        html += '</tr>';
                    };
                };
    			html +=	'</tbody>'+
    			'</table>'+
            '</div>';
        return html;
    };

    datepicker.init = function(elClass) {
        datepicker.render();
        var $input = document.querySelector(elClass);
        var $other = document.querySelector('html');
        $wraper.addEventListener('click',function(event) {
            event.stopPropagation();
            var $target = event.target;

            if($target.classList.contains('ui-prev')) {
                //上一个月
                datepicker.render('prev');
            } else if($target.classList.contains('ui-next')) {
                //下一个月
                datepicker.render('next');
            } else if($target.tagName.toLowerCase() == 'td') {
                console.log($target.dataset.date);
            };
        });
        $other.addEventListener('click',function() {
            $wraper.classList.remove('ui-datepicker-wrapper-show');
        });
        $input.addEventListener('click',function(event) {
            event.stopPropagation();
            $wraper.classList.add('ui-datepicker-wrapper-show');
            var left = $input.offsetLeft;
            var top = $input.offsetTop;
            var height = $input.offsetHeight;
            $wraper.style.top = top + height + 2 + 'px';
            $wraper.style.left = left + 'px';
        });
    };

    //渲染
    datepicker.render = function(direction) {
        var year,month;
        if(result) {
            year = result.year;
            month = result.month;
        };
        if(direction == 'prev') {month--;};
        if(direction == 'next') {month++;};
        var html = datepicker.buildUi(year,month);

        $wraper = document.querySelector('.ui-datepicker-wrapper');
        if(!$wraper) {
            $wraper = document.createElement('div');
            $wraper.className = 'ui-datepicker-wrapper';
            document.body.appendChild($wraper);
        };
        $wraper.innerHTML = html;
    };
})();
