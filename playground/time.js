var moment = require('moment');

// var date = moment();
// date.add(100, 'year').subtract(12, 'months')
// console.log(date.format('Do-MMM-YYYY hh:mm'));

var timeStamp = moment().valueOf();
console.log(timeStamp);
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));