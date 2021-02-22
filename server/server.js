const { PORT, mongoUri } = require("./config");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("./models/db");
dotenv.config();


const app = express();

// Setting up basic middleware for all Express requests
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(express.json());

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("mongo-DB connected"))
    .catch((err) => console.log(err));

app.use(express.json({extended:false}));

//testing server activation on first run



//------------------ SingUp process ---------------------

app.post("/signup", async(req, res) => {
    const newUser = new db({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        select: req.body.select,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    try {
        await newUser.save();
        return res.status(200).json({
            title: "signup success",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            title: "error",
            error: "email in use",
        });
    }
});

//------------------ SingIn process ---------------------

app.post("/signin", (req, res) => {
    db.findOne({ email: req.body.email }, (err, user) => {
        if (err)
            return res.status(500).json({
                title: "server error",
                error: err,
            });
        if (!user) {
            return res.status(401).json({
                title: "user not found",
                error: "invalid credentials",
            });
        }
        //incorrect password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                tite: "login failed",
                error: "invalid credentials",
            });
        }
        //IF ALL IS GOOD create a token and send to frontend
        let token = jwt.sign({ userId: user._id }, "shuuuu");
        return res.status(200).json({
            title: "login sucess",
            token: token,
            user: user,
        });
    });
});

// -------------- get user --------------------
app.get("/", (req, res,) => {
res.send("hello")
})

app.get("/user", (req, res) => {
    let token = req.headers.token; //token
    jwt.verify(token, "shuuuu", (err, decoded) => {
        if (err)
            return res.status(401).json({
                title: "unauthorized",
            });
        //token is valid
        db.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: "user grabbed",
                user: {
                    email: user.email,
                    name: user.name,
                },
            });
        });
    });
});


 
 app.get('/', (req, res) =>{
     res.send('HEllo')
 })

 app.listen(PORT, () => console.log(`logged on PORT ${PORT}`));