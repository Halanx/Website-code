'use strict';

/**
 * @ngdoc service
 * @name halanxApp.dashboard
 * @description
 * # dashboard
 * Factory in the halanxApp.
 */
angular.module('halanxApp')
  .factory('dashboard', function ($q,$http) {
    
    return {
      DashCall(key){
        var pr = $q.defer();
				var url = "https://api.halanx.com/stores/cart-items/";
            // console.log(obj);
				$http.get(url, {
            headers: {
                'Authorization': 'Token ' +key 
            }
          }).then(function(data){
					pr.resolve(data);
                    console.log("Data Posted",data);
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");
					});
            return pr.promise;
      },
      DashCallRealTime(key){
        var pr = $q.defer();
				var url = "https://api.halanx.com/stores/cart-items/";
            // console.log(obj);
				$http.get(url, {
            headers: {
                'Authorization': 'Token ' +key 
            }
          }).then(function(data){
					pr.resolve(data);
                    // console.log("Data Posted",data);
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");
					});
            return pr.promise;
      },
      PaymentCall(key){
        var pr = $q.defer();
				var url = "https://api.halanx.com/stores/payments/";
            // console.log(obj);
				$http.get(url, {
            headers: {
                'Authorization': 'Token ' +key 
            }
          }).then(function(data){
					pr.resolve(data);
                    console.log("Data Posted",data);
				}
					,function(err){
					pr.reject(err);	
					console.log(" Error");
					});
            return pr.promise;
      },

      getProduct(id,page_no){
        var pr = $q.defer();
        var url = "https://api.halanx.com/stores/"+id+"/products/?category=&page="+page_no;
        $http.get(url).then((data)=>{
          pr.resolve(data.data);
          console.log(data.data);
        },(err)=>{
          pr.reject(err);
        });

        return pr.promise;
      },
      editProduct(product,id,token){
        var pr = $q.defer();
        var url = "https://api.halanx.com/products/"+id+"/";
        $http.patch(url,product,{
          headers:{
            'Authorization':'Token '+token
          }
        }).then((data)=>{
          pr.resolve(data.data);
          console.log(data);
        },(err)=>{
          pr.reject(err);
        });

        return pr.promise;
      }, //basic structure ready krde sbka aage ka m api ka btadnga   ha iska to hogya bs data na aye vo rkdeta hu
      getVoucher(){//chl gya data nhi a rha h pche s khali h as chechlga le if data.data.message = not found aye screen pr msg show krdio no transacion found   thek h
        var pr = $q.defer();
        var url = 'http://35.154.255.124:8000/vouchers/items/store/';
        $http.get(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise
      },
      getVoucherStats(){
        var pr = $q.defer();
        var url = 'http://35.154.255.124:8000/vouchers/store/stats/';
        $http.get(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise
      },
      getVoucherOffers(){
        var pr = $q.defer();
        var url = 'http://35.154.255.124:8000/vouchers/store/';
        $http.get(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise
      },
      getVoucherRedeemed(value){
        var pr=$q.defer();
        var url ="http://35.154.255.124:8000/vouchers/items/"+"30569471"+"/verify/";
        $http.post(url,value,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise
      },
      getOutletDetails(){
        var pr = $q.defer();
        var url = "http://35.154.255.124:8000/places/place/9/";
        $http.get(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise;
      },
      editOutletDetails(){
        var pr = $q.defer();
        var url = "http://35.154.255.124:8000/places/place/1/";
        $http.patch(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise;
      },
      getPlaceMenu(){
        var pr = $q.defer();
        var url = "http://35.154.255.124:8000/places/place/1/";
        $http.get(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise;
      },
      getTimings(){
        var pr = $q.defer();
        var url = "http://35.154.255.124:8000/places/place/1/openinghours/";
        $http.get(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise;
      },
      getPics(){
        var pr = $q.defer();
        var url = "http://35.154.255.124:8000/places/place/1/menu/";
        $http.get(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise;
      },
      addImage(){
        var pr = $q.defer();
        var url = "http://35.154.255.124:8000/places/place/1/menu/";
        $http.post(url,{
          headers:{
            'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15'
          }
        }).then(success,fail);
        function success(data){
          pr.resolve(data);
        }
        function fail(err){
          pr.reject(err);
        }
        return pr.promise;
      }
      
      
    };
  });