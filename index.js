const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');
const { db } = require('./models/todo');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use("/api/todos", todoRoutes)

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/views"))

app.get('/', function(req, res){
    res.send('index.html')

})




app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
})



