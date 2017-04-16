var express = require("express")
var app = express()
var moment = require("moment")

app.use('/', express.static(__dirname + '/public'));

app.get('/:date', function (req, res) {
    var date;
    if (/[a-z]+ ([0-9])+, \d{4}/g.test(req.params.date.toLowerCase())) {
        date = moment(req.params.date, "MMMM D, YYYY");
    } else if (/^\d+$/g.test(req.params.date)) {
        date = moment(req.params.date, "X")
    }
    
    if(date && date.isValid()) {
        res.json({
          unix: date.format("X"),
          natural: date.format("MMMM D, YYYY")
        });
      } else {
        res.json({
          unix: null,
          natural: null
        });
      }
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})