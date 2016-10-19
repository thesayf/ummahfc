app.config(function($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider

        .when('/', {
            templateUrl : 'app/components/home/home-view.html',
            controller  : 'HomeCtrl'
        })

        .when('/dash', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashHomeCtrl',
            action      : 'dash-instant',
            type        : 'dash'
        })

        .when('/instant', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashInstantCtrl',
            action      : 'dash-instant',
            type        : 'dash'
        })

        .when('/schedule', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashScheduleCtrl',
            action      : 'dash-schedule',
            type        : 'dash'
        })

        .when('/recurring', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashRecurringCtrl',
            action      : 'dash-recurring',
            type        : 'dash'
        })

        .when('/project', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashProjectCtrl',
            action      : 'dash-project',
            type        : 'dash'
        })

        .when('/address-book', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashAddressBookCtrl',
            action      : 'dash-addressbook',
            type        : 'dash'
        })

        .when('/add-address', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashAddAddressCtrl',
            action      : 'dash-addaddress',
            type        : 'dash'
        })

        .when('/job-complete', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashAddAddressCtrl',
            action      : 'dash-jobcomplete',
            type        : 'dash'
        })

        .when('/payment-details', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashPaymentCtrl',
            action      : 'dash-paymentdetails',
            type        : 'dash'
        })

        .when('/profile', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashProfileCtrl',
            action      : 'dash-profile',
            type        : 'dash'
        })

        .when('/project-job', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashAddAddressCtrl',
            action      : 'dash-projectjob',
            type        : 'dash'
        })

        .when('/saved-quotes', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashAddAddressCtrl',
            action      : 'dash-savedquotes',
            type        : 'dash'
        })

        .when('/pending-jobs', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashAddAddressCtrl',
            action      : 'dash-pendingjobs',
            type        : 'dash'
        })

        .when('/all-messages', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashMessageCtrl',
            action      : 'dash-allmessages',
            type        : 'dash'
        })

        .when('/signup', {
            templateUrl : 'app/components/home/signup.html',
            controller  : 'DashSignupCtrl',
            //action    : 'dash-allmessages',
            //type        : 'dash'
        })

        .when('/login', {
            templateUrl : 'app/components/home/login.html',
            controller  : 'DashLoginCtrl',
            //action    : 'dash-allmessages',
            type        : 'dash'
        })

        .when('/viewallmessages', {
            templateUrl : 'app/components/home/dash-allmessages.html',
            controller  : 'DashMessagesCtrl',
            action      : 'dash-allmessages',
            type        : 'dash'
        })

        .when('/ticket-chain', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashTicketCtrl',
            action      : 'dash-ticketchain',
            type        : 'dash'
        })

        .when('/my-drivers', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashDriversCtrl',
            action      : 'dash-mydrivers'
        })

        .when('/driver-profile', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashDriverProfileCtrl',
            action      : 'dash-driverprofile'
        })

        .when('/live-view', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashLiveViewCtrl',
            action      : 'dash-liveview'
        })

        .when('/notifications', {
            templateUrl : 'app/components/dash/dash-view.html',
            controller  : 'DashNotificationsCtrl',
            action      : 'dash-notifications'
        })

        .when('/admin', {
            templateUrl : 'app/components/admin/admin-view.html',
            controller  : 'AdminHomeCtrl',
            action      : 'admin-home',
            type        : 'admin'
        })

        .when('/users', {
            templateUrl : 'app/components/admin/admin-view.html',
            controller  : 'DashUsersCtrl',
            action      : 'admin-users',
            type        : 'admin'
        })

        .when('/drivers', {
            templateUrl : 'app/components/admin/admin-view.html',
            controller  : 'DashDriversCtrl',
            action      : 'admin-drivers',
            type        : 'admin'
        })

        .when('/earnings', {
            templateUrl : 'app/components/admin/admin-view.html',
            controller  : 'DashdriversearningsCtrl',
            action: "admin-earnings",
            type        : 'admin'
        })

        .when('/staff-login', {
            templateUrl : 'app/components/home/staff-login.html',
            controller  : 'StaffSigninCtrl',
            //action    : 'dash-allmessages'
        })

        .when('/contractor-signup', {
            templateUrl : 'app/components/home/contractor-signup.html',
            controller  : 'ContractorSignupCtrl'
            //action    : 'dash-allmessages'
        })

        .when('/staff', {
            templateUrl : 'app/components/admin/admin-view.html',
            controller  : 'DashStaffCtrl',
            action      : 'admin-staff'
        })

        .when('/contractor-home', {
            templateUrl : 'app/components/contractors/contractor-view.html',
            controller  : 'DashDaccountCtrl',
            action: "contractor-home",
            type: 'contractor'
        })

        .when('/contractor-earnings', {
            templateUrl : 'app/components/contractors/contractor-view.html',
            controller  : 'DashDearningsCtrl',
            action: "contractor-earnings"
        })

        .when('/driver-login', {
            templateUrl : 'app/components/home/driver-login.html',
            controller  : 'DriverSigninCtrl',
            //action    : 'dash-allmessages'
        })

        .when('/website', {
            templateUrl : 'app/components/home/con-web/index.html',
            controller  : 'DashSignupCtrl',
            //action    : 'dash-allmessages'
        })

        .when('/about-us', {
            templateUrl : 'app/components/home/con-web/page.html',
            controller  : 'DashSignupCtrl',
            //action    : 'dash-allmessages'
        })

        .when('/driver-signup', {
            templateUrl : 'app/components/home/con-web/page2.html',
            controller  : 'ContractorSignupCtrl',
            //action    : 'dash-allmessages'
        })

        .when('/consumer-terms', {
            templateUrl : 'app/components/home/con-web/con-terms.html',
            controller  : 'ContractorSignupCtrl',
            //action    : 'dash-allmessages'
        })

        .when('/driver-terms', {
            templateUrl : 'app/components/home/con-web/driver-terms.html',
            controller  : 'ContractorSignupCtrl',
            //action    : 'dash-allmessages'
        })
        
        .when('/checkout', {
            templateUrl : 'app/components/dash/views/dash-checkout.html',
            controller  : 'CheckoutCtrl',
            //action    : 'dash-allmessages'
        })
        
        .when('/checkout-2', {
            templateUrl : 'app/components/dash/views/dash-checkout-2.html',
            controller  : 'CheckoutCtrl',
            //action    : 'dash-allmessages'
        })
        
        .when('/checkout-3', {
            templateUrl : 'app/components/dash/views/dash-checkout-3.html',
            controller  : 'CheckoutCtrl',
            //action    : 'dash-allmessages'
        })
    
        .when('/booking-complete', {
            templateUrl : 'app/components/dash/views/booking-complete.html',
            controller  : 'CheckoutCtrl',
            //action    : 'dash-allmessages'
        })

        .otherwise({
            redirectTo: '/'
        });

        //$httpProvider.interceptors.push("authInter");
        $locationProvider.html5Mode(true);

});

app.run(function($http, $location, $rootScope, $localStorage) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        var type = current.type;
        console.log(type);

        if(type !== undefined) {
            var type = current.type;
            if(type == 'dash') {
                var token = $localStorage.token;
                if(token) {
                    console.log(token);
                    $http.post('/api/check-token', {data: token}).then(function(res) {
                        if(res.data.success == true) {
                            // verified
                            console.log('verified');
                            //details.loggedIn = true;
                        } else {
                            //details.loggedIn = false;
                            $location.path('/login');
                        }
                    })
                } else {
                    //details.loggedIn = false;
                    $location.path('/login');
                }
            }
        }
    })
})