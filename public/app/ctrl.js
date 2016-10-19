// Ctrl For Dash
app.controller('HomeCtrl', function($scope) {
    //
})

// Ctrl For Dash
app.controller('DashHomeCtrl', function($scope) {
    //
})


app.controller('DashJobCompleteCtrl', function($scope, $location, dashInstant) {
})

// Ctrl For Signup
app.controller('DashSignupCtrl', function($scope, $http, $rootScope, validation, $location, $localStorage) {
    $scope.user = {};
    /*$scope.user.businesstype = 'Business Type';
    $scope.bizType = {
        availableOptions: [
          {name: 'Business Type', dis: true},
          {name: 'Removal Company'},
          {name: 'Courier'},
          {name: 'Clearance'},
          {name: 'Logistics'}
        ],
    };*/

    $scope.register = function(){
        
        $location.path("/dash");
        
//        var valiOptions = [
//            {eleName: 'userFirstName', type: 'name', msg: 'Please enter a valid Firstname!'},
//            {eleName: 'userLastName', type: 'name', msg: 'Please enter a valid Lastname!'},
//            {eleName: 'userPhone', type: 'number', msg: 'Please enter a valid Mobile Number!'},
//            {eleName: 'userEmail', type: 'email', msg: 'Please enter a valid email address!'},
//            {eleName: 'userPassword', type: 'password', msg: 'Please enter a password!'}
//        ]
//        validation.checkVal(valiOptions, function(callback) {
//            if(callback > 0) {
//                return false
//            } else {
//                $http.post('/api/register', $scope.user)
//                .success(function(user){
//                    console.log(user);
//                    $rootScope.currentUser = user;
//                    if(user.success == false) {
//                        toastr.error(user.message);
//                    } else {
//                        $localStorage['token'] = user.data;
//                        $location.path('/dash');
//                        toastr.success('Login successful');
//                    }
//                });
//            }
//        })
    };
})

// Ctrl For Signup
app.controller('DashLoginCtrl', function($scope, $http, $rootScope, $location, $route, $localStorage, validation, user) {
    $scope.user = user;
    $scope.login = function(user, $event){
        var flag = 0;
        $event.preventDefault();
        user.dashTrack = 'dash';
        if(user.username.length > 0 ) {
            flag += 0;
        } else {
            toastr.error('Please input a username');
            flag += 1;
        }

        if(user.password && user.password.length > 0 ) {
            flag += 0;
        } else {
            toastr.error('Please input a password');
            flag += 1;
        }

        if(flag < 1) {
            $http.post('/api/login', user).then(function(response){
                console.log(response);
                if(response.data.success == true) {
                    $localStorage['token'] = response.data.data;
                    $location.url("/dash");
                    $rootScope.currentUser = user;
                    toastr.success(response.data.message);
                } else {
                    toastr.error(response.data.message);
                }
            });
        }
    };
})

