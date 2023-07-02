const express = require("express");
const Tokens = require('csrf')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express();

app.use(express.json());
app.use(cookieParser())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cors());

  

//var secret = Tokens.secretSync()
var tokens = new Tokens()
var secret = tokens.secretSync()
var token = tokens.create(secret)
app.get("/", (req, res) => {
    res.send(token)
})
app.post('/response', function(req, res) {
    console.log(req.body.token)
    console.log('Token from Browser/form: ' + req.body.token)
    if (!tokens.verify(secret, req.body.token)) {
        throw new Error('invalid token!')
      }
      
    // console.log(req.body);
    res.send(`You're safe from CSRF attack: token verified-> ${req.body.token}` );
  })
//app.use("/", require("./routes/question.router"));
const port = process.env.PORT || 8000;
app.listen(8000, () => {
    console.log(`Server running on PORT ${port}`);
});
