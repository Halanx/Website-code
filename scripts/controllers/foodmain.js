'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:FoodmainCtrl
 * @description
 * # FoodmainCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('FoodmainCtrl', function ($scope,foodmain,$window) {
     if((localStorage.getItem("isLogin") === null || JSON.parse(localStorage.getItem("isLogin"))==false)&&(localStorage.getItem("isLocated")==null || localStorage.getItem("isLocated")==false)){
     $window.location.href = "#login";
    }
    var data1;
    var flag = false;
    var allSelected = false;
    $scope.searched1 = true;
    $scope.closedStore = true;
    $scope.loadbtn = false;
    $scope.nomore = true;
    var pageNumber  = 2;
    var category = "";
    $scope.searched = false;
     $scope.showclass = false;
   $scope.movex = true;
    $scope.menu = false;
    if(localStorage.storedata){
 foodmain.loaddata()
    }
   
   $scope.counter= foodmain.loadcounter();
   console.log($scope.counter);
    $scope.mystore= function(id){
         foodmain.saveid(id);
        var promise =  foodmain.productserver(id);
         promise.then(function(data){
        console.log(data)


       $scope.mydata = data.results;
       data1 = data.results;
             favdata();
       
      },function(err){
        // alert("err");   
    } )
         datalogo(id);
     }
    load_id();
     getdata();
      function favdata(){
//       var token= foodmain.gettoken();
//        console.log(token)
//        if(token==null){
//            console.log("null")
//        }
       
        if(localStorage.token){
             var token= foodmain.gettoken();
            console.log(token)
          var promise =  foodmain.favproduct(token);
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
        if(localStorage.mobilenumber==null){
            $scope.fav = true;
        }
        else{
           $scope.fav = false; 
        }
    }
//    $scope.mydata = foodmaintory.load(); 
   
function load_id(){
    var id = foodmain.load();
    console.log(id)
   $scope.mystore(id);
    
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
    var promise = foodmain.callserver();
    promise.then(function(data){
        console.log(data)
       $scope.storedata = data;
      

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
    

     $scope.addmodal = (data)=>{
         $scope.modal = data;
         $scope.showImage = false;
         if(data.ProductImage==null){
             $scope.modal.ProductImage == undefined;
             $scope.showImage = true;
         }
         
         console.log("data is ",data);
     }
 
     
     
     
     function datalogo(id){
           var promise = foodmain.storeserver(id);
    promise.then(function(data){
        console.log(data)
        if(!data.IsOpen){
            $scope.closedStore = false;
        }
        else{
            $scope.closedStore = true;
        }
       $scope.StoreLogo = data.logos[0].logo_image;
        $scope.StoreName= data.StoreName;
        //$scope.productcat = JSON.parse(data.CategoriesAvailable);
        $scope.productcat=data.CategoriesAvailable;
      },function(err){
        // alert("err");   
    } );
     }
         
    $scope.addtocart = (modal, quantity)=>{
//       var len = foodmain.arrlength();
//        console.log(len)
//        if(len==0){
//             foodmain.addproduct(modal)
//        }
        
//        else{
       var match =  foodmain.check(modal)
   
       if(match.length==1){
        //   alert("already present in cart")
       }
        else{
        
        modal.quantity = quantity;
        console.log("modal wala: " +  modal.quantity);
         foodmain.addproduct(modal)
       
        $scope.counter = foodmain.arrlength();
            foodmain.savecounter($scope.counter)
         Notification.requestPermission(function(){
            var n = new Notification("Halanx", {
                body : "ADDED TO CART",
                icon : "images/success.png"
            });
           },1000);
        }

        
        
    }

    $scope.loadMore = ()=>{
        console.log("you called me");
        let store_id = foodmain.load();
        if(!flag){
        var promise = foodmain.LoadMore(store_id,pageNumber,category);
        promise.then((data)=>{
            if(data.next == null){
                flag = true;
                $scope.loadbtn = true;
                $scope.nomore = false;
            }
            pageNumber++;
            if(pageNumber==2){
            
             $scope.mydata = data.results;
            }else{
             data.results.forEach(function(element) {
                $scope.mydata.push(element);
                
            }, this);
        }

        data1 = $scope.mydata;
            // data.results.forEach(function(element) {
            //     $scope.mydata.push(element);
            // }, this);
            // console.log($scope.mydata)
        })
    }
    }


    loadMoreData();
          function loadMoreData(){
                window.angular.element($window).bind('scroll', function() {
 
           
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                  $scope.loadMore();
   }
            });
          }


    $scope.addfav = (data)=>{
        // alert("Added to Favourites!");
        var val;
        data.FavoriteField = !data.FavoriteField;
         var token=foodmain.gettoken();
          if(token==null || token==undefined){
      token=localStorage.getItem("token");
    } 
        if(data.FavoriteField==true){
            val = 1;
//            alert("true")
            
       var obj= {}
       obj.LastItem = data.id;
            
            console.log(obj.LastItem)
//            var mobilenumber=localStorage.getItem("mobilenumber")
          
            
      var promise =   foodmain.callfav(obj,val,token)
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
           
          
            
      var promise =   foodmain.callfav(obj,val,token)
                 promise.then(function(data){
        console.log(data)


       
       
      },function(err){
        // alert("err");   
    } )  
            
            
        }
    }
     
     $scope.minus = ()=>{
      $scope.quantity = $scope.quantity - 1  
     }
    $scope.plus = ()=>{
        console.log($scope.quantity)
        $scope.quantity = $scope.quantity + 1
    }
     
     $scope.search = ()=>{
         if($scope.enter.length<1){
             $scope.should = true;
              $scope.searched1 = true;
    $scope.searched = false;
         }
         console.log("hello")
        console.log($scope.store)
       var promise =  foodmain.searchlist($scope.enter)
           promise.then(function(data){
        console.log(data);
               $scope.should = false;
              $scope.listdata = data;

               console.log($scope.listdata);
      
      },function(err){
  
    } );
    }
     $scope.getsearch = (product)=>{
        //  $scope.modal.ProductImage = "undefined";
        //  $scope.mydata.ProductImage = "undefined";
         console.log(product._source.Id)
         $scope.mystore(product._source.StoreId);
          foodmain.saveid(product._source.StoreId);
        var promise =  foodmain.getproduct(product._source.Id);
         promise.then(function(data){
        console.log(data)
         $scope.searched1 = false;
    $scope.searched = true;
    //     var food1 = [];
    //     food1.push(data);
    //    var filterdata = food1.filter(function(obj){
    //         return obj.id == product._id;
    //     });
       
        // console.log("food1 is:",food1);
        $scope.data = data;
        $scope.data.showMe = false;
        if(data.ProductImage == null){
            $scope.data.showMe = true;
        }
        $scope.listdata="";
             favdata()
       
      },function(err){
        // alert("err");   
    } )
        //  datalogo(product._source.StoreId);
        for(var i =0 ; i<50000;i++){
            var count = $scope.mydata.length+1;
        }
        //  console.log(food1);
       if(product._id!=null||product!=undefined){
           loadNewProd(product._id);    
       }
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
        
  jquery();
         $scope.searched1 = true;
         $scope.searched = false;   
         $scope.loadbtn = false;
         $scope.nomore = true;
         flag = false;
         
         console.log(foodmain.load())
            //  var promise =  foodmain.productserver(foodmain.load());
        //  promise.then(function(data){
        // console.log(data)
        pageNumber = 1;
         if(cat=="All" && !allSelected){
             allSelected = true;
             category = ""; 
             $scope.loadMore();
            $scope.mydata = data1; 
         }
             else if(cat!="All"){
                 category = cat;
                  allSelected = false;
                 $scope.loadMore();
        var owncat =  data1.filter(function(obj){
             return obj.Category ==cat;
         })
        // console.log(owncat)
        $scope.mydata = owncat;
//       $scope.mydata = data;
          
             }
    //   },function(err){
        // alert("err");   
    // } )
     }
     $scope.backToStore = ()=>{
         $window.location.assign("#landing");
     }
    
  });
