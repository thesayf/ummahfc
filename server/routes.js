module.exports = function(app, models, utils, cont, info) {

	// CHARGE CUSTOMER DEPOSIT WITH STRIPE
	app.post("/api/charge-card", function(req, res) {
        cont.stripePay.chargeCustomer(req.body.user.deposit, req.body.user.email, req.body.user.name, req.body.stripe.id, function(resp) {
			if(resp == false) {
				// card declined
				cont.func.sendInfo(res, false, {message: 'Payment Failed!'})
			} else {
				// charge ok
				cont.func.sendInfo(res, true, {data: resp, message: 'Payment Successful!'})
			}
		})
	});

	app.post('/api/list-drivers', function(req, res) {
		cont.swift.listDrivers(utils.needle, function(resp) {
			var driverTemp = [];
			for(key in resp) {
				driverTemp.push({id: resp[key].identifier});
			}
			cont.func.sendInfo(res, true, {data: driverTemp, message: 'Got Driver List'})
		})
	})

	app.post('/api/book-job', function(req, res) {
		cont.swift.bookJob(utils.rest, req.body.data, function(resp) {
			//currentStatus
			var obj = JSON.parse(resp.rawEncoded);
			var stat = obj['delivery']['currentStatus'];
			if(stat == 'Received') {
				cont.func.sendInfo(res, true, {message: 'Booking Successful!'});
			} else {
				cont.func.sendInfo(res, false, {message: 'Booking Failed!'});
			}
		})
	})

	// CHARGE CUSTOMER DEPOSIT WITH STRIPE
	app.post("/api/send-email", function(req, res) {
		req.body.data.msg = 'Vangrab.com Order Reciept\r_________________________________________________________\rThe Most Convenient Way To Move Anything!\r\rWhether you are moving flat or collecting new furniture from Ikea, eBay, Freecycle or Gumtree, the MoversPro web-app is the simplest, cheapest and quickest way to get a driver, on-demand.\r___________________________\rDATE & TIME\r'+req.body.data.jobDate+'\r___________________________\rPICK UP ADDRESS\r'+req.body.data.address.start_location.number+' '+req.body.data.address.start_location.name+'\r___________________________\rDROP OFF ADDRESS';

		req.body.data.msg = req.body.data.msg+'\r'+req.body.data.address.end_location.number+' '+req.body.data.address.end_location.name+'\r___________________________\rEXTRA HELPER\r'+req.body.data.extraHelp+'\r___________________________\rINVENTORY\rSmall Items x '+req.body.data.itemBoxes[0].qty;

		req.body.data.msg = req.body.data.msg+'\rMedium Items x '+req.body.data.itemBoxes[1].qty+'\rLarge Items x '+req.body.data.itemBoxes[2].qty+'\r___________________________\rTOTAL PRICE\r'+req.body.data.estiCalc+'\r___________________________\rDEPOSIT PAID\r'+req.body.data.deposit+'\r\rRefund Policy: A refund can be given at any time before a driver has been dispatched';

		req.body.data.subject = 'Vangrab Order Reciept';

        cont.func.sendEmail(req.body.data, utils, function(resp) {
			if(resp == false) {
				// card declined
				cont.func.sendInfo(res, false, {message: 'Payment Failed!'})
			} else {
				// charge ok
				cont.func.sendInfo(res, true, {data: resp, message: 'Payment Successful!'})
			}
		})
	});

    // This shows the main angular index
    app.get('*', function(req, res) {
        res.render('pages/index');
    });



} // END EXPORT
