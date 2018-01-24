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
           echo "Invalid Transaction. Please try again";
           }
       else {
 
           $status ;

           $txnid ;
            $amount;
 
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
<style>
.payment{
    color: #008000;
}
img.img-responsive.img-circle {
    display: center;
    margin-left: 126px;
}
</style>
        <script>
 		var status = '<?php echo $status ?>';
 		localStorage.setItem('status',status);
 		</script>
         <script>
            var app = angular.module("myapp", []);
            app.controller("myctrl", ($scope, myfactory,$window) => {

                
             
                  
                        var obj = {};
                        obj.DeliveryDate = localStorage.getItem("DeliveryDate");
                        var json = localStorage.getItem("Address");
                        var splitaddress = JSON.parse(json)
                        obj.DeliveryAddress = splitaddress.Flatno + "," + splitaddress.Area + "," +
                            splitaddress.city
                        obj.AsSoonAsPossible = localStorage.getItem("AsSoonAsPossible");
                        obj.StartTime = localStorage.getItem("StartTime");
                        //          localStorage.getItem("StartTime");
                        var destination = localStorage.getItem("obj");
                        var latlon = JSON.parse(destination)
                        obj.Latitude = latlon.Latitude;
                        obj.Longitude = latlon.Longitude;
                        obj.TransactionID = localStorage.getItem("TransactionID");
                        console.log(obj)
                        var token = myfactory.gettoken();
                        var promise = myfactory.placeorder(obj, token);
                        promise.then(function (data) {
                            console.log(data)
                            alert("Order placed!");
                            $window.location.href= "/#/orders";
                         var addloc= localStorage.getItem("storedata");
                            localStorage.removeItem("storedata");
                            localStorage.removeItem("counter");

                        }, function (err) {

                        });
                    
                     
                }
            
                 
            )
            app.factory("myfactory", ($http, $q, $window) => {
                var object = {
                    placeorder: function (obj, key) {
                        var pr = $q.defer();
                        var url = "https://api.halanx.com/orders/";

                        console.log(obj)
                        $http.post(url, obj, {
                            //             withCredentials: true,
                            headers: {
                                'Authorization': 'Token ' + key
                            }
                        }).then(function (data) {
                                pr.resolve(data.data)
                                console.log("success")
                                


                            },
                            function (err) {
                                pr.reject(err)
                                console.log("error")

                            }
                        )
                        return pr.promise
                    },
                    gettoken: function () {
                        var token = localStorage.getItem("token")

                        var mytoken = token
                        return mytoken;
                    }
                }
                return object
            })
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
                                                <img src="tick.png" class="img-responsive img-circle" width="100" height="100">
                                                 <h4 class="payment">Thanks! We have received an amount of &#8377; <?php echo $amount?>.Your order status is: <?php echo $status?></h4>

                                            </li>
                                            <li>
                                             
                                           
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
