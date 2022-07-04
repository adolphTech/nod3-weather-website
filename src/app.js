const path = require('path')
const express  = require('express');
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000 

// path directories for public,views and partials
const publicDirectoryPath = (path.join(__dirname,'../public')); 
const viewsPath = (path.join(__dirname,"../templates/views"));
const partialsPath = (path.join(__dirname,"../templates/partials"));


 //  specifying locations for views and handle bars
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)


// set up static site to serve
app.use(express.static(publicDirectoryPath))  


app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather App",
        name:"adolph "
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"adolph "
    
    })
})
 
app.get("/help",(req,res)=>{
    res.render("help",{
        title:"help page",
        helpText:"how may we help you my G",
        name:"adolph"
    })
})

app.get("/products",(req,res)=>{

    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })

    }
    console.log(req.query.search)
res.send({
    products: []
})
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
else{
    // const request = require('request')
const axios = require('axios')


//async code inwhich we pass in the addresss to return the coordinates using mapbox.

async function geoCode(address){
   try{ const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWRvbHBoOTMiLCJhIjoiY2w0NnowYWp1MGRmbTNkbjJueXpzbnh2byJ9.MphwZCit3GbXe4OHb5PBbw&limit=1`
    response = await axios.get(url)

    const cordinates ={
        longitude:response.data.features[0].center[1],
       latitude : response.data.features[0].center[0]
    }
   
    return cordinates;
        
}
    catch(err){
    if (err){
        console.log("cannot connect to map box")
    }
    }
}

//using promises from the passed location we get the cordinates .
geoCode(req.query.address)

.then( async function(cordinates){
    try {
                response = await axios.get(`http://api.weatherstack.com/current?access_key=26aa2893c51821f904881e7044d9865e&query=${cordinates.latitude},${cordinates.longitude}&units=m`)
                    //console.log(response.data.current)
  
                    const weather = {
                 description :response.data.current.weather_descriptions[0],
                 temperature : response.data.current.temperature,
                 feelslike :response.data.current.feelslike
                    }

                    return weather;
                // console.log(`${description} .It is currently ${temperature} degress and it feels like ${feelslike} degrees`)
                // console.log(cordinates.longitude,cordinates.latitude)
            } 
                       
            catch (err) {
                if (err) {
                    console.log(`cannot connect to weather api `)
                }
            }
})

.then((weather)=>{
res.send(weather)

})

}
})


app.get('/help/*',(req,res)=>{
    res.render("error",{
        title:"404",
         errorMessage:"The help article was not found"
    })
});

app.get('*',(req,res)=>{
    res.render("error",{
        title:"404",
        errorMessage:"This page could be found"
    })
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
});

