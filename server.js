// import it 
const express = require('express');
const apiRoute = require('./routes/apiRoutes');
const htmlRoute = require('./routes/htmlRoutes');
const app = express();
// every server has a socket which is on the port like (phone number)
const PORT = process.env.PORT || 3002;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoute);
app.use('/', htmlRoute);

// Is used to bind and listen the connections on the specified host and port
app.listen(PORT, () =>
  console.log(`Api server ${PORT}!`)
);