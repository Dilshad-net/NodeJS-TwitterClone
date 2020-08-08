const express = require('express'); // IDEA: Get Express library;)
const cors = require('cors'); // IDEA:
const monk = require('monk'); // IDEA: DataBase Library (mongoDB Library), similar to mongoose
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express(); // IDEA: App connects to express

app.use(cors()); // IDEA: Surpass the browser error
app.use(express.json()); // IDEA: json body parser (Express built-in)

const db = monk('localhost/twitter'); // IDEA: DataBase && connects
const data = db.get('data') // IDEA: creates && gets stored data (columns///Data collections / (object / array) ) from DataBAse && 'data' is a collection in our db ;)

const port = process.env.Port || 5000

const filter = new Filter();

app.get('/', (req, res) => {
  res.json({
    message: 'hello'
  }); // IDEA: send to client (index.html)
});

app.get('/twitter', (req, res) => {
  data.find()
    .then(dash => {
      res.json(dash);
    });
});

function isValid(dash) {
  return dash.name && dash.name.toString().trim() !== '' && dash.content && dash.content.toString().trim() !== ''; // IDEA: self introduced object{}, /or/ may be replace with object (client.js) && Not sure of !== /or/ != :)
}

app.use(rateLimit({
  windowMs: 10 * 1000,
  max: 10
}));

app.post('/some', (req, res) => {
  //console.log(req.body);
  if (isValid(req.body)) {
    // IDEA: if so insert into DB
    const dash = {
      /*name: req.body.name.toString(),
      content: req.body.content.toString(),
      created: new Date()*/
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
      created: new Date()


    }; // IDEA: created object here :)
    // NOTE: After Validation, here we create a collection in our DB && insert into :)

    //console.log(dash);

    data
      .insert(dash) // IDEA: collection.insert Object
      .then(createdData => {
        res.json(createdData);
      }); // IDEA: & get Created Data (Object) && respond bact to the client
  } else {
    res.status(422);
    res.json({
      message: ' provide a Name along with a Content'
    });
  }
}); // IDEA: On Submit, we get this, (server recieves) So it should be validated as---;)

app.listen(port, () => {
  console.log(`listening on ${port}`);
}) // IDEA: app listens to this port
