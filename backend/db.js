var mongoose = require('mongoose');
var connxnURL = 'mongodb://localhost:27017/MinorProject';

mongoose.connect(connxnURL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(done => {
        console.log('dB connected')
    })
    .catch(err => {
        console.log('dB not connected')
    })