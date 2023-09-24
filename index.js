var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var axios = require('axios').default

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/static', express.static('public'));
app.set("view engine", "ejs")

app.get('/', function( req, res){
    axios.get('https://xkcd.com/info.0.json').then(function(response){
       console.log(response.data)
       res.render('home.ejs', {name: null, xkcdData: response.data});
    })
})

app.get('/apod', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: 'yOaW03xn4SoJjeoBzziE4jw0R1ftrPaW0qEf4l2V', // Replace with your NASA API key
      },
    });
    const apodData = response.data;

    res.render('home1.ejs', {apodData});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching NASA APOD data.');
  }
});

app.post('/create', (req, res) => {
    console.log(req.body.email)
    res.redirect('/')
})

// app.put(route, function)

app.listen(3000, () => {
    console.log('started on port 3000')
})