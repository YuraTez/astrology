var api = 'western_horoscope';
var userId = '636604';
var apiKey = '6d1f718875721102efe8c925f918ac863343f6b0';
var language = 'en'
var data = {
    day: 6,
    month: 1,
    year: 2000,
    hour: 7,
    min: 45,
    lat: 19.132,
    lon: 72.342,
    tzone: 5.5,
};

var auth = "Basic " + new Buffer(userId + ":" + apiKey).toString("base64");

var request = $.ajax({
    url: "https://json.astrologyapi.com/v1/"+api,
    method: "POST",
    dataType:'json',
    headers: {
        "authorization": auth,
        "Content-Type":'application/json',
        "Accept-Language": language
    },
    data:JSON.stringify(data)
});

request.then( function(resp){
    console.log(resp);
}, function(err){
    console.log(err);
});