'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
  .controller('DashboardCtrl', function ($scope,dashboard,business,$window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var page_no=1;
    $scope.edit_msg = "";
    var sid;
    var flag = true;
    $scope.lodRip = false;
    $scope.cancelBtn = true;
    $scope.loadMore_c = false;
    $scope.BTN = "Edit";
    var token = localStorage.getItem("store_token");
    var promise = dashboard.DashCall(token);
    $scope.Pname = true;
    $scope.dashdata = [];
    $scope.payment = [];
    promise.then(function(data){
      console.log(data);
      $scope.paid = data.data.paid;
      $scope.pending = data.data.pending;
      localStorage.setItem("paid_amount",data.data.paid);
      localStorage.setItem("pending_amount",data.data.pending);
      for(var i=0;i<data.data.items.length;i++){
        data.data.items[i].placing_time = getDate(data.data.items[i].placing_time)+" & "+formatAMPM(data.data.items[i].placing_time);
        data.data.items[i].dt = getDate(data.data.items[i].delivery_time)+" & "+formatAMPM(data.data.items[i].delivery_time);
      }
      $scope.dashdata = data.data.items;
      $scope.storeName = data.data.store_name;
      $scope.lodRip = true;

      
      console.log("data is:",data.data.items);
    },function(err){
      console.log(err);
    })
// DashCall

setInterval(function(){
  var promise = dashboard.DashCallRealTime(token);
  promise.then(function(data){
    // console.log(data);
    $scope.paid = data.data.paid;
    $scope.pending = data.data.pending;
    localStorage.setItem("paid_amount",data.data.paid);
    localStorage.setItem("pending_amount",data.data.pending);
    for(var i=0;i<data.data.items.length;i++){
      data.data.items[i].placing_time = getDate(data.data.items[i].placing_time)+" & "+formatAMPM(data.data.items[i].placing_time);
      data.data.items[i].dt = getDate(data.data.items[i].delivery_time)+" & "+formatAMPM(data.data.items[i].delivery_time);
    }
    $scope.dashdata = data.data.items;
  },function(err){
    console.log(err);
  })
  }, 10000);

    $scope.visit = ()=>{
      $window.location.assign("#business");
      $window.location.reload();
    }

    function formatAMPM(data) {
      var date = new Date(data);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    function getDate(data){
      var date = new Date(data);
      var day = date.getDate(); //Date of the month: 2 in our example
      var month = date.getMonth()+1; //Month of the Year: 0-based index, so 1 in our example
      var year = date.getFullYear();
      if(month<10){
        month = "0"+month;
      }
      return day+"/"+month+"/"+year;
    }

    $scope.openMe = ()=>{
      dashboard.PaymentCall(token).then((data)=>{
        for(var i=0;i<data.data.length;i++){
          var ele = getDate(data.data[i].paid_on)+" & "+formatAMPM(data.data[i].paid_on);
          data.data[i].paid_on = ele;
        }
        $scope.payment = data.data;
        console.log(data.data);
        
      })
      // for(var i=0;i<20;i++){
      // $scope.payment.push({id: i, amount: 1000*i, paid_on: "2018-01-11T12:30:00Z", store: 78});
      // }
    };
function showMeData(){
    var promise = business.callBusiness(token);
          promise.then((data)=>{
                 sid = data[0].id;
                 $scope.categories = data[0].CategoriesAvailable;
                 console.log(sid);
            $scope.openMe();
            $scope.getProduct();
          },(err)=>{
            console.log(err);
          });
}  

showMeData();

    $scope.getProduct = ()=>{
      var promise = dashboard.getProduct(sid,page_no);
        promise.then((data)=>{
        console.log(data);
        if(data.next==null){
          flag = false;
          $scope.loadMore_c = true;
        }
       
        for(var i =0;i<data.results.length;i++){
          if(data.results[i].ProductImage == null){
            // data.results[i].ProductImage = data.results[i].Store.StoreLogo;
            data.results[i].ProductImage = "";
            data.results[i].msg = "";
          }
          data.results[i].disable = true;
        }
         if(data.previous==null){
        $scope.products = data.results;
         }
         else{
           data.results.forEach(function(element) {
             $scope.products.push(element);
           }, this);
         }
        console.log($scope.products);
        $scope.tempProducts = $scope.products;
      },(err)=>{
        console.log("err");
      });
    }


    

    $scope.searchProVal = "";
    $scope.searchPro = () => {
      var len = $scope.searchProVal.length;
      $scope.productsSer = [];
      if(len == 0) {
        $scope.getProduct();
        $scope.searchMsg = "";
      } else {
      $scope.tempProducts.forEach(element => {
        if((element.ProductName.slice(0, len)).toLowerCase() == ($scope.searchProVal).toLowerCase()) {
          $scope.productsSer.push(element); 
          console.log(element.ProductName);
        }
      });
      if($scope.productsSer.length == 0) {
        $scope.searchMsg = "No Products found";
      } else {
        $scope.searchMsg = $scope.productsSer.length + " item(s) found.";
      }
    }
      console.log($scope.searchProVal);
    }

    $scope.edit = (product)=>{
      $scope.BTN = "Save";
      product.disable = false;
    }

    $scope.cancelEdit = (product)=>{
      product.disable = true;
    }

    $scope.save = (product)=>{
      var obj = {
        ProductName:product.ProductName,
        MRP:product.MRP,
        Price:product.Price,
        Category:product.Category,
        Features:product.Features,
        Active:product.Active
      }
      dashboard.editProduct(obj,product.id,token).then((data)=>{
        if(data.id){
          product.msg = "Product saved.";
          $scope.cancelEdit(product);
        }
        console.log(data);
      })
    };

    loadMoreData();
     function loadMoreData(){
        window.angular.element($window).bind('scroll', function() {
          if($(window).scrollTop() + $(window).height()== $(document).height()) {
                 $scope.loadMore();
               }
            });
          };

     $scope.loadMore = ()=>{
       if(flag){
        page_no = page_no+1;
        $scope.getProduct();
       }
      
     }
     
     $scope.LoadMoreProducts = ()=>{
       $scope.loadMore();
     }      
     
     $scope.getVouchers = ()=>{ //ye function load kb kr rha h?  voucher pr click ok
      getVoucherStats();
      getVoucherOffers();
      $scope.nodat=true;
      $scope.nooff=true;
       var pr = dashboard.getVoucher();
       pr.then(success,fail);
       function success(data){
         if(data.data.length==0){
          $scope.nodat = true;
          }
         else{
          $scope.nodat = false;
          data.data[0].is_redeemed=false;
          console.log(data.data);
         $scope.result = data.data;
       }
      }
       function fail(err){
         $scope.error=err;
       }
     };

     function getVoucherOffers(){
      var pr = dashboard.getVoucherOffers();
      pr.then(success,fail);
      function success(data){
        if(data.data.length==0){
          $scope.nooff = true;
          }
         else{
          $scope.nooff = false;
         $scope.offers = data.data;
       }
      }
      function fail(err){
        $scope.erroff = err;
      }
     }

     function getVoucherStats(){
      var pr = dashboard.getVoucherStats();
      pr.then(success,fail);
      function success(data){
        $scope.stats = data.data;
      }
      function fail(err){
        $scope.errstats = err;
      }
     };

     $scope.checkCode=()=>{
       if($scope.voucherCode){
        var pr = dashboard.getVoucherRedeemed($scope.voucherCode);
        pr.then(success,fail);
        function success(data){
          $score.cantRedeem=false;
          angular.element(document.querySelector('.redeeming')).attr('data-toggle', 'modal');
          angular.element(document.querySelector('.redeeming')).attr('data-target', '#myModal');
          console.log("----------------------"+data.data+"-----------------------");
          $scope.redeemIt=data.data;
        }
        function fail(err){
          $scope.errredeem = err;
          if(err.data.error="voucher item does not exist"){
            $scope.cantRedeem=true;
          }
          console.log("----------------------"+JSON.stringify(err)+"-----------------------")
        }
       }
     };    



     $scope.getProfile = ()=>{
       getPlaceMenu();
       getTimings();
       getPics();
      var pr = dashboard.getOutletDetails();
      pr.then(success,fail);
      function success(data){
        $scope.prof = data.data;
        console.log(data.data);
      }
      function fail(err){
        $scope.errprof = err;
      }
     };

     function getPlaceMenu(){
      var pr = dashboard.getPlaceMenu();
      pr.then(success,fail);
      function success(data){
        $scope.prof = data.data;
        console.log(data.data);
      }
      function fail(err){
        $scope.errprof = err;
      }
     };

     function getTimings(){
      var pr = dashboard.getTimings();
      pr.then(success,fail);
      function success(data){
        $scope.time = data.data;
        console.log(data.data);
        console.log(data);
      }
      function fail(err){
        $scope.errtime = err;
      }
     };

     function getPics(){
      var pr = dashboard.getPics();
      pr.then(success,fail);
      function success(data){
        $scope.pics = data.data;
        console.log(data);
      }
      function fail(err){
        $scope.errpics = err;
      }
     }

     $scope.addImage=()=>{
      var pr = dashboard.addImage();
      pr.then(success,fail);
      function success(data){
        $scope.pics = data.data;
        console.log(data);
      }
      function fail(err){
        $scope.errpics = err;
      }
      
      getPics();
     }

     $scope.editDetails = () =>{
      var pr = dashboard.editOutletDetails();
      pr.then(success,fail);
      function success(data){
        $scope.prof = data.data;
        console.log(data.data);
      }
      function fail(err){
        $scope.errprof = err;
      }
     };



     
    
  });