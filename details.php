<?php
#include 'kolears/config.php';
#$conn = mysqli_connect("localhost",'root','','tgc');
$conn = mysqli_connect("localhost",'k2s2c_kolears','H@*&2871','k2s2c_kolears');

$id=$_GET["id"];
if(strstr($id,'-'))
{
	$id_exp =explode('-',$id);
	$cat_id=$id_exp[1];
	
}
else{
$cat_id=$_GET["id"];
$id='';
}


?>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
<link rel="apple-touch-icon" sizes="114x114" href="images/splash/splash-icon.png"> 
<link rel="apple-touch-startup-images" href="images/splash/splash-screen.png" media="screen and (max-device-width: 320px)" /> 
<link rel="apple-touch-startup-images" href="images/splash/splash-screen@2x.png" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)" /> 
<meta name="apple-mobile-web-app-capable" content="yes"/>
<title>Kolears</title>

<link href="style/style.css" rel="stylesheet" type="text/css">
<link href="style/buttons.css" rel="stylesheet" type="text/css">
<link href="style/photoswipe.css" rel="stylesheet" type="text/css">
<link href="style/retina.css" media="only screen and (-webkit-min-device-pixel-ratio: 2)" rel="stylesheet" />

<script src="scripts/klass.min.js"></script>
<script src="scripts/jquery-1.11.3.min.js"></script>
<!--<script src="scripts/jquery.js"></script>-->
<script src="scripts/touchSwipe.js"></script>
<script src="scripts/photoswipe.js"></script>
<script src="scripts/roundabout.js"></script>
<script src="scripts/contact.js"></script>
<script src="scripts/retina.js"></script>
<script src="scripts/custom.js"></script>


</head>

<body onload="touchScroll('scrollMe')">

