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
      }
      
    };
  });
