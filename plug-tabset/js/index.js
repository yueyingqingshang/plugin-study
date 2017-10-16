;(function($) {
	var Tab = function(tab,setting) {
		var self = this;
		//保存单个节点
		this.tab = tab;
		//保存单个节点自定义配置
		this.setting = setting;

		//默认配置
		this.config = {
			"triggerType": 'click',
			"effect": "fade",
			"invoke": 13,
			"auto": 5000
		};

		//扩展默认配置
		if(!!setting) {
			$.extend(this.config,setting);
		}
		console.log(this.config);
	};
	Tab.prototype = {

		/*//获取自定义配置
		getConfig: function() {
			var config = this.setting;
			if(!!config) {
				return config;
			} else {
				return null;
			};
		}*/
	};
	window.Tab = Tab;
})(jQuery);