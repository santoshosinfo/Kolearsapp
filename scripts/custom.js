/*Touch Device Detection*/	

  function isTouchDevice(){
	  try{
		  document.createEvent("TouchEvent");
		  //return true;
	  }catch(e){
		  //return false;
	  }
  }
  function touchScroll(id){
	  if(isTouchDevice()){ //if touch events exist...
		  var el=document.getElementById(id);
		  var scrollStartPos=0;

		  document.getElementById(id).addEventListener("touchstart", function(event) {
			  scrollStartPos=this.scrollTop+event.touches[0].pageY;
			  event.preventDefault();
		  },false);

		  document.getElementById(id).addEventListener("touchmove", function(event) {
			  this.scrollTop=scrollStartPos-event.touches[0].pageY;
			  event.preventDefault();
		  },false);
	  }
  }
function str_repeat(input, multiplier) {
  //  discuss at: http://phpjs.org/functions/str_repeat/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Ian Carter (http://euona.com/)
  //   example 1: str_repeat('-=', 10);
  //   returns 1: '-=-=-=-=-=-=-=-=-=-='

  var y = '';
  while (true) {
    if (multiplier & 1) {
      y += input;
    }
    multiplier >>= 1;
    if (multiplier) {
      input += input;
    } else {
      break;
    }
  }
  return y;
}