<div class="content">
	<div class="header">
    	<a href="#" class="deploy-nav header-icon"></a>
        <a href="#" class="hide-nav header-icon-active"></a>
		<?php $q1 = "select cat_id,parent_cat_id,cat_name from  category where cat_id='$cat_id'";
	$result = mysqli_query($conn,$q1);
	
	while($row = mysqli_fetch_array($result))
	{
		$cat_name =$row['cat_name'];
		
	}
		
	?>
    	<h1 class="page-title-small"><?php echo $cat_name; ?></h1>
    </div>
    
 
	<p class="center-text"><img src="images/logo.png" alt="img" width="217" class="replace-2x logo"></p>

    <div class="decoration"></div>
    
    <div class="container">
	<?php #$q1 = "select cat_id,parent_cat_id,cat_name from  category where cat_id='$cat_id'";
	$q2 = "select p_id, product_name,cat_id,sub_cat_id from product_master where cat_id='$cat_id' and sub_cat_id='$id' order by p_id";
	#echo $q2;
	#exit;
	$result1 = mysqli_query($conn,$q2);
	
	$title= '<h3 class="left-text">'.$cat_name.':&nbsp';
	$linkimg = '';
	#$path='http://localhost/tgc1/uploads/';
	$path='http://k2s2c.in/kolears/uploads/';
	
	
	while($row1 = mysqli_fetch_array($result1))
	{
		$prod_name =$row1['product_name'];
		$p_id= $row1['p_id'];
		
		#$title1="<a href=\"#$prod_name\">$prod_name</a>,";
		#$title1 ='subst'
		$title.= "<a href=\"#$prod_name\">$prod_name</a>,";
	$q2="select pimg_name,img_desc,p_img_id, p_id from product_imagemaster where p_id='$p_id' order by p_id";	
		$resultimg = mysqli_query($conn,$q2);
		$linkimg.='<h4 id="'.$prod_name.'">'.$prod_name.'</h4>';
		while($rowimg = mysqli_fetch_array($resultimg))
		{	
			$img_name = $rowimg['pimg_name'];
			$img_desc = $rowimg['img_desc'];
			$pro_id =$rowimg['p_id'];
			$p_img_id= $rowimg['p_img_id'];
			$final_img = 'eventfile-'.$pro_id.'-'.$p_img_id.'-'.$img_name;
		$linkimg.= '<li><a href="'.$path.$final_img.'" title="'.$img_desc.'"> 
				<img src="'.$path.$final_img.'" title="'.$img_desc.'" alt="'.$img_desc.'" /> 
			</a></li>';
		
			
			
		}
		$linkimg.='<div class="clear"></div>';
		
		
	}
	$title .='</h3>';
	
	echo $title;	
	?>
    
    </div>
    
    
    
	<div class="container">
        <ul id="gallery" class="gallery">
		<?php echo $linkimg;?>
			<!--<h4 id="cnc_jodi">Cnc Jodi</h4>
            <li><a href="images/cnc_jodi/1/cnc_jodi500.jpg" title="Cnc Jodi"> 
				<img src="images/cnc_jodi/1/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li> 
			<li><a href="images/cnc_jodi/2/cnc_jodi500.jpg" title="Cnc Jodi" > 
				<img src="images/cnc_jodi/2/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a> </li>
			<li><a href="images/cnc_jodi/3/cnc_jodi500.jpg" title="Cnc Jodi" > 
				<img src="images/cnc_jodi/3/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			<li><a href="images/cnc_jodi/4/cnc_jodi500.jpg" title="Cnc Jodi" > 
				<img src="images/cnc_jodi/4/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			<li><a href="images/cnc_jodi/5/cnc_jodi500.jpg" title="Cnc Jodi" > 
				<img src="images/cnc_jodi/5/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li> 
			<li><a href="images/cnc_jodi/6/cnc_jodi500.jpg" title="Cnc Jodi"> 
				<img src="images/cnc_jodi/6/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			<li><a href="images/cnc_jodi/7/cnc_jodi500.jpg" title="Cnc Jodi"> 
				<img src="images/cnc_jodi/7/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			<li><a href="images/cnc_jodi/8/cnc_jodi500.jpg" title="Cnc Jodi"> 
				<img src="images/cnc_jodi/8/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			<li><a href="images/cnc_jodi/9/cnc_jodi500.jpg" title="Cnc Jodi"> 
				<img src="images/cnc_jodi/9/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			<li><a href="images/cnc_jodi/10/cnc_jodi500.jpg" title="Cnc Jodi"> 
				<img src="images/cnc_jodi/10/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			<li><a href="images/cnc_jodi/11/cnc_jodi500.jpg" title="Cnc Jodi"> 
				<img src="images/cnc_jodi/11/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			<li><a href="images/cnc_jodi/12/cnc_jodi500.jpg" title="Cnc Jodi"> 
				<img src="images/cnc_jodi/12/cnc_jodi500.jpg" title="Cnc Jodi" alt="Cnc Jodi" /> 
			</a></li>
			
			<h4 id="cnc_jota">Cnc Jota</h4>
			<li><a href="images/cnc_jota/1/cnc_jota500.jpg" title="Cnc Jota"> 
				<img src="images/cnc_jota/1/cnc_jota500.jpg" title="Cnc Jota" alt="Cnc Jota" /> 
			</a></li> 
			<li><a href="images/cnc_jota/2/cnc_jota500.jpg" title="Cnc Jota"> 
				<img src="images/cnc_jota/2/cnc_jota500.jpg" title="Cnc Jota" alt="Cnc Jota" /> 
			</a></li> 
			<li><a href="images/cnc_jota/3/cnc_jota500.jpg" title="Cnc Jota"> 
				<img src="images/cnc_jota/3/cnc_jota500.jpg" title="Cnc Jota" alt="Cnc Jota" /> 
			</a></li>
			<li><a href="images/cnc_jota/4/cnc_jota500.jpg" title="Cnc Jota"> 
				<img src="images/cnc_jota/4/cnc_jota500.jpg" title="Cnc Jota" alt="Cnc Jota" /> 
			</a></li>
			<li><a href="images/cnc_jota/5/cnc_jota500.jpg" title="Cnc Jota"> 
				<img src="images/cnc_jota/5/cnc_jota500.jpg" title="Cnc Jota" alt="Cnc Jota" /> 
			</a></li>			
			<div class="clear"></div>
			<h4 id="cnc_kada">Cnc Kada</h4>
			<li><a href="images/cnc_kada/1/cnc_kada500.jpg" title="Cnc Kada"> 
                 <img src="images/cnc_kada/1/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li> 
			<li><a href="images/cnc_kada/2/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/2/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li> 
			<li><a href="images/cnc_kada/3/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/3/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li>
			<li><a href="images/cnc_kada/4/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/4/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li>
			<li><a href="images/cnc_kada/5/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/5/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li> 
			<li><a href="images/cnc_kada/6/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/6/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li>
			<li><a href="images/cnc_kada/7/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/7/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li>
			<li><a href="images/cnc_kada/8/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/8/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li>
			<li><a href="images/cnc_kada/9/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/9/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li>
			<li><a href="images/cnc_kada/10/cnc_kada500.jpg" title="Cnc Kada">
				<img src="images/cnc_kada/10/cnc_kada500.jpg" title="Cnc Kada" alt="Cnc Kada" /> 
			</a></li>-->			
         </ul>
	</div>    
     
    <div class="decoration"></div>
    <p class="center-text copyright">Copyright 2015. All rights reserved</p>
   
</div>
<div class="sidebar">
	<div class="sidebar-hide-scroll" id="scrollMe">
	<div class="sidebar-header">
		<h1 class="sidebar-title"><a href="index.html">K'olears</a></h1>
    </div>
    <p class="sidebar-divider no-top">
    	
    </p>
	<div id="catlist">
		
	
	</div>
   
    	
	
    </div>
</div>



</body>
</html>

