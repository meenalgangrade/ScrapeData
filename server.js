const bodyParser = require("body-parser");
const express = require("express");
const application = require("./app.js");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", async(req, res, next) => {
    try{
    const url = req.body.url;
    await application.scrapeData(url).then((result) =>{
        res.send(result);
    });
    } catch(e){
        next(e);
    }
});
                                  
app.listen(3000, () => {  
    console.log("Server running on port 3000");
   });

module.exports = app;