// Ctrl For Dash
app.controller('DashInstantCtrl', function($scope, $location, dashInstant, dashVans, maps, $http, tdispatch, bookingGrab, bookings, misc, user, stripeForm, rates, items, dev, routeInfo) {

    $scope.itemBoxes = [
        {size: '', name: '', qty: ''}
    ];

    $scope.addItembox = function() {
        $scope.itemBoxes.push({
            size: '',
            name: '',
            qty: ''
        });
      console.log($scope.itemBoxes);
    }



    $scope.tester = function() {
        $scope.calcAlgo();
    }

    $scope.calcAlgo = function() {
        $scope.loadTime = 0;
        $scope.unloadTime = 0;
        $scope.totalCuft = 0;
        for(ti in $scope.itemBoxes) {
            var itemType = $scope.itemBoxes[ti].size;
            var itemQty = $scope.itemBoxes[ti].qty;
            var itemCuft = items[''+itemType+'']['cuFt'];
            $scope.loadTime = $scope.loadTime + (items[''+itemType+'']['loadTime'] * itemQty);
            console.log($scope.loadTime+' + '+ items[''+itemType+'']['loadTime']+' * '+itemQty);
            $scope.unloadTime = $scope.unloadTime + (items[''+itemType+'']['unloadTime'] * itemQty);
            $scope.totalCuft = $scope.totalCuft + (itemCuft * itemQty);
        }
        console.log($scope.loadTime);
        console.log($scope.unloadTime);
        console.log($scope.totalCuft);

        var rate = 0;
        for(rat in rates) {
            var minRange = rates[rat].minRange;
            var maxRange = rates[rat].maxRange;
            if($scope.totalCuft > minRange && $scope.totalCuft < maxRange) {
                var rate = rates[rat].rate;
            }
        }

        var driveTime = routeInfo.duration / 60;
        var fuelCost = (routeInfo.distance * 0.000621371192237) * .70;

        var totalTime = $scope.loadTime + $scope.unloadTime + driveTime;
        var workCost = totalTime * rate;
        $scope.totalCost = Math.ceil((workCost + fuelCost) * 10) / 10;
        $scope.dashInstant.estiCalc = $scope.totalCost;
    }

//    $scope.slider = $('.bslider').slider();
//    $scope.slider.slider('setValue', 1);

    var realTime = new Date();
    $('#job-date-picker').datetimepicker({
        format: 'dd-mm-yy hh:ii',
        startDate: realTime,
        initialDate: realTime,
        todayHighlight: true,
    });

    $scope.dashInstant = dashInstant;
    $scope.dashVans = dashVans;
    $scope.tdispatch = tdispatch;
    $scope.booking = bookings;
    $scope.misc = misc;
    $scope.stripeForm = stripeForm;

    // Set up autocomplete
    $scope.address = dashInstant.address;

    $scope.autocompleteOptions = {
        componentRestrictions: { country: 'uk' },
        types: ['geocode']
    }
    // Start GMaps
    maps.init();

    // Hide Picker When selected
    $('#job-date-picker').datetimepicker().on('changeDate', function(ev){
        $('#job-date-picker').datetimepicker('hide');
    });

    $scope.showWaypointField = function(type) {
        var waypointFields = $('[data-address-type="'+type+'"]').length;
        var hiddenWaypointFields = $('[data-address-type="'+type+'"].hide').length;
        var waypointId = (waypointFields - hiddenWaypointFields) + 2;
        $('[data-address-type="'+type+'"][data-address-id="'+waypointId+'"]').removeClass("hide");
    }

    $scope.reviewBooking = function() {
        $location.path("/checkout");
    }

    $scope.updateMaps = function() {
        if(dev.offline !== true) {
            if($scope.dashInstant.address.start_location.name.formatted_address) {
                $scope.dashInstant.address.start_location.lat =
                $scope.dashInstant.address.start_location.name.geometry.location.lat();
                $scope.dashInstant.address.start_location.lng =
                $scope.dashInstant.address.start_location.name.geometry.location.lng();
                $scope.dashInstant.address.start_location.name = $scope.dashInstant.address.start_location.name.formatted_address;
            }
            if($scope.address.end_location.name.formatted_address) {
                $scope.dashInstant.address.end_location.lat =
                $scope.dashInstant.address.end_location.name.geometry.location.lat();
                $scope.dashInstant.address.end_location.lng =
                $scope.dashInstant.address.end_location.name.geometry.location.lng();
                $scope.dashInstant.address.end_location.name = $scope.dashInstant.address.end_location.name.formatted_address;
            }
            if($scope.address.pickup1.formatted_address) {
                $scope.address.pickup1.name = $scope.address.pickup1.formatted_address;
            }
            if($scope.address.dropoff1.formatted_address) {
                $scope.address.dropoff1.name = $scope.address.dropoff1.formatted_address;
            }
            if($scope.address.pickup2.formatted_address) {
                $scope.address.pickup2.name = $scope.address.pickup2.formatted_address;
            }
            if($scope.address.dropoff2.formatted_address) {
                $scope.address.dropoff2.name = $scope.address.dropoff2.formatted_address;
            }
            if($scope.address.start_location.name !== '' && $scope.address.end_location.name !== '') {
                maps.setDirections($scope.address, function(distance) {
                    var tempMiles = 0.000621371192237 * distance;
                    $scope.dashInstant.fuelPrice = Math.round(tempMiles * 0.72);
                    $scope.algoCalc();
                    $scope.calcAlgo();
                });
            }
        }
    }

    $scope.algoCalc = function() {
        $scope.dashInstant.estiCalc = ($scope.vanHourlyPrice * $scope.dashInstant.jobHoursEsti) + $scope.dashInstant.fuelPrice;
        dashInstant.estiCalc = $scope.dashInstant.estiCalc;
        if($scope.dashInstant.fuelPrice > 0 && $scope.vanHourlyPrice > 0 && $scope.dashInstant.jobHoursEsti > 0) {
            // OK Hack
            $scope.$apply();
        }
    }

    $($scope.slider).on('change', function() {
        $scope.dashInstant.jobHoursEsti = $scope.slider.val()
        $scope.algoCalc();
        $scope.calcAlgo();
    })

    // NO SAVE ButTON
    $scope.saveInstantjob = function(){
        $http.post('/api/save-instant-job', {data: dashInstant}).then(function(res){
            // $scope.matchFields(res);
        }, function(response){
            // failure callback
        });
    }

    $scope.calcInstantJob = function() {
        $http.post('/api/tdispatch-calc', {data: dashInstant}).then(function(res){
            $scope.matchFields(res);
        }, function(response){
            // failure callback
        });
    }

    $scope.matchFields = function(res) {
        $scope.dashInstant.waitTime = 'Wait Time: '+res.data.data.fare.time_to_wait / 60+' Mins';
        $scope.dashInstant.suggestedPrice = res.data.data.fare.total_cost;
        dashInstant = $scope.dashInstant;
    }

    $scope.$watch('misc.dirtModalHack', function(newVal, oldVal) {
        console.log('hack '+newVal);
        if(newVal == true) {
            $('#review-booking-button').click();
        }
    })

})


