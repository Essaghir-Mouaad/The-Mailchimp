const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});     

app.post("/", (req, res)=>{

    var username  = req.body.name;

    var email = req.body.email;
    
    var password = req.body.password;

    console.log(username, email, password);

    // mailchimp data requested 
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: username,
                    LNAME: password
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/205209941e"; // the url to post the data

    const option ={
        method: "POST", 
        auth: "mohamed:716be8eef60af1747b522c5128f535b1-us17"
    }

    const requist = https.request(url, option, (response) => {
      response.on("data", (data)=>{
          console.log(JSON.parse(data));
          res.sendFile(__dirname + '/succes.html');

      });
      
    });

    requist.write(jsonData);
    requist.end();

});

app.listen(3000, () => {    
  console.log('Server is running on http://localhost:3000');
});


// 716be8eef60af1747b522c5128f535b1-us17

// id Audient : 205209941e