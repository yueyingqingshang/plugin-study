(function() {
    var datepicker = window.datepicker;

    datepicker.buildUi = function(year,month) {
        var result = datepicker.getMonthData(year,month);
        console.log(result);
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
                        html += '<td><span class="currDay">'+date.showDate+'</span></td>';
                    } else {
                        html += '<td><span>'+date.showDate+'</span></td>';
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
        var html = datepicker.buildUi();
        //<div class="ui-datepicker-wrapper">
        var $wraper = document.createElement('div');
        $wraper.className = 'ui-datepicker-wrapper';
        $wraper.innerHTML = html;
        document.body.appendChild($wraper);

        var $input = document.querySelector(elClass);
        var $other = document.querySelector('html');
        $wraper.addEventListener('click',function(event) {
            event.stopPropagation();
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
})();
