const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const res = require("express/lib/response");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    
    console.log(firstname,lastname,email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    };
    const jsondata = JSON.stringify(data)

    const url = "https://us17.api.mailchimp.com/3.0/lists/b354ef533b";
    const options ={
        method: "POST",
        auth: "ashish:fa08d84a17ee52549dcd22f94c2188e9-us17"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

 request.write(jsondata);
 request.end();

});

app.post("/failure",  function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running on port 3000")
});


// fa08d84a17ee52549dcd22f94c2188e9-us17

//b354ef533b
