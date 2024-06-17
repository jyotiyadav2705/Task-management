const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var models = require('./models');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());


const indexRouter = require('./routes/index');
app.use('/api', indexRouter);

//check db connection
models.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // set port, listen for requests
const PORT = process.env.PORT || 8080;
models.sequelize.sync().then(function() {
    app.listen(PORT, () => {
        console.log (`Server is running on port ${PORT}.` );
        });
}).then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error creating database & tables:', error);
  });