// Ctrl For Navigation
app.controller('NaviCtrl', function($scope, views, $route, auth, $http, user, infoGrab, bookings, bookingGrab, bookings, email, $location, misc, stripeForm, cardDetails, currBooking, dashInstant, hackTools, $interval) {

    $scope.views = views;
    views.currentView = $route.current.action;
    views.currentType = $route.current.type;
    views = $scope.views;

    // Grab appRoute.js Action Param
    $scope.bookings = bookings;
    $scope.misc = misc;
    $scope.stripeForm = stripeForm;
    $scope.cardDetails = cardDetails;
    $scope.currBooking = currBooking;
    $scope.email = email;
    $scope.isEmailSent = '';
    $scope.dashInstant = dashInstant;
    $scope.hackTools = hackTools;

    $scope.cancelJob = function(jobPK) {
        $scope.hackTools.fixModalScroll('md-default');
        $http.post('/api/cancel-job', {data: jobPK}).success(function(resp) {
            if(resp.success == true) {
                $scope.misc.myBookingsReady = true;
                toastr.success(resp.message);
            } else {
                toastr.error(resp.message);
            }
        })
    }

    $scope.checkCard = function() {
        $scope.stripeForm.checkCard();
    }

    $scope.contactSend = function(){
        $http.post("/api/contact-send/", {email: $scope.email}).success(function(response){
            if(response.success == true) {
                // valid
                $scope.email.emailAddress = '';
                $scope.email.subject = '';
                $scope.email.message = '';
                $scope.isEmailSent = true;
                $interval(function(test){
                    $scope.isEmailSent = false;
                    $interval.cancel();
                },5000,0);
            } else {
                $scope.isEmailSent = false;
                toastr.error(response.message);
            }
        });
        console.log("test to see if email")
    };

   $scope.logout = function(){
       $http.post("/api/logout").success(function(){
           $location.url("/login");
       });
   };

    $scope.displayOneBooking = function(id){
        $scope.hackTools.fixModalScroll('md-default');
        var temp = $scope.bookings.filter(function(ele){
            return ele._id == id;
        })
        $scope.currBooking.jobID = temp[0]["_id"];
        $scope.currBooking.jobPK = temp[0]["pk"];
        $scope.currBooking.jobName = temp[0]["jobName"];
        $scope.currBooking.jobHoursEsti = temp[0]["jobHoursEsti"];
        $scope.currBooking.pickUp = temp[0]["address"]["start_location"]["name"];
        $scope.currBooking.dropOff = temp[0]["address"]["end_location"]["name"];
        $scope.currBooking.jobDate = temp[0]["jobDate"];
        $scope.currBooking.driverNote = temp[0]["driverNote"];
        $scope.currBooking.vanType = temp[0]["vanType"];
        $scope.currBooking.fuelPrice = temp[0]["fuelPrice"];
        $scope.currBooking.suggestedPrice = temp[0]["suggestedPrice"];
        $scope.currBooking.userID = temp[0]["userID"];
        $scope.currBooking.driverName = temp[0]["driverName"];
        $scope.currBooking.driverPlate = temp[0]["driverPlate"];
        $scope.currBooking.driverColor = temp[0]["driverColor"];
        $scope.currBooking.driverPK = temp[0]["driverPK"];
        $scope.currBooking.driverPhone = temp[0]["driverPhone"];
    };

    $scope.displayProfile = function() {
        infoGrab.displayOneRecord(null, "User");
    }

    $scope.displayBooking = bookingGrab.displayAllRecords(null, "Quote", function(resp){
        console.log(resp);
        if(resp.success == true) {
            $scope.bookings = resp.data;
        } else {
            toastr.error(resp.message);
        }
    });

    $scope.checkBookingStatus = function(status1, status2, status3) {
        var flag = 0;
        for(var i = 0; $scope.bookings.length > i; i++) {
            if(
                $scope.bookings[i]['status'] !== status1 &&
                $scope.bookings[i]['status'] !== status2 &&
                $scope.bookings[i]['status'] !== status3)
            {
                flag++;
            }
        }
        if(flag < 1) {
            return true;
        } else {
            return false;
        }
    }

    $scope.$watch('misc.myBookingsReady', function(newValue, oldValue) {
        if(newValue == true) {
            $scope.displayBooking = bookingGrab.displayAllRecords(null, "Quote", function(resp){
                $scope.bookings = resp;
                $scope.misc.myBookingsReady = false;
            });
        }
    });
})

