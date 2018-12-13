'use strict';

/**
 * @ngdoc function
 * @name halanxApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the halanxApp
 */
angular.module('halanxApp')
    .controller('DashboardCtrl', function ($interval, $scope, dashboard, payment, business, $window, $filter, Upload, $timeout, $http, $q, $location) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            'angular-input-stars'
            , 'ngFileUpload',
            '720kb.datepicker',
            'ngMaterial'
        ];
        document.querySelector("footer").classList.add("dash");
        $scope.showProducts = true;
        var token = localStorage.getItem("store_token");
        console.log("TOken is--------", token);

        $scope.$on("$routeChangeStart", function ($event, next, current) {
            document.querySelector("footer").classList.remove("dash");
        });

        if (!token) {
            $location.path('/hxpalogin');
        }
        $scope.getTChange = () => {
            $scope.editHighlights();
        }
        // $scope.memv;
        //$scope.spopost='Write about any offer or something which can attract your customers';
        $scope.monthly = 'June';
        $scope.editable = false;
        // $scope.mem.role = 'Employee';
        $(window).resize(function () {
            if ($window.innerWidth > 768) {
                $scope.chartwidth = $window.innerWidth - 300;
            }
            else if ($window.innerWidth < 768 && $window.innerWidth > 500) {
                $scope.chartwidth = $window.innerWidth - 150;
            }
            else {
                $scope.chartwidth = $window.innerWidth - 100;
            }
            $scope.getSalesBarValue($scope.mindates, $scope.maxdates);
            $scope.getVisitsBarValue($scope.minvisitdates, $scope.maxvisitdates);
            $scope.getOrdersBarValue($scope.minorderdates, $scope.maxorderdates);
        });
        $scope.loadStore = () => {
            var pr = dashboard.loadStore(token);
            pr.then(success, fail);
            function success(data) {
                $scope.store = data.place.id;
                $scope.storeName = data.name;
                console.log("Load Store : ", $scope.store, $scope.storeName);
                $scope.getProfile();
            }
            function fail(err) {
                $scope.errstore = err;
            }
        };
        $scope.loadStore();

        function getpieValue() {
            var pr = dashboard.getStoreStats(token);
            pr.then(success, fail);
            function success(data) {
                $scope.old = data.data.old_customers;
                $scope.new = data.data.new_customers;
            }
            function fail(err) {
                $scope.errsd = err;
            }
        };



        // var $scope.chartwidth;
        // function resizeGraphs(){
        //   if($(window).width()>768){
        //     $scope.chartwidth=$(window).width()-400;
        //   }
        //     getSalesbar();
        //     $scope.getVisitbar();
        //     $scope.getOrderbar();

        // }

        //   resizeGraphs();

        // $(window).resize(function(){
        //   resizeGraphs();
        // });

        var itemdate;
        var itemsdate;
        var itemdates;
        var itemsdate;
        var itemsmonth;
        var itemsyear;
        var itemsdate2;
        var itemsmonth2;
        $scope.getDatesForGraphs = () => {
            $scope.newdate = new Date();
            itemdate = $filter('date')($scope.newdate, "dd-MM-yyyy");
            itemdates = itemdate.split('-');
            itemsdate = itemdates[0];
            itemsmonth = itemdates[1];
            itemsyear = itemdates[2];
            if (itemsdate <= 10) {
                itemsmonth2 = itemsmonth - 1;
                if (itemsdate > 5) {
                    itemsdate2 = 30 - itemsdate;
                }
                else {
                    itemsdate2 = 25 - itemsdate;
                }
            }
            else {
                itemsmonth2 = itemsmonth;
                itemsdate2 = "01";
            }
            $scope.mindates = itemsmonth2 + '/' + itemsdate2 + '/' + itemsyear;
            $scope.maxdates = itemsmonth + '/' + itemsdate + '/' + itemsyear;
            $scope.minvisitdates = itemsmonth2 + '/' + itemsdate2 + '/' + itemsyear;
            $scope.maxvisitdates = itemsmonth + '/' + itemsdate + '/' + itemsyear;
            $scope.minorderdates = itemsmonth2 + '/' + itemsdate2 + '/' + itemsyear;
            $scope.maxorderdates = itemsmonth + '/' + itemsdate + '/' + itemsyear;
            // $scope.mintoddates= itemsmonth2+'/'+itemsdate2+'/'+itemsyear;
            // $scope.maxtoddates = itemsmonth+'/'+itemsdate+'/'+itemsyear;
        }

        $scope.getDatesForGraphs();

        $scope.getpie = () => {
            getpieValue();
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {

                var data = google.visualization.arrayToDataTable([
                    ['Task', 'First Time vs Repeat'],
                    ['First Time', $scope.new],
                    ['Repeat', $scope.old]
                ]);

                var options = {
                    label: { position: 'bottom' },
                    title: ''
                };

                var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                chart.draw(data, options);
            }
        };
        function findChartWidth() {
            if ($window.innerWidth > 768) {
                $scope.chartwidth = $window.innerWidth - 300;
            }
            else if ($window.innerWidth < 768 && $window.innerWidth > 500) {
                $scope.chartwidth = $window.innerWidth - 150;
            }
            else {
                $scope.chartwidth = $window.innerWidth - 100;
            }
        }
        findChartWidth();
        $scope.getSalesBarValue = (mindate, maxdate) => {
            if (mindate.includes('/') && maxdate.includes('/')) {
                // console.log("MINDATE", mindate, "MAXDATE", maxdate);
                var min = mindate.split('/');
                var date1 = min[1];
                var month1 = min[0];
                var year1 = min[2];
                var from = year1 + '-' + month1 + '-' + date1;
                var max = maxdate.split('/');
                var date2 = max[1];
                var month2 = max[0];
                var year2 = max[2];
                var to = year2 + '-' + month2 + '-' + date2;
                // console.log(from, "FROM", to, "TO");
                var pr = dashboard.getSalesBar(token, from, to);
                pr.then(success, fail);
                function success(data) {
                    $scope.salesbar = data.data.sales;
                    $scope.getSalesbar(mindate, maxdate);
                }
                function fail(err) {
                    $scope.errsb = err;
                }
            }
        };
        $scope.getSalesbar = (mind, maxd) => {
            $scope.mindates = mind;


            google.charts.load('current', { packages: ['corechart', 'bar'] });
            google.charts.setOnLoadCallback(drawBasic);

            function drawBasic() {
                $scope.maxdates = maxd;
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Date');
                data.addColumn('number', 'Sales');


                if ($scope.salesbar) {
                    for (let i = 0; i < $scope.salesbar.length; i++) {
                        var dates = [];
                        dates = $scope.salesbar[i].date.split('-');
                        var year = dates[0];
                        var month = dates[1];
                        var date = dates[2];
                        data.addRow([new Date(year, month - 1, date), $scope.salesbar[i].sum]);
                    }
                }
                var options = {
                    title: '',
                    hAxis: {
                        title: '',
                        gridlines: { count: 4 },
                        viewWindow: {
                            // min: new Date(itemsyear, itemsmonth2-1, itemsdate2),
                            // max: new Date(itemsyear, itemsmonth-1, itemsdate)
                            min: new Date(mind),
                            max: new Date(maxd)
                        }
                    },
                    vAxis: {
                        title: 'Sales'
                    },
                    bar: {
                        groupWidth: 15
                    },
                    'width': $scope.chartwidth,
                    'height': 250
                };

                var chart = new google.visualization.ColumnChart(
                    document.getElementById('chart_div0'));

                chart.draw(data, options);
            }
            $scope.maxdates = maxd;
        }


        // $scope.getSalesbar=(mind,maxd)=>{
        //   // $scope.getVisitsBarValue(mind,maxd);
        //   google.charts.load('current', {packages: ['corechart', 'bar']});
        //   google.charts.setOnLoadCallback(drawBasic);

        //   // $scope.newdate= new Date();
        //   //     // console.log("DATE IS -=-=-=-" , $scope.newdate);
        //   //     var itemdate = $filter('date')($scope.newdate, "dd-MM-yyyy");
        //   //     // console.log("DATE IS -=-=-=-" , itemdate);


        //   //     var itemdates = itemdate.split('-');
        //   //     var itemsdate=itemdates[0];
        //   //     var itemsmonth = itemdates[1];
        //   //     var itemsyear = itemdates[2];
        //   //     if(itemsdate<=10){
        //   //       var itemsmonth2=itemsmonth-1;
        //   //       if(itemsdate>5){
        //   //       var itemsdate2=30-itemsdate;}
        //   //       else{
        //   //        var itemsdate2=25-itemsdate;
        //   //       }
        //   //     }
        //   //     else{
        //   //       itemsmonth2=itemsmonth;
        //   //       itemsdate2="01";
        //   //     }
        //   // $scope.getDatesForGraphs();
        //   // $timeout(function(){
        //   //   for(let i=0;i<100000;i++){}
        //   // },2000);

        //   function drawBasic() {

        //         var data = new google.visualization.DataTable();
        //         data.addColumn('date', 'Date');
        //         data.addColumn('number', 'Sales');


        //         // console.log($scope.visitsbar+"-=-=-=-=-=-=-=-=-=-=-= VISIT BAR");  

        //         if($scope.salesbar){        
        //       for(let i=0;i<$scope.salesbar.length;i++){

        //         var dates = [];
        //         dates = $scope.salesbar[i].date.split('-');
        //         var year=dates[0];
        //         var month = dates[1];
        //         var date = dates[2];  
        //         data.addRow([new Date(year, month-1, date),$scope.salesbar[i].count]);
        //       }
        //     }

        //         var options = {
        //           title: '',
        //           hAxis: {
        //             title: '',
        //             viewWindow: {
        //               min: new Date(mind),
        //               max: new Date(maxd)
        //             }
        //           },
        //           vAxis: {
        //             title: 'Sales'
        //           },
        //           bar: {
        //             groupWidth: 15
        //         },
        //           'width': $scope.chartwidth,
        //           'height': 250
        //         };

        //         var chart = new google.visualization.ColumnChart(
        //           document.getElementById('chart_div0'));

        //         chart.draw(data, options);
        //       }

        // }






        $scope.getSalesBarValue($scope.mindates, $scope.maxdates);
        $scope.getpie();


        $scope.getVisitsBarValue = (minvisitdate, maxvisitdate) => {
            var min = minvisitdate.split('/');
            var date1 = min[1];
            var month1 = min[0];
            var year1 = min[2];
            var from = year1 + '-' + month1 + '-' + date1;
            var max = maxvisitdate.split('/');
            var date2 = max[1];
            var month2 = max[0];
            var year2 = max[2];
            var to = year2 + '-' + month2 + '-' + date2;
            // console.log("FROM is ",from," To is ",to);
            var pr = dashboard.getVisitsBar(token, from, to);
            pr.then(success, fail);
            function success(data) {
                $scope.visitsbar = data.data.visits;
                // console.log($scope.visitsbar,"-=-=-=-=-=-=-=-=-=-=-=-= Visits");
                $scope.getVisitbar(minvisitdate, maxvisitdate);
            }
            function fail(err) {
                $scope.errvb = err;
            }
        };




        $scope.getVisitbar = (mind, maxd) => {
            // $scope.getVisitsBarValue(mind,maxd);
            $scope.minvisitdates = mind;
            google.charts.load('current', { packages: ['corechart', 'bar'] });
            google.charts.setOnLoadCallback(drawBasic);

            // $scope.newdate= new Date();
            //     // console.log("DATE IS -=-=-=-" , $scope.newdate);
            //     var itemdate = $filter('date')($scope.newdate, "dd-MM-yyyy");
            //     // console.log("DATE IS -=-=-=-" , itemdate);


            //     var itemdates = itemdate.split('-');
            //     var itemsdate=itemdates[0];
            //     var itemsmonth = itemdates[1];
            //     var itemsyear = itemdates[2];
            //     if(itemsdate<=10){
            //       var itemsmonth2=itemsmonth-1;
            //       if(itemsdate>5){
            //       var itemsdate2=30-itemsdate;}
            //       else{
            //        var itemsdate2=25-itemsdate;
            //       }
            //     }
            //     else{
            //       itemsmonth2=itemsmonth;
            //       itemsdate2="01";
            //     }
            // $scope.getDatesForGraphs();
            // $timeout(function(){
            //   for(let i=0;i<100000;i++){}
            // },2000);

            function drawBasic() {

                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Date');
                data.addColumn('number', 'Visits');


                // console.log($scope.visitsbar+"-=-=-=-=-=-=-=-=-=-=-= VISIT BAR");  

                if ($scope.visitsbar) {
                    for (let i = 0; i < $scope.visitsbar.length; i++) {

                        var dates = [];
                        dates = $scope.visitsbar[i].date.split('-');
                        var year = dates[0];
                        var month = dates[1];
                        var date = dates[2];
                        data.addRow([new Date(year, month - 1, date), $scope.visitsbar[i].count]);
                    }
                }

                var options = {
                    title: '',
                    hAxis: {
                        title: '',
                        gridlines: { count: 4 },
                        viewWindow: {
                            min: new Date(mind),
                            max: new Date(maxd)
                        }
                    },
                    vAxis: {
                        title: 'Visits'
                    },
                    bar: {
                        groupWidth: 15
                    },
                    'width': $scope.chartwidth,
                    'height': 250
                };

                var chart = new google.visualization.ColumnChart(
                    document.getElementById('chart_div2'));

                chart.draw(data, options);
            }
            $scope.maxvisitdates = maxd;
        }


        $scope.getVisitsBarValue($scope.minvisitdates, $scope.maxvisitdates);





        $scope.getOrdersBarValue = (minorderdate, maxorderdate) => {
            var min = minorderdate.split('/');
            var date1 = min[1];
            var month1 = min[0];
            var year1 = min[2];
            var from = year1 + '-' + month1 + '-' + date1;
            var max = maxorderdate.split('/');
            var date2 = max[1];
            var month2 = max[0];
            var year2 = max[2];
            var to = year2 + '-' + month2 + '-' + date2;
            var pr = dashboard.getOrdersBar(token, from, to);
            pr.then(success, fail);
            function success(data) {
                $scope.ordersbar = data.data.cart_items;
                $scope.getOrderbar(minorderdate, maxorderdate);
                // console.log(JSON.stringify(data.data),"-=-=-=-=-=-=-=-=-=-=-=-= ORders");
            }
            function fail(err) {
                $scope.errob = err;
            }
        };




        $scope.getOrderbar = (mind, maxd) => {
            $scope.minorderdates = mind;
            google.charts.load('current', { packages: ['corechart', 'bar'] });
            google.charts.setOnLoadCallback(drawBasic);

            // $scope.newdate= new Date();
            //     // console.log("DATE IS -=-=-=-" , $scope.newdate);
            //     var itemdate = $filter('date')($scope.newdate, "dd-MM-yyyy");
            //     // console.log("DATE IS -=-=-=-" , itemdate);


            //     var itemdates = itemdate.split('-');
            //     var itemsdate=itemdates[0];
            //     var itemsmonth = itemdates[1];
            //     var itemsyear = itemdates[2];
            //     if(itemsdate<=10){
            //       var itemsmonth2=itemsmonth-1;
            //       if(itemsdate>5){
            //       var itemsdate2=30-itemsdate;}
            //       else{
            //        var itemsdate2=25-itemsdate;
            //       }
            //     }
            //     else{
            //       itemsmonth2=itemsmonth;
            //       itemsdate2="01";
            //     }

            // $scope.getDatesForGraphs();


            // $scope.getOrdersBarValue(mind,maxd);
            function drawBasic() {
                $scope.maxorderdates = maxd;
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Date');
                data.addColumn('number', 'Orders');


                // console.log($scope.ordersbar.length+"-=-=-=-=-=-=-=-=-=-=-=");   
                if ($scope.ordersbar) {
                    for (let i = 0; i < $scope.ordersbar.length; i++) {

                        var dates = [];
                        dates = $scope.ordersbar[i].date.split('-');
                        var year = dates[0];
                        var month = dates[1];
                        var date = dates[2];
                        data.addRow([new Date(year, month - 1, date), $scope.ordersbar[i].count]);
                    }
                }
                var options = {
                    title: '',
                    hAxis: {
                        title: '',
                        gridlines: { count: 4 },
                        viewWindow: {
                            min: new Date(mind),
                            max: new Date(maxd)
                        }
                    },
                    vAxis: {
                        title: 'Orders'
                    },
                    bar: {
                        groupWidth: 15
                    },
                    'width': $scope.chartwidth,
                    'height': 250
                };

                var chart = new google.visualization.ColumnChart(
                    document.getElementById('chart_div3'));

                chart.draw(data, options);
            }
            $scope.maxorderdates = maxd;
        }

        $scope.getOrdersBarValue($scope.minorderdates, $scope.maxorderdates);



        //     $scope.gettodBarValue=(mintoddate,maxtoddate)=>{
        //       var min = mintoddate.split('/');
        //       var date1=min[1];
        //       var month1=min[0];
        //       var year1=min[2];
        //       var from = year1+'-'+month1+'-'+date1;
        //       var max = maxtoddate.split('/');
        //       var date2=max[1];
        //       var month2=max[0];
        //       var year2=max[2]; 
        //       var to = year2+'-'+month2+'-'+date2;
        //       console.log("FROM is ",from," To is ",to);
        //       var pr = dashboard.gettodBar(token,from,to);
        //       pr.then(success,fail);
        //       function success(data){
        //         $scope.todbar = data.data.visits;
        //         // console.log($scope.visitsbar,"-=-=-=-=-=-=-=-=-=-=-=-= Visits");
        //         $scope.gettodbar(mintoddate,maxtoddate);
        //       }
        //       function fail(err){
        //         $scope.errtodb = err;
        //       } 
        //     };




        //     $scope.gettodbar=(mind,maxd)=>{
        //       // $scope.getVisitsBarValue(mind,maxd);
        //       google.charts.load('current', {packages: ['corechart', 'bar']});
        //       google.charts.setOnLoadCallback(drawBasic);



        //       function drawBasic() {

        //             var data = new google.visualization.DataTable();
        //             data.addColumn('date', 'Date');
        //             data.addColumn('number', 'Visits');


        //             // console.log($scope.visitsbar+"-=-=-=-=-=-=-=-=-=-=-= VISIT BAR");  

        //             if($scope.todbar){        
        //           for(let i=0;i<$scope.todbar.length;i++){

        //             var dates = [];
        //             dates = $scope.todbar[i].date.split('-');
        //             var year=dates[0];
        //             var month = dates[1];
        //             var date = dates[2];  
        //             // data.addRow([new Date(year, month-1, date),$scope.todbar[i].count]);
        //           }
        //         }

        //         data.addRows([
        //           ['Morning (before 12PM)', 11],
        //           ['Afternoon (12PM - 4PM)', 2],
        //           ['Evening (4PM - 7PM)', 2],
        //           ['Dinner (after 7PM)', 2]
        //         ]);

        //             var options = {
        //               title: '',
        //               hAxis: {
        //                 title: '',
        //                 viewWindow: {
        //                   min: new Date(mind),
        //                   max: new Date(maxd)
        //                 }
        //               },
        //               vAxis: {
        //                 title: 'Time Of Day'
        //               },
        //               bar: {
        //                 groupWidth: 15
        //             },
        //               'width':
        //               'height': 250
        //             };

        //             var chart = new google.visualization.ColumnChart(
        //               document.getElementById('chart_div4'));

        //             chart.draw(data, options);
        //           }

        //     }

        // $scope.gettodBarValue($scope.mintoddates,$scope.maxtoddates);










        // 
        // resizeGraphs();



        //   angular.element($window).bind('resize', function(){
        //     if($window.innerWidth>768){
        //       $scope.chartwidth=$window.innerWidth-400;
        //     }
        // }); 



        var page_no = 1;
        $scope.edit_msg = "";
        var sid;
        var flag = true;
        $scope.lodRip = false;
        $scope.cancelBtn = true;
        $scope.loadMore_c = false;
        $scope.BTN = "Edit";

        $scope.visit = () => {
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
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }

        function getDate(data) {
            var date = new Date(data);
            var day = date.getDate(); //Date of the month: 2 in our example
            var month = date.getMonth() + 1; //Month of the Year: 0-based index, so 1 in our example
            var year = date.getFullYear();
            if (month < 10) {
                month = "0" + month;
            }
            return day + "/" + month + "/" + year;
        }

        $scope.storeDelivery = () => {
            dashboard.StoreItems(token).then(data => {
                $scope.deliveries = data.data;
                // console.log($scope.deliveries);
                $scope.lodRip = true;
            });
        }

        $scope.openMe = () => {
            // console.log("running function openMe : ", token);
            dashboard.PaymentCall(token).then((data) => {
                for (var i = 0; i < data.data.length; i++) {
                    var ele = getDate(data.data[i].timestamp) + " & " + formatAMPM(data.data[i].timestamp);
                    data.data[i].timestamp = ele;
                }
                $scope.payment = data.data;
            })
            dashboard.StoreWallet(token).then(data => {
                $scope.wallet = data.data;
            });
            // for(var i=0;i<20;i++){
            // $scope.payment.push({id: i, amount: 1000*i, paid_on: "2018-01-11T12:30:00Z", store: 78});
            // }
        };
        function showMeData() {
            var promise = business.callBusiness(token);
            promise.then((data) => {
                sid = data[0].id;
                $scope.categories = data[0].CategoriesAvailable;
                // console.log(sid);
                $scope.openMe();
                $scope.getProduct();
            }, (err) => {
                console.error(err);
            });
        }

        showMeData();

        $scope.products = [];

        $scope.getProduct = () => {
            var promise = dashboard.getProduct(page_no, token);
            promise.then((data) => {
                // console.log(data);
                if (data.next == null) {
                    flag = false;
                    $scope.loadMore_c = true;
                }

                for (var i = 0; i < data.results.length; i++) {
                    if (data.results[i].ProductImage == null) {
                        // data.results[i].ProductImage = data.results[i].Store.StoreLogo;
                        data.results[i].ProductImage = "";
                        data.results[i].msg = "";
                    }
                    data.results[i].disable = true;
                }
                if (data.previous == null) {
                    $scope.products = data.results;
                }
                else {
                    data.results.forEach(function (element) {
                        $scope.products.push(element);
                    }, this);
                }
                console.log($scope.products);
                $scope.tempProducts = $scope.products;
            }, (err) => {
                console.error("err");
            });
        };


        $scope.searchProVal = "";
        $scope.searchPro = () => {
            var x;
            var len = $scope.searchProVal.length;
            $scope.productsSer = [];
            if (len == 0) {
                $scope.getProduct();
                $scope.searchMsg = "";
                $scope.showProducts = true;
                x = document.querySelectorAll(".banner_prod.main");
                for (let i = 0; i < x.length; i++) {
                    x[i].style.display = "block";
                }
            } else {
                $scope.products.forEach(element => {
                    if ((element.name.slice(0, len)).toLowerCase() == ($scope.searchProVal).toLowerCase()) {
                        $scope.productsSer.push(element);
                    }
                });
                if ($scope.productsSer.length == 0) {
                    $scope.searchMsg = "No Products found";
                } else {
                    $scope.searchMsg = $scope.productsSer.length + " item(s) found.";
                }
                $scope.showProducts = false;
                x = document.querySelectorAll(".banner_prod.main");
                for (let i = 0; i < x.length; i++) {
                    x[i].style.display = "none";
                }
            }
        }

        $scope.edit = (product) => {
            $scope.BTN = "Save";
            product.disable = false;
        }

        $scope.cancelEdit = (product) => {
            product.disable = true;
        }

        $scope.save = (product) => {
            var obj = {
                ProductName: product.ProductName,
                MRP: product.MRP,
                Price: product.Price,
                Category: product.Category,
                Features: product.Features,
                Active: product.Active
            }
            dashboard.editProduct(obj, product.id, token).then((data) => {
                if (data.id) {
                    product.msg = "Product saved.";
                    $scope.cancelEdit(product);
                }
            })
        };

        loadMoreData();
        function loadMoreData() {
            window.angular.element($window).bind('scroll', function () {
                if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                    $scope.loadMore();
                }
            });
        };

        $scope.loadMore = () => {
            if (flag) {
                page_no = page_no + 1;
                $scope.getProduct();
            }

        }

        $scope.LoadMoreProducts = () => {
            $scope.loadMore();
        }

        $scope.payd = {};

        $scope.addMoney = () => {
            // open popup to enter and validate amount
            var a = prompt('Enter amount to add..');
            // hit the payment detail api
            if (!isNaN(a)) {
                payment.genHash({ amount: a, account_type: "store" }, token)
                    .then(
                        function (data) {
                            console.log(data.data);
                            $scope.payd.key = data.data.key;
                            $scope.payd.firstname = data.data.firstname;
                            $scope.payd.email = data.data.email;
                            $scope.payd.amount = data.data.amount.toFixed(1);
                            $scope.payd.hash = data.data.hash;
                            $scope.payd.productinfo = data.data.productinfo;
                            $scope.payd.phone = data.data.phone;
                            $scope.payd.txnid = data.data.txnid;
                            $scope.payd.surl = `https://share.halanx.com/vTransactionEvent/store/add-money/?status=done&transaction_id=${data.data.txnid}&amount=${data.data.amount}`;
                            $scope.payd.furl = 'https://share.halanx.com/vTransactionEvent/store/add-money/?status=no';
                            var form = document.createElement('form');
                            form._submit_function_ = form.submit;

                            form.setAttribute('method', 'POST');
                            form.setAttribute('action', data.data.action);
                            for (var key in $scope.payd) {
                                var hiddenField = document.createElement('input');
                                hiddenField.setAttribute('type', 'hidden');
                                hiddenField.setAttribute('name', key);
                                hiddenField.setAttribute('value', $scope.payd[key]);
                                form.appendChild(hiddenField);
                            }
                            document.body.appendChild(form);
                            form._submit_function_(); // Call the renamed function.
                            console.log($scope.payd);
                        },
                        function (err) { console.log('hi', err); }
                    );
            }
            else {
                alert('Please enter a valid amount.');
            }
            // submit form and redirect to same page with money added success/failure popup
            console.log('add money');
        }

        $scope.withdrawMoney = () => {
            var a = prompt('Enter amount to withdraw (INR 100 Balance is mandatory)..');
            a = parseFloat(a);
            if (!isNaN(a)) {
                // hit api and display message and reduce wallet balance
                console.log('withdraw money');
                payment.withdrawMoneyStore({ amount: a }, token)
                    .then(
                        function (data) {
                            // console.log(data.data);
                            alert(data.data.detail);
                        },
                        function (err) {
                            alert(err.data.error);
                            console.log(err.data);
                        }
                    );
            }
            else {
                alert('Please enter a valid amount.');
            }
        }

        $scope.getVouchers = () => { //ye function load kb kr rha h?  voucher pr click ok
            getVoucherStats();
            getVoucherOffers();
            $scope.nodat = true;
            $scope.nooff = true;
            var pr = dashboard.getVoucher(token);
            pr.then(success, fail);
            function success(data) {
                if (data.data.results.length == 0) {
                    $scope.nodat = true;
                }
                else {
                    $scope.nodat = false;

                    //  $scope.resul = data.data;
                    //  console.log($scope.resul);
                    //  $scope.resul.forEach(element => {
                    //    console.log(element.timestamp.getDate());
                    //   element.timestamp=getDate(element.timestamp);
                    // });

                    for (let i = 0; i < data.data.results.length; i++) {
                        data.data.results[i].timestamp = getDate(data.data.results[i].timestamp);
                    }
                    $scope.result = data.data;
                }
                //  console.log("---------------",data);
            }
            function fail(err) {
                $scope.error = err;
            }
        };

        function getVoucherOffers() {
            var pr = dashboard.getVoucherOffers(token);
            pr.then(success, fail);
            function success(data) {
                if (data.data.results.length == 0) {
                    $scope.nooff = true;
                }
                else {
                    $scope.nooff = false;
                    $scope.offers = data.data;
                    // console.log("VOICHER OFFERS", data.data);
                }
            }
            function fail(err) {
                $scope.erroff = err;
            }
        }

        function getVoucherStats() {

            var pr = dashboard.getVoucherStats(token);
            pr.then(success, fail);
            function success(data) {
                $scope.vstats = data.data;
            }
            function fail(err) {
                $scope.errstats = err;
            }
        };

        $scope.checkCode = () => {
            if ($scope.voucherCode) {
                // console.log($scope.voucherCode);
                var pr = dashboard.getVoucherRedeemed($scope.voucherCode, token);
                pr.then(success, fail);
                function success(data) {
                    $score.cantRedeem = false;
                    angular.element(document.querySelector('.redeeming')).attr('data-toggle', 'modal');
                    angular.element(document.querySelector('.redeeming')).attr('data-target', '#myModal');
                    $scope.redeemIt = data.data;
                }
                function fail(err) {
                    $scope.errredeem = err;
                    if (err.data.error = "voucher item does not exist") {
                        $scope.cantRedeem = true;
                    }
                }
            }
        };

        function initMap(lati, long) {
            // The location of Uluru
            var uluru = { lat: lati, lng: long };
            // The map, centered at Uluru
            var map = new google.maps.Map(
                document.getElementById('map'), { zoom: 15, center: uluru });
            // The marker, positioned at Uluru
            var marker = new google.maps.Marker({ position: uluru, map: map });
        }

        $scope.getProfile = () => {
            console.log("Inside getprofile");
            getPlaceMenu($scope.store);
            getTimings($scope.store);
            getPics($scope.store);
            getMembers($scope.store);
            getPlaceStats($scope.store);
            //console.log("--------------"+$scope.store);
            var pr = dashboard.getOutletDetails($scope.store, token);
            pr.then(success, fail);
            function success(data) {
                $scope.prof = data.data;
                // console.log($scope.prof);
                initMap($scope.prof.latitude, $scope.prof.longitude);
                // console.log("Profile is this", $scope.prof)
                $scope.tophome = data.data;
                $scope.coverpic = data.data.cover_pic_url;
            }
            function fail(err) {
                $scope.errprof = err;
                $scope.errth = err;
            }
        };

        $scope.getTopProfileLoad = (id) => {
            // loadStore();
            getPlaceMenu(id);
            getTimings(id);
            getPics(id);
            getMembers(id);
            getPlaceStats(id);
            var pr = dashboard.getOutletDetails(id, add);
            pr.then(success, fail);
            function success(data) {
                $scope.prof = data.data;

                initMap($scope.prof.latitude, $scope.prof.longitude);
                $scope.tophome = data.data;
                $scope.coverpic = data.data.cover_pic_url;
            }
            function fail(err) {
                $scope.errprof = err;
                $scope.errth = err;
            }
        };

        $timeout(function () {
            $scope.getProfile();
            $scope.loadStoreDetails();
        }, 1000);

        function getPlaceMenu(store) {
            var pr = dashboard.getPlaceMenu(store, add);
            pr.then(success, fail);
            function success(data) {
                $scope.prof = data.data;
            }
            function fail(err) {
                $scope.errprof = err;
            }
        };

        function getTimings(store) {
            var pr = dashboard.getTimings(store, token);
            pr.then(success, fail);
            function success(data) {
                $scope.time = data.data;
            }
            function fail(err) {
                $scope.errtime = err;
            }
        };

        function getPics(store) {
            var pr = dashboard.getPics(store, token);
            pr.then(success, fail);
            function success(data) {
                $scope.pics = data.data;
            }
            function fail(err) {
                $scope.errpics = err;
            }
        }

        function getMembers(store) {
            var pr = dashboard.getMembers(store, token);
            pr.then(success, fail);
            function success(data) {
                $scope.members = data.data;
            }
            function fail(err) {
                $scope.errmem = err;
            }
        }

        function getPlaceStats(store) {
            var pr = dashboard.getStats(token, store);
            pr.then(success, fail);
            function success(data) {
                for (let i = 0; i < data.data.results.length; i++) {
                    for (let j = 0; j < data.data.results[i].post.comments.length; j++) {
                        data.data.results[i].post.comments[j].timestamp = getDate(data.data.results[i].post.comments[j].timestamp);
                    }
                }
                $scope.stats = data.data;
            }
            function fail(err) {
                $scope.errstat = err;
            }
        };

        $scope.addImage = () => {
            var pr = dashboard.addImage($scope.store, token);
            pr.then(success, fail);
            function success(data) {
                $scope.pics = data.data;
            }
            function fail(err) {
                $scope.errpics = err;
            }

            getPics();
        }

        $scope.detailsChanged = false;
        $scope.timeChanged = false;
        $scope.highChanged = false;
        $scope.editHighlights = () => {
            var obj = {};
            obj.highlights = $scope.prof.highlights;
            var pr = dashboard.editOutletDetails(obj, $scope.store, token);
            pr.then(success, fail);
            $timeout(function () {
                $scope.highChangedval = "";
            }, 3000);
            function success(data) {
                $scope.highChanged = true;
                $scope.highChangedval = "Successfully added!";
            }
            function fail(err) {
                $scope.highChanged = true;
                $scope.highChangedval = "Error in Editing, Please try again";
            }
        }

        $scope.editDetails = () => {
            //  var value = [$scope.prof];
            //  console.log(value);
            // value=[value];
            var obj = {};
            obj.name = $scope.prof.name;
            obj.about = $scope.prof.about;
            obj.phone_no = $scope.prof.phone_no;
            obj.street_address = $scope.prof.street_address;
            obj.pincode = $scope.prof.pincode;
            obj.city = $scope.prof.city;
            obj.state = $scope.prof.state;
            // console.log(value);
            var pr = dashboard.editOutletDetails(obj, $scope.store, token);
            pr.then(success, fail);
            $timeout(function () {
                $scope.detailsChangedval = "";
            }, 3000);
            function success(data) {
                $scope.detailsChanged = true;
                $scope.detailsChangedval = "Successfully Changed";
            }
            function fail(err) {
                $scope.detailsChanged = true;
                $scope.detailsChangedval = "Error in changing, Please try again";
            }
        };

        $scope.editTime = (value) => {
            value = [value];
            // console.log(value);
            var pr = dashboard.editTime(value, $scope.store, token);
            pr.then(success, fail);
            function success(data) {
                $scope.timeChanged = true;
                // $scope.colorClass = 1;
                $scope.timeChangedval = "Successfully Changed";
            }
            function fail(err) {
                $scope.timeChanged = true;
                // $scope.colorClass = 0;
                $scope.timeChangedval = "Error in changing, Please try again";
            }
        }

        $scope.loadStoreDetails = () => {
            $scope.getTopProfiles();
            var pr = dashboard.loadStore(token);
            pr.then(success, fail);
            function success(data) {
                $scope.storeDetails = data;
            }
            function fail(err) {
                $scope.errsd = err;
            }
        };
        $scope.topone;
        $scope.getTopProfiles = () => {
            var pr = dashboard.getTop(token);
            pr.then(success, fail);
            function success(data) {
                // if($scope.topProfiles.length!=data.data.results.length){

                $scope.topProfiles = data.data.results;
                // console.log("INSIDE TOP PROFILE ISNIDE DOUBLE", $scope.topProfiles.length, data.data.results.length);

                // }
                // console.log("inside top profiles", $scope.topProfiles);
                if (!$scope.topone) {
                    $scope.topone = $scope.topProfiles[0];
                }
                // console.log($scope.topProfiles);
                // $scope.topProfiles.push($scope.topProfiles);
                // console.log($scope.topProfiles);
                // if(data.data.next)

                // if(data.data.next){
                //   getTopUrl(data.data.next);
                // }
                angular.element(document.querySelector('.activate'))[0].classList.add('active');
            }
            function fail(err) {
                $scope.errtp = err;
            }
        }

        $scope.getBusiness = () => {
            getROI();
            getWalletAmt();
            getSales();
            var pr = dashboard.getStoreStats(token);
            pr.then(success, fail);
            function success(data) {
                $scope.Business = data.data;
                console.log("--------", $scope.Business.rating.avg, "--------");
                calculateProgress();
            }
            function fail(err) {
                $scope.errsd = err;
                console.log("ERRORERRORERRORERROR")
            }
        }

        function calculateProgress() {
            var sum = 0;
            for (let i = 1; i < 6; i++) {
                if ($scope.Business.rating.list[i]) {
                    sum += $scope.Business.rating.list[i];
                }
                else {
                    sum += 0;
                }
            }
            $scope.p1 = $scope.Business.rating.list[1] / sum * 100;
            $scope.p2 = $scope.Business.rating.list[2] / sum * 100;
            $scope.p3 = $scope.Business.rating.list[3] / sum * 100;
            $scope.p4 = $scope.Business.rating.list[4] / sum * 100;
            $scope.p5 = $scope.Business.rating.list[5] / sum * 100;

            if (!$scope.p1) {
                $scope.p1 = 0 + "%";
                $scope.v1 = 0;
            }
            else {
                $scope.v1 = $scope.p1;
                $scope.p1 = $scope.p1 + "%";
            }
            if (!$scope.p2) {
                $scope.p2 = 0 + "%";
                $scope.v2 = 0;
            }
            else {
                $scope.v2 = $scope.p2
                $scope.p2 = $scope.p2 + "%";;
            }
            if (!$scope.p3) {
                $scope.p3 = 0 + "%";
                $scope.v3 = 0;
            }
            else {
                $scope.v3 = $scope.p3;
                $scope.p3 = $scope.p3 + "%";
            }
            if (!$scope.p4) {
                $scope.p4 = 0 + "%";
                $scope.v4 = 0;
            }
            else {
                $scope.v4 = $scope.p4;
                $scope.p4 = $scope.p4 + "%";
            }
            if (!$scope.p5) {
                $scope.p5 = 0 + "%";
                $scope.v5 = 0;
            }
            else {
                $scope.v5 = $scope.p5;
                $scope.p5 = $scope.p5 + "%";
            }

        }

        function getROI() {
            var pr = dashboard.getROI(token);
            pr.then(success, fail);
            function success(data) {
                $scope.roi = data.data.roi;
            }
            function fail(err) {
                $scope.errroi = err;
            }
        };

        function getWalletAmt() {
            var pr = dashboard.getWalletAmt(token);
            console.warn("getting wallet amount");
            pr.then(success, fail);
            function success(data) {
                $scope.walletAmt = data.data.balance;
            }
            function fail(err) {
                $scope.erramt = err;
            }
        }

        function getSales() {
            var pr = dashboard.getWalletAmt(token);
            pr.then(success, fail);
            function success(data) {
                $scope.sales = data.data;
            }
            function fail(err) {
                $scope.errsales = err;
            }
        }
        $scope.noti = [];
        $scope.getNot = () => {
            var i = 0;
            var pr = dashboard.getNot(token);
            pr.then(success, fail);
            function success(data) {
                // data.data.forEach(element => {
                //   element.timestamp=element.timestamp.toDateString();
                // });
                for (let i = 0; i < data.data.results.length; i++) {
                    data.data.results[i].timestamp = getDate(data.data.results[i].timestamp);
                }
                $scope.noti[i] = data.data;
                while ($scope.noti[i].next) {
                    var pr = dashboard.getNoturl($scope.noti[i].next, token);
                    i++;
                    pr.then(success, fail);
                    function success(data) {
                        // data.data.forEach(element => {
                        //   element.timestamp=element.timestamp.toDateString();
                        // });
                        for (let i = 0; i < data.data.results.length; i++) {
                            data.data.results[i].timestamp = getDate(data.data.results[i].timestamp);
                        }
                        $scope.noti[i] = data.data;
                    }
                    function fail(err) {
                        $scope.errnoti = err;
                    }
                }
            }
            function fail(err) {
                $scope.errnoti = err;
            }
        };

        $scope.showedit = false;
        $scope.Verify = () => {

            if (!$scope.mem.name || $scope.mem.name.length < 4) {
                $scope.errorinedit = "Name is not valid";
                $scope.showedit = true;
                return;
            }
            if (!$scope.mem.role) {
                $scope.errorinedit = "Please specify the Role";
                $scope.showedit = true;
                return;
            }
            if (!$scope.mem.phone || $scope.mem.phone.length != 10 || !$scope.mem.phone.match(/^\d{10}$/)) {
                // console.log($scope.phonev);
                // console.log($scope.phonev.length);
                // console.log($scope.phonev.match(/^\d{10}$/));
                $scope.errorinedit = "Phone Number is not valid";
                $scope.showedit = true;
                return;
            }
            if (!$scope.mem.email || !$scope.mem.email.includes("@") || !$scope.mem.email.includes(".")) {
                $scope.errorinedit = "Email is not valid";
                $scope.showedit = true;
                return;
            }
            // console.log($scope.memv);
            AddMember();
        }
        $scope.triedAdding = false;
        function AddMember() {
            var pr = dashboard.AddMember(token, $scope.mem);
            pr.then(success, fail);
            function success(data) {
                $scope.addm = data.data;
                $scope.triedAdding = true;
                $scope.whathpn = "Successfully Added";
                getMembers();
            }
            function fail(err) {
                $scope.erraddm = err;
                $scope.triedAdding = true;
                $scope.whathpn = "Please Try Again";
            }
        };

        $scope.dateConvert = (date) => {
            var dates = date.split('/');
            var day = dates[0];
            var month = dates[1];
            var year = dates[2];
            var d = new Date();
            var y = d.getFullYear();
            var m = d.getMonth();
            var da = d.getDate();
            var ye = y > year ? y - year : year - y;
            if (ye) {
                return ye + ' year(s) ago';
            }
            // d.setMonth(d.getMonth() - 1);
            var mo = m > month ? m - month : month - m;
            if (mo) {
                return mo + ' month(s) ago';
            }
            var dat = da > day ? da - day : day - da;
            if (dat) {
                return dat + ' day(s) ago';
            }

        }

        //   $scope.add = function() {
        //     var f = document.getElementById('file').files[0],
        //         r = new FileReader();
        //         console.log(f);
        //   console.log(r);
        //     r.onloadend = function(e) {
        //       var data = e.target.result;
        //       console.log(data);
        //       var pr = $q.defer();
        //       var url = "https://api.halanx.com/places/place/"+$scope.store+"/menu/";
        //       $http.post(url,{data:f},{
        //         headers:{
        //           'Authorization':'Token '+'0d82010691295e6a779560dd06e9213eebaaed15',
        //           "Cache-Control": "no-cache",
        //           "contentType" : false,
        //           "mimeType": "multipart/form-data"
        //         }
        //       }).then(success,fail);
        //       function success(data){
        //         pr.resolve(data);
        //       }
        //       function fail(err){
        //         pr.reject(err);
        //       }
        //       //send your binary data via $http or $resource or do anything else with it
        //     }

        //     r.readAsBinaryString(f);
        // }

        //   $scope.getFileDetails = function (e) {

        //     $scope.files = [];
        //     $scope.$apply(function () {

        //         // STORE THE FILE OBJECT IN AN ARRAY.
        //         for (var i = 0; i < e.files.length; i++) {
        //             $scope.files.push(e.files[i])
        //         }

        //     });
        // };


        $scope.uploadFiles = function () {
            var data = new FormData();
            data.append("image", $scope.mimage);
            console.log($scope.mimage);
            console.log(data);
            dashboard.uploadMenuImages("https://api.halanx.com/places/place/" + $scope.store + "/menu/", data, token).then(function (data) {
                alert("Image Uploaded Successfully!");
                console.log(data);
                getPics($scope.store);

            })
        }

        // // UPDATE PROGRESS BAR.
        // function updateProgress(e) {
        // 	if (e.lengthComputable) {
        // 		document.getElementById('pro').setAttribute('value', e.loaded);
        // 		document.getElementById('pro').setAttribute('max', e.total);
        // 	}
        // }

        // // CONFIRMATION.
        // function transferComplete(e) {
        // 	alert("Files uploaded successfully.");
        // }

        $scope.publishSponsoredPost = function () {
            // data.append("uploadedFile", $scope.filess);
            var data = {
                content: $scope.spopost,
                distance: "100"
            }

            dashboard.PostRequest('https://api.halanx.com/posts/sponsored/create/', data, token).then(function (data) {
                alert("Published!");
            })
        }

        $scope.editted = false;
        $scope.EditTeam = (id, data) => {
            // console.log(data);
            var pr = dashboard.EditTeam(token, id, data);
            pr.then(success, fail);
            function success(data) {
                $scope.editeam = data.data;
                $scope.editted = true;
                $scope.whatedit = "Successfully Changed";
            }
            function fail(err) {
                $scope.erreddteam = err;
                $scope.editted = true;
                $scope.whatedit = "Please Try Again";
            }
        }

        var datevar, monthvar;
        $scope.getWalletSummary = () => {
            // console.log($scope.monthly);
            checkMonth();

            var pr = dashboard.getWalletSumm(token, monthvar, datevar);
            pr.then(success, fail);
            function success(data) {
                $scope.wallet = data.data;
            }
            function fail(err) {
                $scope.errw = err;
            }
        }


        function checkMonth() {


            if ($scope.monthly == "Jan") {
                monthvar = '01';
                datevar = '31';
            }
            if ($scope.monthly == "Feb") {
                monthvar = '02';
                datevar = '28';
            }
            if ($scope.monthly == "Mar") {
                monthvar = '03';
                datevar = '31';
            }
            if ($scope.monthly == "Apr") {
                monthvar = '04';
                datevar = '30';
            }
            if ($scope.monthly == "May") {
                monthvar = '05';
                datevar = '31';
            }
            if ($scope.monthly == "June") {
                monthvar = '06';
                datevar = '30';
            }

            if ($scope.monthly == "July") {
                monthvar = '07';
                datevar = '31';
            }

            if ($scope.monthly == "Aug") {
                monthvar = '08';
                datevar = '31';
            }

            if ($scope.monthly == "Sep") {
                monthvar = '09';
                datevar = '30';
            }

            if ($scope.monthly == "Oct") {
                monthvar = '10';
                datevar = '31';
            }

            if ($scope.monthly == "Nov") {
                monthvar = '11';
                datevar = '30';
            }

            if ($scope.monthly == "Dec") {
                monthvar = '12';
                datevar = '31';
            }
        }

        $scope.callActive = () => {
            angular.element(document.querySelector('#profile'))[0].parentElement.classList.add('active');
            angular.element(document.querySelector('#profile'))[0].setAttribute("aria-expanded", "true");
            // console.log("THIS IS ACTIVE",angular.element(document.querySelector('#profile')));
            angular.element(document.querySelector('#hom'))[0].parentElement.classList.remove('active');
            angular.element(document.querySelector('#hom'))[0].removeAttribute("aria-expanded");

        };

    });