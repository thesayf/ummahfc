


// Ctrl For Dash
app.controller('HomeCtrl', function($scope, $localStorage) {
    $localStorage.vg = {};
})

// Ctrl For Dash
app.controller('DashHomeCtrl', function($scope) {
    //
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
app.controller('DashInstantCtrl', function($scope, maps, $localStorage, items, rates, $location, $timeout, $http, swift) {

    // Start GMaps
    maps.init();

    $scope.autocompleteOptions = {
        componentRestrictions: { country: 'uk' },
        types: ['geocode']
    }

    if($localStorage.vg !== undefined && $localStorage.vg.jobDetails) {
        var timeNow = new Date().getTime();
        var saveTime = $localStorage.vg.jobDetails.timestamp;
        var saveTimePlus5Hr = saveTime + (1000 * 60 * 60 * 5);
        console.log(saveTime+' - '+saveTimePlus5Hr);

        //var diff = saveTimePlus5Hr - saveTime;
        if(timeNow > saveTimePlus5Hr) {
            $localStorage.vg = {};
            $scope.dashInstant = {};
            $scope.dashInstant.itemBoxes = [
                {size: 'smItems', qty: 0},
                {size: 'mdItems', qty: 0},
                {size: 'lgItems', qty: 0}
            ]
        }
        //1000 * 60 * 60 * 24
        $scope.dashInstant = $localStorage.vg.jobDetails;
        if($scope.dashInstant !== undefined) {
            $('#swt5')[0].checked = $scope.dashInstant.extraHelp;
        }
    } else {
        $localStorage.vg = {};
        $scope.dashInstant = {};
        $scope.dashInstant.itemBoxes = [
            {size: 'smItems', qty: 0},
            {size: 'mdItems', qty: 0},
            {size: 'lgItems', qty: 0}
        ]
    }


    /*if($localStorage.vg.drivers) {

    } else {

    }*/

    var realTime = new Date();
    $('#job-date-picker').datetimepicker({
        format: 'dd-mm-yy',
        startDate: realTime,
        initialDate: realTime,
        todayHighlight: true,
        minView: 'month',
        autoclose: true
    });

    $('#early-time-picker').datetimepicker({
        startDate: realTime,
        initialDate: realTime,
        startView: 'day',
        format: 'hh:ii',
        maxView: 'day',
        autoclose: true
    });

    // Hide Picker When selected
    /*$('#job-date-picker').datetimepicker().on('changeDate', function(ev){
        $scope.dashInstant.startTime = $scope.dashInstant.jobDate;
        var tempDate = $scope.dashInstant.startTime.split('-');
        $scope.dashInstant.startTime = tempDate[1]+'-'+tempDate[0]+'-'+tempDate[2];
        $scope.dashInstant.startTime = new Date($scope.dashInstant.startTime);
        console.log($scope.dashInstant.startTime);
        $('#early-time-picker').datetimepicker('remove');
        $('#early-time-picker').datetimepicker({
            startDate: $scope.dashInstant.startTime,
            initialDate: $scope.dashInstant.startTime,
            startView: 'day',
            format: 'hh:ii',
            maxView: 'day'
        });
    });*/

    $scope.closeTimePicker = function() {
        $('.datetimepicker-dropdown-bottom-right').hide();
    }

    $('#early-time-picker').datetimepicker().on('show', function(ev){
        $('.datetimepicker-hours table thead tr th.prev').html('');
        $('.datetimepicker-hours table thead tr th.switch').text('Hour Picker');
        $('.datetimepicker-hours table thead tr th.next').html('');
        /*$('.datetimepicker-minutes table thead tr th.prev').html('');
        $('.datetimepicker-minutes table thead tr th.switch').text('Minute Picker');
        $('.datetimepicker-minutes table thead tr th.next').html('');*/
    })

    $('.datetimepicker-hours').on('click', function() {
        $timeout(function() {
            $('.datetimepicker-minutes table thead tr th.prev').html('');
            $('.datetimepicker-minutes table thead tr th.switch').text('Minute Picker');
            $('.datetimepicker-minutes table thead tr th.next').html('');
        },1)

    })

    //var timepicker = $('.datetimepicker-hours.table-condensed thead tr th');
    //console.log(timepicker.length);

    $scope.changeData = function() {
        var flag = 0;
        var canProgress = 0;

        // IF THERES NO INVENTORY FLAG
        if($scope.dashInstant.itemBoxes[0].qty < 1 && $scope.dashInstant.itemBoxes[1].qty < 1 && $scope.dashInstant.itemBoxes[2].qty < 1) {
            flag = flag + 1;
            canProgress = canProgress + 1;
        }

        // IF NO ADDRESS DATA
        if($scope.dashInstant.address == undefined) {
            flag = flag + 1;
            canProgress = canProgress + 1;
        } else {
            if($scope.dashInstant.address.start_location !== undefined &&
                $scope.dashInstant.address.start_location.name == '') {
                    flag = flag + 1;
                    canProgress = canProgress + 1;
            }
            if($scope.dashInstant.address.end_location !== undefined &&
                $scope.dashInstant.address.end_location.name == '') {
                    flag = flag + 1;
                    canProgress = canProgress + 1;
            }
        }

        // IF NO JOB DATE
        if($scope.dashInstant.jobDate == undefined || $scope.dashInstant.jobDate == '') {
            canProgress = canProgress + 1;
        }
        if($scope.dashInstant.jobStartTime == undefined || $scope.dashInstant.jobStartTime == '') {
            canProgress = canProgress + 1;
        }

        if(flag > 0) {
            //console.log('flagged');
        } else {
            //console.log('ok no flag');
            $scope.calcAlgo();
        }

        if(canProgress > 0) {
            $('#review-booking-button').attr('data-target', '');
            $('#review-booking-button').addClass('disabled');
        } else {
            //console.log('ok no flag');
            $('#review-booking-button').attr('data-target', '#md-review');
            $('#review-booking-button').removeClass('disabled');
        }
    }

    if($scope.dashInstant !== undefined) {
        $scope.dashInstant.extraHelp = $('#swt5')[0].checked;
    }

    $scope.holdDriverDelay = function(e) {
        if($('#review-booking-button').hasClass('disabled')) {
            // IF THERES NO INVENTORY FLAG
            if($scope.dashInstant.itemBoxes[0].qty < 1 && $scope.dashInstant.itemBoxes[1].qty < 1 && $scope.dashInstant.itemBoxes[2].qty < 1) {
                $.growl.error({ message: 'Fill in the Inventory!' });
            }

            // IF NO ADDRESS DATA
            if($scope.dashInstant.address == undefined) {

            } else {
                if($scope.dashInstant.address.start_location !== undefined &&
                    $scope.dashInstant.address.start_location.name == '') {
                        $.growl.error({ message: 'Fill in the Start Location!' });
                }
                if($scope.dashInstant.address.end_location !== undefined &&
                    $scope.dashInstant.address.end_location.name == '') {
                        $.growl.error({ message: 'Fill in the End Location!' });
                }
            }

            // IF NO JOB DATE
            if($scope.dashInstant.jobDate == undefined || $scope.dashInstant.jobDate == '') {
                $.growl.error({ message: 'Fill in the Job Date!' });
            }
            if($scope.dashInstant.jobStartTime == undefined || $scope.dashInstant.jobStartTime == '') {
                $.growl.error({ message: 'Fill in the Start Time!' });
            }


        } else {
            $('.modal-body').prepend('<img class="spin-img" src="/assets/img/35.gif">');
            $('.modal-body').addClass('tc');
            $('.review-body').addClass('hide');
            swift.driverList(function(resp) {
                //$localStorage.vg.drivers = resp;
                $scope.dashInstant.driverCount = Math.ceil(resp.length / 4);
                $timeout(function() {
                    $('.review-body').removeClass('hide');
                    $('.modal-body').removeClass('tc');
                    $('.spin-img').remove();
                },1000)
            })
        }
    }

    $scope.calcAlgo = function() {
        $scope.loadTime = 0;
        $scope.unloadTime = 0;
        $scope.totalCuft = 0;
        for(ti in $scope.dashInstant.itemBoxes) {
            var itemType = $scope.dashInstant.itemBoxes[ti].size;
            var itemQty = $scope.dashInstant.itemBoxes[ti].qty;
            var itemCuft = items[''+itemType+'']['cuFt'];
            $scope.loadTime = $scope.loadTime + (items[''+itemType+'']['loadTime'] * itemQty);
            $scope.unloadTime = $scope.unloadTime + (items[''+itemType+'']['unloadTime'] * itemQty);
            $scope.totalCuft = $scope.totalCuft + (itemCuft * itemQty);
        }


        //dashInstant.itemBoxes = $scope.itemBoxes;

        var rate = 0;
        for(rat in rates) {
            var minRange = rates[rat].minRange;
            var maxRange = rates[rat].maxRange;
            if($scope.totalCuft > minRange && $scope.totalCuft < maxRange) {
                var rate = rates[rat].rate;
            }
        }

        var driveTime = $scope.dashInstant.duration / 60;
        var fuelCost = ($scope.dashInstant.distance * 0.000621371192237) * .70;

        var totalTime = $scope.loadTime + $scope.unloadTime + driveTime;
        var workCost = totalTime * rate;
        if($scope.dashInstant.extraHelp == true) {
            var extra = 20 * (totalTime/60);
        } else {
            var extra = 0;
        }
        $scope.totalCost = Math.ceil((workCost + fuelCost + extra) * 10) / 10;


        $scope.dashInstant.estiCalc = $scope.totalCost;
        $scope.dashInstant.deposit = (($scope.totalCost / 100) * 25);
        $scope.dashInstant.deposit = $scope.dashInstant.deposit.toFixed(2);
    }

    $scope.updateMaps = function() {
        if($scope.dashInstant.address.start_location !== undefined) {
            if($scope.dashInstant.address.start_location.name.formatted_address) {
                $scope.dashInstant.address.start_location.lat =
                $scope.dashInstant.address.start_location.name.geometry.location.lat();
                $scope.dashInstant.address.start_location.lng =
                $scope.dashInstant.address.start_location.name.geometry.location.lng();
                $scope.dashInstant.address.start_location.name = $scope.dashInstant.address.start_location.name.formatted_address;
            }
        }
        if($scope.dashInstant.address.end_location !== undefined) {
            if($scope.dashInstant.address.end_location.name.formatted_address) {
                $scope.dashInstant.address.end_location.lat =
                $scope.dashInstant.address.end_location.name.geometry.location.lat();
                $scope.dashInstant.address.end_location.lng =
                $scope.dashInstant.address.end_location.name.geometry.location.lng();
                $scope.dashInstant.address.end_location.name = $scope.dashInstant.address.end_location.name.formatted_address;
            }
        }
        if($scope.dashInstant.address.pickup1 !== undefined && $scope.dashInstant.address.pickup1.formatted_address) {
            $scope.dashInstant.address.pickup1.name = $scope.dashInstant.address.pickup1.formatted_address;
        }
        if($scope.dashInstant.address.dropoff1 !== undefined && $scope.dashInstant.address.dropoff1.formatted_address) {
            $scope.dashInstant.address.dropoff1.name = $scope.dashInstant.address.dropoff1.formatted_address;
        }

        if($scope.dashInstant.address.start_location !== undefined &&
            $scope.dashInstant.address.start_location.name !== '' &&
            $scope.dashInstant.address.end_location !== undefined &&
            $scope.dashInstant.address.end_location.name !== '') {
                maps.setDirections($scope.dashInstant.address, function(data) {
                    var tempMiles = 0.000621371192237 * data.distance;
                    $scope.dashInstant.fuelPrice = Math.round(tempMiles * 0.72);
                    $scope.dashInstant.distance = tempMiles;
                    $scope.dashInstant.duration = data.duration;
                });
         }
    }

    $scope.extraHelpClick = function() {
        $scope.dashInstant.extraHelp = $('#swt5')[0].checked;
        $scope.changeData();
    }

    $scope.goToCheck = function() {
        $scope.dashInstant.timestamp = new Date().getTime();
        $localStorage.vg.jobDetails = $scope.dashInstant;
        $timeout(function() {
            $location.path('/checkout');
        },1000)
    }

    $scope.changeData();

    $scope.$watch('dashInstant.itemBoxes', function(oldValue, newValue) {
        $scope.loadTime = 0;
        $scope.unloadTime = 0;
        $scope.totalCuft = 0;
        for(ti in $scope.dashInstant.itemBoxes) {
            var itemType = $scope.dashInstant.itemBoxes[ti].size;
            var itemQty = $scope.dashInstant.itemBoxes[ti].qty;
            var itemCuft = items[''+itemType+'']['cuFt'];
            $scope.loadTime = $scope.loadTime + (items[''+itemType+'']['loadTime'] * itemQty);
            $scope.unloadTime = $scope.unloadTime + (items[''+itemType+'']['unloadTime'] * itemQty);
            $scope.totalCuft = $scope.totalCuft + (itemCuft * itemQty);
        }

        if($scope.totalCuft > 500) {
            $('#limit-note').removeClass('hide');

        } else {
            $('#limit-note').addClass('hide');
        }
    }, true)

})


// Ctrl For Navigation
app.controller('NaviCtrl', function($scope, views, $route, auth, $http, user, infoGrab, bookings, bookingGrab, bookings, email, $location, misc, stripeForm, cardDetails, currBooking, /*dashInstant*/ hackTools, $interval) {

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
    //$scope.dashInstant = dashInstant;
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
        //infoGrab.displayOneRecord(null, "User");
    }

    /*$scope.displayBooking = bookingGrab.displayAllRecords(null, "Quote", function(resp){
        console.log(resp);
        if(resp.success == true) {
            $scope.bookings = resp.data;
        } else {
            toastr.error(resp.message);
        }
    });*/

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

    /*$scope.$watch('misc.myBookingsReady', function(newValue, oldValue) {
        if(newValue == true) {
            $scope.displayBooking = bookingGrab.displayAllRecords(null, "Quote", function(resp){
                $scope.bookings = resp;
                $scope.misc.myBookingsReady = false;
            });
        }
    });*/
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


app.controller('ReviewBookingCtrl', function($scope, user, stripeForm, misc, /*dashInstant,*/ $http, bookings, bookingGrab, deets, hackTools, func) {

    //$scope.dashInstant = dashInstant;
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
    /*$scope.bookInstantJob = function(){
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
    }*/
})


app.controller('CheckoutCtrl', function($scope, $location, $localStorage, $http) {
    $scope.ccDeets = {};

    $scope.jobDeets = $localStorage.vg.jobDetails;

    $scope.vali = function(name, length, msg, cb) {
        if(name == '' || name == undefined || name.length < 3) {
            $.growl.error({ message: msg });
            cb(1);
        } else {
            cb(0);
        }


    }


    $scope.next = function(){
        $localStorage.vg.jobDetails = $scope.jobDeets;
        var flag = 0;
        $scope.vali($scope.jobDeets.name, 3, 'Please fill in your name!', function(resp) {
            flag = flag + resp;
            $scope.vali($scope.jobDeets.email, 3, 'Please fill in your email!', function(resp2) {
                flag = flag + resp2;
                $scope.vali($scope.jobDeets.number, 3, 'Please fill in your number!', function(resp3) {
                    flag = flag + resp3;
                    if(flag > 0) {
                        console.log('flagged');
                    } else {
                        $location.path("/checkout-3");
                    }
                });
            });
        });

    }

    $scope.back = function(){
        console.log('bk');
        $location.path("/checkout")
    }

    $scope.next2 = function(){
        $localStorage.vg.jobDetails = $scope.jobDeets;
        $location.path("/checkout-3")
    }

    $scope.back2 = function(){
        $location.path("/checkout")
    }

    $scope.backToBooking = function(){
        $location.path("/dash");
    }

    $scope.testSwift = function() {
        $http.post('/api/book-job', {data: $localStorage.vg.jobDetails}).then(function(resp) {

        })
    }



    $(function() {
      var $form = $('#payment-form');
      $form.submit(function(event) {
          event.preventDefault();


          var flag = 0;
          if($scope.ccDeets.number == undefined || $scope.ccDeets.number.replace(/ /g,'').length !== 16) {
              $.growl.error({ message: 'Card Number Must Be 16 Digits!'});
              flag = flag + 1;
          }
          if($scope.ccDeets.expMonth == undefined || $scope.ccDeets.expMonth.length !== 2) {
              $.growl.error({ message: 'Card Expiration Month Must Be 2 Digits!'});
              flag = flag + 1;
          }
          if($scope.ccDeets.expYear == undefined || $scope.ccDeets.expYear.length !== 2) {
              $.growl.error({ message: 'Card Expiration Year Must Be 2 Digits!'});
              flag = flag + 1;
          }
          if($scope.ccDeets.expCvc == undefined || $scope.ccDeets.expCvc.length !== 3) {
              $.growl.error({ message: 'Card CVC Number Must Be 3 Digits!'});
              flag = flag + 1;
          }

          if(flag > 0) {
            return false;
          } else {
            // Disable the submit button to prevent repeated clicks:
            $form.find('.submit').prop('disabled', true);

            // Request a token from Stripe:
            Stripe.card.createToken($form, function(status, res) {
                $http.post("/api/charge-card", {stripe: res, user: $localStorage.vg.jobDetails}).then(function(status){
                    if(status.data.status !== false) {
                        $.growl.notice({message: status.data.message});
                        $scope.jobDeets.paymentID = status.data.data.id;
                        $localStorage.vg.jobDetails.paymentID = $scope.jobDeets.paymentID;
                        $http.post('/api/book-job', {data: $localStorage.vg.jobDetails}).then(function(resp) {
                            if(resp.data.status == true) {
                                $location.path("/booking-complete");
                                $http.post("/api/send-email", {data: $localStorage.vg.jobDetails}).then(function(status){
                                    $localStorage.vg = {};
                                    $scope.dashInstant = {};
                                    $scope.dashInstant.itemBoxes = [
                                        {size: 'smItems', qty: 0},
                                        {size: 'mdItems', qty: 0},
                                        {size: 'lgItems', qty: 0}
                                    ]
                                });
                            } else {
                                $.growl.error({message: 'Job Booking Failed Please Call Us!'});
                            }
                        })
                    } else {
                        $.growl.error({message: 'Payment Failed, Try a different card!'});
                    }
                });
            });
        }
        // Prevent the form from being submitted:
        //return false;
      });
    });

    $scope.next3 = function(event){}

    $scope.test = function() {
        $http.post("/api/send-email", {data: $localStorage.vg.jobDetails}).then(function(status){
            //
        });
    }


})
