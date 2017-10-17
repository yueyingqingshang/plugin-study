(function() {
    var datepicker = window.datepicker;

    datepicker.buildUi = function(year,month) {
        var monthData = datepicker.getMonthData(year,month);
        console.log(monthData);
        var html = '<div class="ui-datepicker-header">'+
    			'<a href="javascript:;" class="ui-datepicker-btn ui-prev">&lt;</a>'+
    			'<span class="ui-datepicker-curr-month">2017-10</span>'+
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
                for(var i = 0,len = monthData.length;i<len;i++) {
                    var date = monthData[i];
                    if(i % 7 == 0) {
                        html += '<tr>';
                    };
                    html += '<td>'+date.showDate+'</td>';
                    if(i % 7 == 6) {
                        html += '</tr>';
                    };
                };
    			html +=	'</tbody>'+
    			'</table>'+
            '</div>';
        return html;
    };

    datepicker.init = function($dom) {
        var html = datepicker.buildUi();
        $dom.innerHTML = html;
    };
})();
