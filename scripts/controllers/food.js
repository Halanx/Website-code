'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:FoodCtrl
 * @description
 * # FoodCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('FoodCtrl', function ($scope,food,$window) {
       if((localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false)&&(localStorage.getItem("isLocated")==null || localStorage.getItem("isLocated")==false)){
     $window.location.href = "#login";
    }
    //  $scope.$watch(function(){return $scope.mystore}, function (newValue, oldValue) {
         
    //        if(newValue!=oldValue){
    //          food1=$scope.mystore;
    //        }
           
          
    //     }, true);
    $scope.closedStore = true;
    var allSelect = true;
    var flag = false;
    var data1;
    var category="";
    var food1 = [];
    $scope.searched = false;
    var pageNumber = 2;
    $scope.searched1 = true;
    $scope.loadbtn = false;
    $scope.nomore = true;
    console.log(food.msg);
     $scope.showclass = false;
    $scope.menu = false;
   $scope.movex = true;
    $scope.color = false;
    if(localStorage.storedata){
        food.loaddata()
    }
   
   $scope.counter= food.loadcounter();
   console.log($scope.counter);
    
     $scope.mystore= function(id){
         food.saveid(id);
         var promise =  food.productserver(id);
         promise.then(function(data){
        console.log(data)

        // food1=data;

       $scope.mydata = data.results;
       data1 = $scope.mydata; 
             favdata()
       
      },function(err){
        // alert("err");   
    } )
         datalogo(id);
     }
    load_id();
     getdata();
    function favdata(){
//       var token= food.gettoken();
//        console.log(token)
//        if(token==null){
//            console.log("null")
//        }
       
        if(localStorage.token){
             var token= food.gettoken();
            console.log(token)
          var promise =  food.favproduct(token);
         promise.then(function(data){
        console.log(data)
         console.log("food")
 for(var i=0;i<data.length;i++){
  for(var j=0;j<$scope.mydata.length;j++){
      if(data[i].id==$scope.mydata[j].id){
          $scope.mydata[j].FavoriteField = true;
          
      }
     
  }
 }
      },function(err){
        // alert("err");   
    } ) 
        }
        else{
            console.log("hello")
        }
    }
    
    function fav(){
        if(localStorage.token==null){
            $scope.fav = true;
            
        }
        else{
           $scope.fav = false; 
           
        }
    }
//    $scope.mydata = food.load(); 
   
function load_id(){
    var id = food.load();
    console.log(id)
   $scope.mystore(id);
    
}

$scope.loadMore = ()=>{
    // category="";
    console.log(category);
        let store_id = food.load();
        
        if(!flag){
        var promise = food.LoadMore(store_id,pageNumber,category);
        promise.then((data)=>{
            console.log(data);
            if(data.next==null){
                flag = true;
                $scope.loadbtn = true;
                $scope.nomore = false;
            }
            if(data.length<20){
                $scope.loadbtn = true;
                $scope.nomore = false;
            }
            // if(category=="" && data.length<20){
            //     flag = true;
            // }
            console.log("data",data);
            pageNumber++;
         if(pageNumber==2){
            
           $scope.mydata = data.results;
        }else{
             data.results.forEach(function(element) {
                $scope.mydata.push(element);
                
            }, this);
        }
            // $scope.mydata = data;
            console.log("data is",$scope.mydata);
            data1 = $scope.mydata;
            console.log("yes me:",data1);
            // if(category.length>2){
            // $scope.catwise(category);
            // }
        })
    }
    console.log("data was",$scope.mydata);
    }
          loadMoreData();
          function loadMoreData(){
                window.angular.element($window).bind('scroll', function() {
//  console.log("scroll top",$(window).scrollTop());
//                 console.log("window height", $(window).height());
//                 console.log("doc height", $(document).height());
            // if($scope.mydata.length%20==0){
                
            if($(window).scrollTop() + $(window).height()== $(document).height()) {
                

                     $scope.loadMore();
                 
//    }
   }
            });
          }



  
    function getdata(){
        if(localStorage.token==null){
            $scope.menu=true;
             console.log("no")
        }
        else{
               $scope.menu=false;
             console.log("yes")
        }
    var promise = food.callserver();
    promise.then(function(data){
        console.log(data)
        
        var Food  = data.filter(function(obj){
            return obj.StoreCategory == "Food";
        })
       $scope.storedata =Food ;
      

        console.log($scope.storedata);
      },function(err){
        // alert("err");   
    } );
    }
      
    $scope.addsidebar = ()=>{
        $scope.movex = !$scope.movex;
    }
$scope.addstore = ()=>{
    $scope.showclass = !$scope.showclass;
    
}

