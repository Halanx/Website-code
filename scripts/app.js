'use strict';

/**
 * @ngdoc overview
 * @name halanxApp
 * @description
 * # halanxApp
 *
 * Main module of the application.
 */
angular
  .module('halanxApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/aboutus', {
        templateUrl: 'views/aboutus.html',
        controller: 'AboutusCtrl',
        controllerAs: 'aboutus'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        // controller: 'TermsCtrl',
        // controllerAs: 'terms'
      })
      .when('/contactus', {
        templateUrl: 'views/contactus.html',
        // controller: 'ContactusCtrl',
        // controllerAs: 'contactus'
      })
      .when('/xyz', {
        templateUrl: 'views/xyz.html',
        // controller: 'ContactusCtrl',
        // controllerAs: 'contactus'
      })
      // .when('/abc', {
      //   templateUrl: 'views/abc.html',
      //   // controller: 'ContactusCtrl',
      //   // controllerAs: 'contactus'
      // })
      .when('/privacy', {
        templateUrl: 'views/privacy.html',
        // controller: 'PrivacyCtrl',
        // controllerAs: 'privacy'
      })
      .when('/terms', {
        templateUrl: 'views/terms.html',
        controller: 'TermsCtrl',
        controllerAs: 'terms'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/shopper', {
        templateUrl: 'views/shopper.html',
        controller: 'ShopperCtrl',
        controllerAs: 'shopper'
      })
      .when('/delivery-time', {
        templateUrl: 'views/datepicker.html',
        controller: 'DatepickerCtrl',
        controllerAs: 'datepicker'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'cart'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts.html',
        controller: 'AccountsCtrl',
        controllerAs: 'accounts'
      })
      .when('/orders', {
        templateUrl: 'views/orders.html',
        controller: 'OrdersCtrl',
        controllerAs: 'orders'
      })
      .when('/food', {
        templateUrl: 'views/food.html',
        controller: 'FoodCtrl',
        controllerAs: 'food'
      })
      .when('/foodmain', {
        templateUrl: 'views/foodmain.html',
        controller: 'FoodmainCtrl',
        controllerAs: 'foodmain'
      })
      .when('/stores', {
        templateUrl: 'views/landing.html',
        controller: 'LandingCtrl',
        controllerAs: 'landing'
      })
      .when('/order-details', {
        templateUrl: 'views/summary.html',
        controller: 'SummaryCtrl',
        controllerAs: 'summary'
      })
      .when('/delivery-location', {
        templateUrl: 'views/location.html',
        controller: 'LocationCtrl',
        controllerAs: 'location'
      })
      .when('/merchant', {
        templateUrl: 'views/store.html',
        controller: 'StoreCtrl',
        controllerAs: 'store'
      })
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        controllerAs: 'payment'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      })
      .when('/registerotp', {
        templateUrl: 'views/registerotp.html',
        controller: 'RegisterotpCtrl',
        controllerAs: 'registerotp'
      })
      .when('/forgetpass', {
        templateUrl: 'views/forgetpass.html',
        controller: 'ForgetpassCtrl',
        controllerAs: 'forgetpass'
      })
      .when('/favourite', {
        templateUrl: 'views/favourite.html',
        controller: 'FavouriteCtrl',
        controllerAs: 'favourite'
      })
      .when('/forgetpassotp', {
        templateUrl: 'views/forgetpassotp.html',
        controller: 'ForgetpassotpCtrl',
        controllerAs: 'forgetpassotp'
      })
      .when('/change-password', {
        templateUrl: 'views/forgetpassnew.html',
        controller: 'ForgetpassnewCtrl',
        controllerAs: 'forgetpassnew'
      })
      .when('/socialregister', {
        templateUrl: 'views/socialregister.html',
        controller: 'SocialregisterCtrl',
        controllerAs: 'socialregister'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller : 'DashboardCtrl',
        controllerAs : 'dashboard'
      })
      .when('/business', {
        templateUrl: 'views/business.html',
        controller: 'BusinessCtrl',
        controllerAs: 'business'
      })
      .when('/hxpa', {
        templateUrl: 'views/hxpa.html',
        controller: 'HxpaCtrl',
        controllerAs: 'hxpa'
      })
      .when('/hxpaabout', {
        templateUrl: 'views/hxpaabout.html',
        controller: 'HxpaaboutCtrl',
        controllerAs: 'hxpaabout'
      })
      .when('/hxpabank', {
        templateUrl: 'views/hxpabank.html',
        controller: 'HxpaaboutCtrl',
        controllerAs: 'hxpaabout'
      })
      .when('/hxpatiming', {
        templateUrl: 'views/hxpatiming.html',
        controller: 'HxpaaboutCtrl',
        controllerAs: 'hxpaabout'
      })
      .when('/hxpalogin', {
        templateUrl: 'views/hxpalogin.html',
        controller: 'HxpaloginCtrl',
        controllerAs: 'hxpalogin'
      })
      .when('/faq', {
        templateUrl: 'views/faq.html',
        controller: 'FaqCtrl',
        controllerAs: 'faq'
      })
      .when('/career', {
        templateUrl: 'views/career.html',
        controller: 'CareerCtrl',
        controllerAs: 'career'
      })
      .when('/refund', {
        templateUrl: 'views/refundpolicy.html',
        controller: 'CareerCtrl',
        controllerAs: 'career'
      })
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        controllerAs: 'payment'
      })
      .when('/payment', {
        templateUrl: 'views/payment.html',
        controller: 'PaymentCtrl',
        controllerAs: 'payment'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });

  window.fbAsyncInit = function() {
    FB.init({
      appId            : '802327439948630',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.10'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

