//*===== SERVER.JS ======*//
//*===dat : 20200229 ====*//
require('dotenv/config');

const express = require('express');
const path    = require('path');
const app     = express();
const port    = 5000;
const parser  = require('body-parser');

app.use(express.static(path.join(__dirname, 'public/dist/public')));
app.use(express.static(path.join(__dirname, '/static')));

// set parser
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(parser.text({type: 'text/xml' }));
app.use(parser.text({type: 'text/plain' }));

// define Schema on MS-SQL
require('./server/database');

// - - - - = = = = Routes = = = = - - - - 
require('./server/config/routes.config.js')(app);

// listen to port 
app.listen(port, function() {
  console.log("listening on port ", port);
});