$scope.scrollDown = function(){
    console.log("aaya");
	    $('html, body').animate({ scrollTop: $("#product-list-wrapper").offset().top - 170 }, 550);
	}
    

     $scope.addmodal = (data)=>{
         $scope.modal = data;
     }
 
     
     
     
     function datalogo(id){
           var promise = food.storeserver(id);
    promise.then(function(data){
        if(!data.IsOpen){
            $scope.closedStore = false;
        }
        else{
            $scope.closedStore = true;
        }
        console.log(data)
         $scope.productcat=data.CategoriesAvailable;
        console.log($scope.productcat)
       $scope.StoreLogo = data.logos[0].logo_image;
        $scope.StoreName= data.StoreName
       
      },function(err){
        // alert("err");   
    } );
     }
         
    $scope.addtocart = (modal,q)=>{
//        console.log(q)
//        console.log($scope.counter)
//        console.log($scope.ProductName)
//         console.log(this.quantity)
//       var len = food.arrlength();
//        console.log(len)
//        if(len==0){
//             food.addproduct(modal)
//        }
        
//        else{
       var match =  food.check(modal)
   
       if(match.length==1){
        //   alert("already present in cart")
       }
        else{
        modal.quantity = q;
         food.addproduct(modal)
       
        $scope.counter = food.arrlength();
            food.savecounter($scope.counter)
         Notification.requestPermission(function(){
            var n = new Notification("Halanx", {
                body : "ADDED TO CART",
                icon : "images/success.png"
            });
           },1000);
        }

        
        
    }
    $scope.addfav = (data)=>{
        console.log(data)
         var token=food.gettoken();
         if(token==null || token==undefined){
        token=localStorage.getItem("token");
            } 
        var val;
       data.FavoriteField = !data.FavoriteField;
//        data.FavoriteField = true;
        if(data.FavoriteField==true){
            val = 1;
//            alert("true")
            
       var obj= {}
       obj.LastItem = data.id;
            
            console.log(obj.LastItem)

          
           
      var promise =   food.callfav(obj,val,token)
                 promise.then(function(data){
        console.log(data)


       
       
      },function(err){
        $window.location.assign("#login");   
    } )
 
        }
        else{
            
              val = 0;
//            alert("true")
            
       var obj= {}
       obj.LastItem = data.id;
           
            console.log(obj.LastItem)
//            var mobilenumber = 8506078226;
          
            
      var promise =   food.callfav(obj,val,token)
                 promise.then(function(data){
        console.log(data)


       
       
      },function(err){
        // alert("err");   
    } )  
            
            
        }
    }
    
     $scope.search = ()=>{
         console.log($scope.enter);
        console.log($scope.store);
        if($scope.enter.length>0){
           $scope.showContent = false;
        }
        else{
            $scope.showContent = true;
            $scope.searched = false;
            $scope.searched1 = true; 
        }
       var promise =  food.searchlist($scope.enter)
           promise.then(function(data){
        
              
              $scope.listdata = data;
               console.log($scope.list)
      
      },function(err){
  
    } );
    }
     $scope.getsearch = (product)=>{
         console.log(product._id);
         console.log($scope.mydata);
         datalogo(product._source.StoreId);
         $scope.mystore(product._source.StoreId);
          food.saveid(product._source.StoreId);
        var promise =  food.getproduct(product._id);
         promise.then(function(data){
        console.log("data is:" , data);
        $scope.data = data;
        $scope.searched = true;
        $scope.searched1 = false;
        // $scope.mydata = data;
        // console.log("yele bhai",$scope.mydata);
// for(var i =0 ; i<50000;i++){
//             var count = $scope.data.length+1;
//         }
        //  console.log(food1);
       if(product._id!=null||product!=undefined){
           loadNewProd(product._id);  
            
       }
    
        console.log("searched data is:",$scope.mydata);
        $scope.listdata="";
            //      
       
      },function(err){
        // alert("err");   
    } )
         datalogo(product._source.StoreId);
        for(var i =0 ; i<50000;i++){
            var count = $scope.mydata.length+1;
        }
         console.log(food1);
       if(product._id!=null||product!=undefined){
           loadNewProd(product._id);    
       }
     };

     function loadNewProd(id){
         console.log($scope.mydata);
        
        
     }
 
     function jquery(){
                            $(".category").click(function(){
           if($('.category').hasClass('colorred')){
   $('.category').removeClass('colorred')
}
    $(this).addClass("colorred");
                 console.log( $(this).text().trim())
});
//         alert("hello")
     }
    
    
     $scope.catwise = (cat)=>{
         $scope.searched = false;
         $scope.searched1 = true;
         $scope.loadbtn = false;
         $scope.nomore = true;
         flag = false;
         jquery();
         
        
         console.log(food.load())
         var promise =  food.productserver(food.load());
         promise.then(function(data){
         console.log(data)
         pageNumber=1;
         if(cat=="All" && !allSelect){
             allSelect = true;
             category=""
           
             $scope.loadMore();
            
             $scope.mydata = data1; 
         }
         else if(cat!="All"){
              category = cat;
             allSelect = false;
           
             var owncat =  data1.filter(function(obj){
                return obj.Category == cat;
                    })
        
            $scope.mydata = owncat;
          
             }
      },function(err){
       
    } )
     }

     $scope.backToStore = ()=>{
         $window.location.assign("#landing");
     }
   
    

  });
