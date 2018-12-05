$('.menu a').click(function(){
    target = $(this).attr('goto');
    switchTo(target);
    $('.menu li a').each(function(){
        $(this).removeClass('active');
    });
    $(this).addClass('active');
});

function switchTo(target){
    $('.right section').each(function () {
        $(this).removeClass('active');
    });
    $(target).addClass('active');
}

function getAchives(){
    t = ``;
    $.ajax({
        type:"GET",
        url:"https://www.jecho.cn/wp-json/wp/v2/posts?per_page=8&page=1",
        dataType:"json",
        success:function(json){
            for(var i = 0;i < json.length;i++){
                title = json[i].title.rendered;
                link = json[i].link;
                time = new Date(json[i].date).Format("yyyy-MM-dd");
                t += `<li><a href="${link}" target="_blank">${title} <span class="meta">/ ${time}</span></a></li>`;
                $('.archive-list').html(t);
            }
        }
    })
}

function gethitokoto(){
    $.ajax({
        type:"GET",
        url:"https://v1.hitokoto.cn/?c=g",
        dataType:"json",
        success:function(result){
            write(result.hitokoto+' 出自 '+result.from);
        },
        error:function(){
            $('#hitokoto').html("Error: Failed to get hitokoto.");
        }
    });
}

function write(text){
    if (text.length < 25) {
        $('#hitokoto').html(text);
    } else {
        gethitokoto();
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt){ //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(document).ready(function(){
    getAchives();
    gethitokoto();
    setTimeout(function(){$(".loading").hide();},1500);
});
//进度条函数
(function($){
	'use strict';
	$.fn.LineProgressbar = function(options){
		var options = $.extend({
			percentage : null,
			ShowProgressCount: true,
			duration: 1000,
			fillBackgroundColor: '#3498db',
			backgroundColor: '#EEEEEE',
			radius: '0px',
			height: '10px',
			width: '100%'
		},options);
		return this.each(function(index, el) {
			$(el).html('<div class="progressbar"><div class="proggress"></div><div class="percentCount"></div></div>');
			var progressFill = $(el).find('.proggress');
			var progressBar= $(el).find('.progressbar');
			progressFill.css({
				backgroundColor : options.fillBackgroundColor,
				height : options.height,
				borderRadius: options.radius
			});
			progressBar.css({
				width : options.width,
				backgroundColor : options.backgroundColor,
				borderRadius: options.radius
			});
			progressFill.animate(
				{
					width: options.percentage + "%"
				},
				{	
					step: function(x) {
						if(options.ShowProgressCount){
							$(el).find(".percentCount").text(Math.round(x) + "%");
						}
					},
					duration: options.duration
				}
			);
		});
	}
})(jQuery);
//设置进度条
$(function(){ 
    $('#all').LineProgressbar({ 
        percentage: 60
    }); 
}) 