app.controller('CardAddedCtrl', function($scope, user, stripeForm, misc, hackTools) {
    $scope.user = user;
    $scope.stripeForm = stripeForm;
    $scope.misc = misc;

    $scope.addCard = function() {
        if($scope.misc.reviewCardRoute == true) {
            $scope.stripeForm.getCardFormRes(function(resp) {
                if(resp == true) {
                    misc.hasCard = true;
                    // DIRT HACK MODAL BUG
                    $('#add-card-close-icon').click();
                    $('#review-booking-modal').click();
                    $scope.hackTools.fixModalScroll('md-review');
                } else {
                    toastr.error(resp.message);
                }
            });
        } else {
            $scope.stripeForm.getCardForm(function(resp) {
                if(resp == true) {
                    //
                } else {
                    toastr.error(resp.message);
                }
            });
        }
    }

    $scope.removeCard = function() {
        $scope.stripeForm.removeCard(function(resp) {
            if(resp == true) {
                $scope.user.cardAdded = 'none';
            } else {
                toastr.error(resp.message);
            }
        });
    }

})


app.controller('ReviewBookingCtrl', function($scope, user, stripeForm, misc, dashInstant, $http, bookings, bookingGrab, deets, hackTools, func) {

    $scope.dashInstant = dashInstant;
    $scope.stripeForm = stripeForm;
    $scope.bookings = bookings;
    $scope.bookingGrab = bookingGrab;
    $scope.user = user;
    $scope.misc = misc;
    $scope.deets = deets;
    $scope.hackTools = hackTools;
    $scope.func = func;

    $scope.showAddCard = function() {
        //$('#payment-button:hidden').click();
        $scope.misc.reviewCardRoute = true;
    }

    // FROM BOOK BUTTON TO SERVER ROUTES (DATA IT SENDS: DASHINSTANT)
    $scope.bookInstantJob = function(){
        // if customer has card in mongo
        if(user.cardAdded == 'added') {
            // SAVES JOB TO DB
            $http.post('/api/tdispatch-book', {data: dashInstant}).then(function(resp){
                console.log(resp);
                if(resp.data.success == true) {
                    bookingGrab.displayAllRecords(null, "Quote", function(resp){
                        $scope.bookings = resp;
                        $scope.misc.myBookingsReady = true;
                        $('#review-booking-close').click();
                        $('#job-complete-modal').click();
                        // DIRT HACK MODAL BUG
                        $scope.hackTools.fixModalScroll('md-complete');
                        $scope.func.resetQuote();
                    });
                } else {
                    // NO BOOK
                    toastr.error(resp.data.message);
                }
            }, function(response){
                // failure callback
            });
        } else {
            // cant book need card
            document.getElementById('payment-button').click();
            $scope.stripeForm.checkCard();
        }
    }
})


app.controller('CheckoutCtrl', function($scope, $location) {
    $scope.next = function(){
        
        $location.path("/checkout-2")
    }
    
    $scope.back = function(){
        
        $location.path("/checkout")
    }
    
    $scope.next2 = function(){
        
        $location.path("/checkout-3")
    }
    
    $scope.back2 = function(){
        
        $location.path("/checkout-2")
    }
    
    $scope.next3= function(){
        
         $location.path("/booking-complete")
    }
})
