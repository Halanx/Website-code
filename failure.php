<?php
$status=$_POST["status"];
$firstname=$_POST["firstname"];
$amount=$_POST["amount"];
$txnid=$_POST["txnid"];
 
$posted_hash=$_POST["hash"];
$key=$_POST["key"];
$productinfo=$_POST["productinfo"];
$email=$_POST["email"];
$salt="jfrDJ9yt";
 
If (isset($_POST["additionalCharges"])) {
       $additionalCharges=$_POST["additionalCharges"];
        $retHashSeq = $additionalCharges.'|'.$salt.'|'.$status.'|||||||||||'.$email.'|'.$firstname.'|'.$productinfo.'|'.$amount.'|'.$txnid.'|'.$key;
 
                  }
	else {	  
 
        $retHashSeq = $salt.'|'.$status.'|||||||||||'.$email.'|'.$firstname.'|'.$productinfo.'|'.$amount.'|'.$txnid.'|'.$key;
 
         }
		 $hash = hash("sha512", $retHashSeq);
 
       if ($hash != $posted_hash) {
	       "Invalid Transaction. Please try again";
		   }
	   else {
 
         $status ;
          $txnid 
 
		 }
		 ?>
		 

	  
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <title>Halanx</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <link rel="icon" type="image/png" sizes="16x16" href="logo.png">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
        <link rel="stylesheet" href="style.css">

        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700" rel="stylesheet">
        <script src="angular.min.js"></script>

        <script>
 		var status = '<?php echo $status ?>';
 		localStorage.setItem('status',status);
 		</script>
         
    
    </head>
<body ng-app="myapp" ng-controller="myctrl">
 
<nav class="navbar navbar-fixed-top" role="navigation">
                <div class="container-fluid">

                    <!-- add header -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                        <a class="navbar-brand navbar-bg" href="index.html">
                    <img src="https://s3-us-west-2.amazonaws.com/halanx-web/logo.png" href="#landing" class="img-responsive" width="50" height="50"><span id="brand-name">Halanx</span>
                </a>
                    </div>

                    <!-- menu items -->
                    <!--            <div class="collapse navbar-collapse" id="navbar1">-->
                    <ul class="login_ctrl nav navbar-nav navbar-right">
                        <a href=" " class="btn-md pull-right" id="login-btn">LOGOUT</a>
                    </ul>
                    <!--            </div>-->


                </div>
            </nav>
            <div id="content">
                <div class="container-fluid bg2" name="toTop" id="toPos">
                    <div class="row">
                        <div class="col-md-4 col-md-offset-4 col-sm-6">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="heading">Your Order Status</h4>
                                </div>
                                <div class="panel-body">
                                    <div class="payment">
                                        <ul>
                                            <li>
                                                 <h4>Your Transaction Id is: <?php echo $txnid ?> and order status is: <?php echo $status?></h4>

                                            </li>
                                            <li>
                                            <button type="button" class="btn btn-md btn-danger" href="www.halanx.com">Click here to try again</button>
                                           
                                        </ul>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
       <footer class="container-fluid bg3">
            <div class="row row_11">
                <div class="col-md-3"></div>
                <div class="col-md-1   text-center"><a href="aboutus.html">About Us</a></div>
                <div class="col-md-1  text-center"><a href="#">Careers</a></div>
                <div class="col-md-1  text-center"><a href="#">Blog</a></div>
                <div class="col-md-1  text-center"><a href="contactus.html">Contact Us</a></div>
                <div class="col-md-1  text-center"><a href="privacy.html">Privacy</a></div>
                <div class="col-md-1  text-center"><a href="terms.html">Terms</a></div>
                <div class="col-md-3"></div>
            </div>

            <div class="row row_13">
                <div class="text-center center-block">
                    <a href="https://www.facebook.com/halanxtech"><i id="social-fb" class="fa fa-facebook-square fa-2x social"></i> .</a>
                    <a href="https://www.twitter.com/halanxtech"><i id="social-tw" class="fa fa-twitter-square fa-2x social"></i> .</a>
                    <a href="https://www.instagram.com/halanxtech"><i id="social-gp" class="fa fa-instagram fa-2x social"></i> .</a>
                    <a href="https://in.linkedin.com/company/halanx"><i id="social-tw" class="fa fa-linkedin-square fa-2x social"></i>.</a>
                    <a href="https://www.pinterest.com/halanxtech"><i id="social-gp" class="fa fa-pinterest-square fa-2x social"></i></a>
                </div>
            </div>

            <div class="row row_12">
                <p>&copy; Halanx 2017</p>
            </div>
        </footer>

           </body>
           </html>