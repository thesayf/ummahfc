var swiftKey = 'd84c5aeb-f5dc-4a24-8f63-4e56856defb3';
var deliveryUrl = 'https://app.getswift.co/api/v2/deliveries';
var driverUrl = 'https://app.getswift.co/api/v2/drivers?apiKey='+swiftKey+'&filter=OnlineNow';

var swift = {};

swift.listDrivers = function(needle, cb) {
    needle.get(driverUrl, function(error, response) {
        if(!error && response.statusCode == 200) {
          cb(response.body);
        }
    });
}

swift.bookJob = function(rest, data, cb) {

    //console.log(data);
    //pickupTime: "2016-11-30T15:51:34.9962121+00:00"

    var swiftObj = {
      "apiKey": swiftKey,
      "booking": {
        "reference": data.jobStartTime+ - +data.estiCalc - data.deposit+' - '+'Sm:'+data.itemBoxes[0].qty+', Md:'+data.itemBoxes[1].qty+', Lg:'+data.itemBoxes[2].qty,
        "deliveryInstructions": data.instructions+' - Need Porter: '+data.extraHelp,
        "itemsRequirePurchase": false,
        "items": [
          {
            "quantity": data.itemBoxes[0].qty,
            "description": 'Small Items'
          },
          {
            "quantity": data.itemBoxes[1].qty,
            "description": 'Medium Items'
          },
          {
            "quantity": data.itemBoxes[2].qty,
            "description": 'Large Items'
          }
        ],
        "pickupTime": '20'+data.jobDate+'T'+data.jobStartTime,
        "pickupDetail": {
          "name": data.name,
          "phone": data.number,
          "email": data.email,
          //"description": "sample string 4",
          //"addressComponents": "sample string 5",
          "address": data.address.start_location.number+', '+data.address.start_location.name,
          "additionalAddressDetails": {
            //"stateProvince": "sample string 1",
            //"country": "sample string 2",
            //"suburbLocality": "sample string 3",
            //"postcode": "sample string 4",
            "latitude": data.address.start_location.lat,
            "longitude": data.address.start_location.lng
          }
        },
        //"dropoffWindow": {
          //"earliestTime": "2016-11-30T15:51:34.9962121+00:00",
          //"latestTime": "2016-11-30T15:51:34.9962121+00:00"
        //},
        "dropoffDetail": {
          "name": data.name,
          "phone": data.number,
          "email": data.email,
          //"description": "sample string 4",
          //"addressComponents": "sample string 5",
          "address": data.address.end_location.number+', '+data.address.end_location.name,
          "additionalAddressDetails": {
            //"stateProvince": "sample string 1",
            //"country": "sample string 2",
            //"suburbLocality": "sample string 3",
            //"postcode": "sample string 4",
            "latitude": data.address.end_location.lat,
            "longitude": data.address.end_location.lng
          }
        },
        "customerFee": data.estiCalc - data.deposit,
        "customerReference": data.email,
        //"tax": 1.0,
        //"taxInclusivePrice": false,
        //"tip": 1.0,
        "driverFeePercentage": 100,
        //"driverMatchCode": "sample string 7",
        //"deliverySequence": 8,
        /*"webhooks": [
          {
            "eventName": "sample string 1",
            "url": "sample string 2"
          },
          {
            "eventName": "sample string 1",
            "url": "sample string 2"
          }
        ]*/
      }
  }

    rest.post(deliveryUrl, {data: swiftObj}).on('complete', function(data, response) {
        cb(response);
    });
}

module.exports = swift;
