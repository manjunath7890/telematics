var express = require("express");
var router = express.Router();
const raw_data = require('./raw-data');

function fetchWeatherData() {
  return axios.get(`http://api.weatherapi.com/v1/current.json?key=f7694ea1edf34f7483c101926232903&q=bengaluru&aqi=yes`)
    .then(response => {
      return response.data;

    })
    .catch(error => {
      console.log(error);
    });
}
function weatherdata() {
  fetchWeatherData().then(weatherData => {
    humidity = weatherData.current.humidity;
    temperature = weatherData.current.temp_c;
    console.log(`The current humidity is ${humidity}%`);
    console.log(`The current temperature is ${temperature}°C`);
  }).catch(error => {
    console.log(error);
  });

  const weatherTemp = document.querySelector('#temperature');
  weatherTemp.innerHTML = temperature;

  const weatherHumid = document.querySelector('#humidity');
  weatherHumid.innerHTML = humidity;
}

const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}

 const data = {
        value1: 67.56,
        value2: 105.86,
        value3: 100,
        value4: 61,
        value5: 35,
        value6: 3790,
        value7: 777777,
        value8: 8,
        value9: 39,
        value10: 40,
      };

// router.use('/apiData', (req,res)=> {
//     req.data = data;
//     console.log(res.body);
// })

// login user
router.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password)
    {
        // console.log(req.body);
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    }
    else
    {
        res.end("Invalid Username")
    }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
    
    if(req.session.user){
        res.render('dashboard', {user : req.session.user , data})
        // res.json(data);
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/dashboardd', (req, res) => {
   
    if(req.session.user){
        // res.render('dashboard', {user : req.session.user , data})
        res.json(data);
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/about', (req, res) => {
    if(req.session.user){
        res.render('about', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/dashboard2', (req, res) => {
    if(req.session.user){
        res.render('dashboard2', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/dashboard3', (req, res) => {
    if(req.session.user){
        res.render('dashboard3', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/dashboard4', (req, res) => {
    if(req.session.user){
        res.render('dashboard4', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

// route for logout
router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('login', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;