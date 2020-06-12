//接口地址
var IPurl = "http://182.92.109.137:8087/";
var imgurl = "http://182.92.109.137:8087/";

function getUrlParam() { //获取参数
    var url = decodeURIComponent(location.search);
    var theParam = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theParam;
}
function getNowCanshu() {
  var aa = window.location.href; //返回当前页面的url
  var urlinfo = aa.replace("#", " ");
  var canshu = (function() {
    var ind = urlinfo.indexOf("?"); //返回某个指定的字符串值在字符串中首次出现的位置
    var cs = urlinfo.substr(ind + 1);
    var tempobj = new Object();
    var csarr = cs.split("&");
    jQuery.each(csarr, function(i, v) {
      var temparr = v.split("=");
      var objname = temparr[0];
      tempobj[objname] = temparr[1];
    });
    return tempobj;
  })();
  // console.log(canshu);
  return canshu;
}
function closeBMark() { //关闭遮罩层
    var _dom = document.querySelector('.bMark');
    if (_dom) {
        _dom.style.display = 'none';
    };
};

function closeBMarkImg() {
    $(".markImg").hide();
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}




$(".sousuo span").bind("keyup", function(event) {
  console.log(11111)
		var obj=$(this)
  if (event.keyCode == "13") {
    var kw = obj.val()
    if (kw.length > 0){
      //回车执行查询
      $(".sousuo span").click();
    }
    
  }
});


function getpri(price) {
  var pri = price * 0.01;
  pri = pri.toFixed(2);
  return pri;
}
function telReg(tel) {
  if (tel) {
    var tel0 = "" + tel;
    var reg = /(\d{3})\d{4}(\d{4})/;
    var tel1 = tel0.replace(reg, "$1****$2");
    // console.log(tel1);
    return tel1;
  }
}
function namereg(name) {
  // var reg=/(\d{3})\d{4}(\d{4})/;
  var name1 = name.split("");
  if (name1.length >= 3) {
    // console.log(name1);
    var sxs = "";
    for (var i = 0; i < name1.length - 3; i++) {
      sxs = sxs + "*";
    }
    var newname = name1[0] + sxs + name1[name1.length - 1];
    return newname;
  } else {
    return name;
  }
}
//获取img
function getgimg(pic) {
  if (!pic) {
    return;
  }
  var arr = [];
  arr = pic.split(",");
  var arr1 = [];
  arr1 = arr[0].split("|");

  return imgurl + arr1[1];
  // vm.tclist[index].picbox
}
function getgimg1(pic) {
  if (!pic) {
    return;
  }
  var arr = [];
  // console.log(pic)
  arr = pic.split("^");
  var arr1 = [];
  return imgurl + arr[0];
}
function getTime(time) {
  if (!time) {
    return;
  }
  var arr = [];
  // console.log(pic)
  arr = time.split(" ");
  var arr1 = arr[0].split("-");
	if(arr1.length==3){
		return arr1[0] + "年" + arr1[1] + "月" + arr1[2] + "日";
	}else{
		return time
	}
		
  
}

function jump(url) {
  window.location.href = url;
}


function _ajax(ajaxUrl,datas,success,error) {
	if(!error){
		error=function (err){
			layer.msg('获取数据失败')
			console.log(err)
		}
	}
	$.ajax({
		type: "GET",
		url: ajaxUrl,
		data: datas,
		success: success,
		error: error
	})
}

function submitFn(url) {
    //判断浏览器
    // var url = 'dtxuexi://appclient/page/study_feeds' //urlscheme码;
		url='etown://http://www.wanbonet.com/zjp/shangyicheng/'+url
		console.log(url)

    var appurl = 'http://appsycimg.ebda.cn:9002/share/downloadShare.html?from=singlemessage&isappinstalled=0' //APP下载地址;
    var u = navigator.userAgent;
    // alert(u)
    // if (/MicroMessenger/gi.test(u)) {
    //     // 引导用户在浏览器中打开
    //     $(".popdown").show();
    //     return;
    // }
    var d = new Date();
    var t0 = d.getTime();
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('Windows') > -1) {
        //Android 向安卓同事索要链接
        if (openApp(url)) {
            openApp(url);
        } else {
            //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
            var delay = setInterval(function() {
                var d = new Date();
                var t1 = d.getTime();
                if (t1 - t0 < 3000 && t1 - t0 > 2000) {
                    //alert('检测到未安装，请下载APP');
                    window.location.href = appurl;
                }
                if (t1 - t0 >= 3000) {
                    clearInterval(delay);
                }
            }, 1000);
        }
    } else if (u.indexOf('iPhone') > -1) {
        //IOS  向IOS同事索要
        if (openApp(url)) {
            openApp(url);
        } else {
            var delay = setInterval(function() {
                var d = new Date();
                var t1 = d.getTime();
                if (t1 - t0 < 3000 && t1 - t0 > 2000) {
                    //alert('检测到未安装，请下载APP');
                    window.location.href = appurl;
                }
                if (t1 - t0 >= 3000) {
                    clearInterval(delay);
                }
            }, 1000);
        }
    }
};

function openApp(src) {
    // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
    // 否则打开a标签的href链接
    window.location.href = src;
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Safari") > -1) {
        window.location.href = src;
    } else {
        var ifr = document.createElement('iframe');
        ifr.src = src;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        window.setTimeout(function() {
            document.body.removeChild(ifr);
        }, 2000);
    }

}



var isapp

$(function () {
	if(getNowCanshu().type){
		if(getNowCanshu().type==1){
			$('.wrap').addClass('wrap1')
		}
	}
	if(getNowCanshu().isapp){
		if(getNowCanshu().isapp==true){
			isapp=true
			setCookie('isapp','true',1)
		}
	}
})



//get数组

function getarr(str,jg){
	// console.log(str)
	
	if(!str){
		var newarr=[]
		return newarr
	}
	str=str.split(jg)
	console.log(str)
	if(str[str.length-1]==''){
		str.pop()
	}
	return str
}
function getcontent(datas,type){
	// var textinr=''
	for(var i=0;i<datas.length;i++){
		if(datas[i].type==type){
			if(datas[i].type=='image'){
				console.log(datas[i].content.split(','))
				return datas[i].content.split(',')
			}else if(datas[i].type=='sp'){
				// return datas[i].content.split(',')
				return datas[i].content
			}else{
				return datas[i].content
			}
		}
	}
}
function getpxinr(arr){
	var textarr=[];
	var selectarr=[];
	var imgarr=[];
	var sparr=[];
	for(var i=0;i<arr.length;i++){
			if(arr[i].type=='image'){
				// console.log(datas[i].content.split(','))
				imgarr.push(arr[i])
				
			}else if(arr[i].type=='sp'){
				sparr.push(arr[i])
			}else if(arr[i].type=='text'){
				textarr.push(arr[i])
			}else if(arr[i].type=='select'){
				selectarr.push(arr[i])
			}else{
				// return datas[i].content
			}
		
	}
	textarr=textarr.concat(selectarr)
	textarr=textarr.concat(imgarr)
	textarr=textarr.concat(sparr)
	return textarr
}