$(document).ready(function(){
 var serviceURL = "http://k2s2c.in/kolears/services/";
//var serviceURL = "http://santosh.phpzeal.com/kolears/";
//var serviceURL = "http://localhost/android/kolears/";

var category; 
var sub_cat;

//alert(serviceURL);
//alert('hi');
$('#catlist').on('click','.maincat',function()
{
	//alert('hi');
	$(this).next('.sub-menu-one').toggle();
});
$('#catlist1').on('click','.maincat',function()
{
	//alert('hi');
	$(this).next('.sub-menu-one').toggle();
});

$(".sub-menu-one").each( function() {
	var innerHtml = $( this ).html();
	if( innerHtml != '' )
	{
	$(this).prev('a').attr('href','#');
	}
	else
	{
	$(this).prev('a').find('strong').remove();
	}
} );


getcategorylist();

function removehref()
{
	$("#catlist .sub-menu-one").each( function() {
	var innerHtml = $( this ).html();
	if( innerHtml != '' )
	{
	$(this).prev('a').attr('href','#');
	
	}
	else
	{
	$(this).prev('a').find('strong').remove();
	}
	
} );
}
function getcategorylist()
{
var cat_html;
var sub_cat_html;
var catg;
var catname;
var cat_order = [];
var counter;
var l_prefix='';

//var cat_url ='http://localhost/android/Kolearsapp/details.php?id=';
var cat_url='http://k2s2c.in/kolears/services/app/details.php?id=';
$.getJSON(serviceURL + 'category.php', function(data) {
category = data.items;
//console.log(category);
//var main_html=;
var div_start = false;
//var divmain_html='';
//alert(category.length);
var main_html ='';
for (var i = 0; i < category.length; i++)
{
	 
	 var catg = category[i];
	
	 var mfinal = catg.cat_name;
	//console.log(mfinal);
	
	
	
	 if( catg.parent_cat_id==0 && div_start == false )
	 {
	 main_html += '<a class="menu-item menu-icon img maincat menucheck " id="sub-menu-one" href="'+cat_url+catg.cat_id+'">'+mfinal+'<strong></strong></a><div class="sub-menu-one" style="display:none;">';
	 div_start = true;
	 
		
	 }
	 else{
	 
	  main_html += '<a class="sub-menu-item"  href="'+cat_url+catg.cat_id+'-'+catg.parent_cat_id+'">'+mfinal+'</a>';
	 }
	//console.log(category[i+1].parent_cat_id);
	 if( i+1 < category.length && category[i+1].parent_cat_id==0 )
		{
			 main_html += '</div>';
			div_start = false;
		}
		
		//console.log(main_html);
	 
	 
}
//console.log('final');
//console.log(main_html);
$('#catlist').html(main_html);
removehref();

	


});
	
}
/*function getcategorylist() {
	
var cat_html;
var sub_cat_html;
var catg;
var catname;
var cat_order = [];
var counter;

var cat_url ='http://localhost/android/Kolearsapp/details.php?id=';
//var cat_url='http://k2s2c.in/kolears/services/app/details.php?id=';
	$.getJSON(serviceURL + 'category.php', function(data) {
	//alert(data);
	category = data.items;
	//alert(category);
	//console.log(category);
	
	
	//console.log('category:' + category);
	
	for (var i = 0; i < category.length; i++) {
    (function(i) { // protects i in an immediately called
	
	
	
		//console.log('category[i]:' + category[i].toSource()  );
		var catg = category[i];

		
		
		$.getJSON(serviceURL + 'subcategory.php?id='+catg.cat_id, function(data1){
			
			var cat_html = '';
	
		//console.log('response category[i]:' + category[i].toSource()  ); 
		
			//console.log('catg:' + catg.cat_name);
			var catname = catg.cat_name;
			
			var sub_cat = data1.items;
			//console.log('subcat' + sub_cat);
			//console.log(sub_cat);
			//console.log('subcat lengh:' + sub_cat.length);
			
			var sub_cat_html='';
			
			if(sub_cat.length >1)
			{
			
			cat_html = '<a class="menu-item menu-icon img maincat" id="sub-menu-one" href="#">'+catname+'<strong></strong></a>';
			
			//cat_html += '<a class="menu-item menu-icon img" id="sub-menu-one" href="#">'+catg.cat_name+'<strong></strong></a>';
			sub_cat_html = '<div class="sub-menu-one">';
			$.each(sub_cat, function(index, subcatg) {
			var sub_cat_id=subcatg.sub_cat_id;
			if(sub_cat_id==null)
			{
				sub_cat_id='abcd'+subcatg.id;
			}
				
				sub_cat_html += '<a class="sub-menu-item"  href="'+cat_url+subcatg.cat_id+'-'+sub_cat_id+'">'+subcatg.cat_name+'</a>';
				
			
			});
			sub_cat_html += '</div>';	
			//console.log('subcat:' + sub_cat_html);
			}
			else
			{
			cat_html = '<a class="menu-item menu-icon img maincat" id="sub-menu-one" href="'+cat_url+catg.cat_id+'">'+catname+'</a>';
			}
			
			
			cat_html += sub_cat_html;
			//$('#catlist').append( cat_html );	
			
			cat_order[ catg.cat_id ] = cat_html;
			
			
			//cat_order.push( cat_html );
			counter = i;
			//console.log( 'cat_order:' );
			//console.log( cat_order );
			
			//console.log( 'counter:' );
			//console.log( counter );
			//console.log( category.length );
			
			if( counter == ( category.length - 1 ) )
			{
				//console.log(  'final array:' );
		
				$.each(cat_order, function( index, value ) {
					
				 // console.log( index + '-' + value );
				  if( value != '' )
					  $('#catlist').append( value );	
				  
				});	
			}
			
		});
		
	
	})(i);
}

	
		
		
		
		
		
		
	});

}*/
/*function getprodcutdetails()
{
	var imgURL = "http://localhost/tgc1/uploads/";
	$.getJSON(serviceURL + 'subcategoryproduct.php', function(data) {
	subproduct = data.items;
	//alert(subproduct);
	var subp = '<h3 class="left-text">';
	$.each(subproduct, function(index, subp1) {
	
	subp +='<a href="#">'+ subp1.product_name+'</a>'+',';

	
	$.getJSON(serviceURL + 'subcategoryproductimg.php?id='+subp1.p_id, function(datap) {
	var gp ='<h4 id="cnc_jodi">'+subp1.product_name+'</h4>';
	var gallerimage = datap.items;
	//console.log(gallerimage);
	$.each(gallerimage,function(index,gallimg){
	gp += '<li><a href="'+imgURL+'eventfile-'+gallimg.p_id+'-'+gallimg.p_img_id+'-'+gallimg.pimg_name+'" title="'+subp1.product_name+'">';
	gp +='<img src="'+imgURL+'eventfile-'+gallimg.p_id+'-'+gallimg.p_img_id+'-'+gallimg.pimg_name+'" title="'+subp1.product_name+'" alt="'+subp1.product_name+'" /></a></li>';

	});
	gp += '<div class="clear"></div>';
	//console.log(gp);
	$('#gallery').append(gp);
	});
	
	});
	subp += '</h3>';
	//console.log(subp);
	$('#product_title').append(subp);
	});
	
	
	
}*/
/*function getonecatdetails()
{
	$.getJSON(serviceURL + 'onecategory.php',function(data) {
	onecategory = data.items;
	//alert(onecategory);
	$.each(onecategory, function(index, catg1) {
	$("#cat_name").append('	<h1 class="page-title-small" >'+catg1.cat_name+'</h1>');
	
	
	
	});
	
	});
	
	
}*/
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}




(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")
	
	  var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
	  var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
	  var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");
	  var isiAndroid = navigator.userAgent.toLowerCase().indexOf("android");
	
	  if(isiPhone > -1)
	  {
		  $('.ipod-detected').hide();
		  $('.ipad-detected').hide();
		  $('.iphone-detected').show();
		  $('.android-detected').hide();
	  }
	  if(isiPad > -1)
	  {
		  $('.ipod-detected').hide();
		  $('.ipad-detected').show();
		  $('.iphone-detected').hide();
		  $('.android-detected').hide();
	  }
	  if(isiPod > -1)
	  {
		  $('.ipod-detected').show();
		  $('.ipad-detected').hide();
		  $('.iphone-detected').hide();
		  $('.android-detected').hide();
	  }   
	  
	  if(isiAndroid > -1)
	  {
		  $('.ipod-detected').hide();
		  $('.ipad-detected').hide();
		  $('.iphone-detected').hide();
		  $('.android-detected').show();
	  }  
	

	  $(".header").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
		  $('.content').css('position', 'absolute');
		  $('.content').animate({
				marginLeft: "0px",
		  }, 150 );
		  $('.deploy-nav').show();
		  $('.hide-nav').hide();
		},
		  swipeRight:function(event, direction, distance, duration, fingerCount) {
		  $('.content').css('position', 'fixed');
		  $('.content').animate({
				marginLeft: "180px",
		  }, 150 );	
		  $('.deploy-nav').hide();
		  $('.hide-nav').show();
		},
		threshold:10
	  });
	  $(".header").click( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
		  $('.content').css('position', 'absolute');
		  $('.content').animate({
				marginLeft: "0px",
		  }, 150 );
		  $('.deploy-nav').show();
		  $('.hide-nav').hide();
		},
		  swipeRight:function(event, direction, distance, duration, fingerCount) {
		  $('.content').css('position', 'fixed');
		  $('.content').animate({
				marginLeft: "180px",
		  }, 150 );	
		  $('.deploy-nav').hide();
		  $('.hide-nav').show();
		},
		threshold:10
	  });
	  
	  $(".sidebar-header").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
		  $('.content').css('position', 'absolute')  
		  $('.content').animate({
				marginLeft: "0px",
		  }, 150 );	
		  $('.deploy-nav').show();
		  $('.hide-nav').hide();
		},
		  swipeRight:function(event, direction, distance, duration, fingerCount) {
		  $('.content').css('position', 'fixed')
		  $('.content').animate({
				marginLeft: "180px",
		  }, 150 );	
		  $('.deploy-nav').hide();
		  $('.hide-nav').show();
		},
		threshold:10
	  });
	  
	  $(".sidebar-header").click( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
		  $('.content').css('position', 'absolute')  
		  $('.content').animate({
				marginLeft: "0px",
		  }, 150 );	
		  $('.deploy-nav').show();
		  $('.hide-nav').hide();
		},
		  swipeRight:function(event, direction, distance, duration, fingerCount) {
		  $('.content').css('position', 'fixed')
		  $('.content').animate({
				marginLeft: "180px",
		  }, 150 );	
		  $('.deploy-nav').hide();
		  $('.hide-nav').show();
		},
		threshold:10
	  });
	  
	  $('.content').click(function(){
		  $('.content').css('position', 'absolute')
		  $('.content').animate({
				marginLeft: "0px",
		  }, 150 );
		  //$('.sidebar').hide(800);
		  $('.deploy-nav').show();
		  $('.hide-nav').hide();	
		  return false;	
	  });
  
	  $('.deploy-nav').click(function(){
		  $('.content').css('position', 'fixed')
		  $('.content').animate({
				marginLeft: "180px",
		  }, 150 );
		  //$('.sidebar').show();
		  $('.deploy-nav').hide();
		  $('.hide-nav').show();
		  return false;
	  });
  
	  $('.hide-nav').click(function(){
		  $('.content').css('position', 'fixed')
		  $('.content').animate({
				marginLeft: "0px",
		  }, 150 );
		  //$('.sidebar').show();
		  $('.deploy-nav').show();
		  $('.hide-nav').hide();
		  return false;
	  });	

	
	/*$('#sub-menu-one').click(function(){$('.sub-menu-one').toggle(200); return false;});*/
	$('#sub-menu-two').click(function(){$('.sub-menu-two').toggle(200); return false;});
	$('#sub-menu-three').click(function(){$('.sub-menu-three').toggle(200); return false;});
	$('#sub-menu-four').click(function(){$('.sub-menu-four').toggle(200); return false;});
	$('#sub-menu-five').click(function(){$('.sub-menu-five').toggle(200);});
	$('#sub-menu-six').click(function(){$('.sub-menu-six').toggle(200); return false;});
	$('#sub-menu-seven').click(function(){$('.sub-menu-seven').toggle(200); return false;});
	$('#sub-menu-eight').click(function(){$('.sub-menu-eight').toggle(200); return false;});
	$('#sub-menu-nine').click(function(){$('.sub-menu-nine').toggle(200); return false;});
	$('#sub-menu-ten').click(function(){$('.sub-menu-ten').toggle(200); return false;});
	
	$('.image-slider').roundabout({
		minScale: 0.2,
		autoplay:true,
		autoplayDuration:2000,
		minOpacity:0,
		responsive:true,
		duration: 500
	});


	$('.header-notification').delay(5000).animate({
		  height: "0px",
		  paddingBottom:"0px",
		  marginBottom:"5px",
		  paddingTop:"0px",
	}, 500 ).hide(500);	
	
	
	
	$('.checkbox').click(function(){
		$(this).toggleClass('selected-checkbox');
		return false;
	});
	
	$('.checkbox2').click(function(){
		$(this).toggleClass('selected-checkbox2');
		return false;
	});
	
	$('.radiobox').click(function(){
		$(this).toggleClass('selected-radiobox');
		return false;
	});
	
	$('.radiobox2').click(function(){
		$(this).toggleClass('selected-radiobox2');
		return false;
	});
	


	$(".notification-quit-red").click(function(){
	  $(".notification-box-red").fadeOut(150);
	  return false;
	});
	
	$(".notification-quit-green").click(function(){
	  $(".notification-box-green").fadeOut(150);
	  return false;
	});
	
	$(".notification-quit-yellow").click(function(){
	  $(".notification-box-yellow").fadeOut(150);
	  return false;
	});
	
	$(".notification-quit-blue").click(function(){
	  $(".notification-box-blue").fadeOut(150);
	  return false;
	});
	
	
	$('.toggle-deploy').click(function(){
		$('.toggle-content').show(200);
		$('.toggle-close').show();
		$('.toggle-deploy').hide();
	});
	
	
	$('.toggle-close').click(function(){
		$('.toggle-content').hide(200);
		$('.toggle-close').hide();
		$('.toggle-deploy').show();
	});	
	
	var myPhotoSwipe = $("#gallery a, #gallery2 a").photoSwipe({ enableMouseWheel: false , enableKeyboard: false });

});














