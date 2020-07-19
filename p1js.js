// The path to your python script
var myPythonScript = "p1py.py";
// Provide the path of the python executable, if python is available as environment variable then you can use only "python"
var pythonExecutable = "python.exe";

// Function to convert an Uint8Array to a string
// var uint8arrayToString = function(data){
//     return String.fromCharCode.apply(null, data);
// };
const express = require("express")
const bodyParser = require("body-parser")
const spawn = require('child_process').spawn;

const app = express()

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



const scriptExecution = spawn(pythonExecutable, [myPythonScript]);
// Handle normal output
scriptExecution.stdout.on('data', (data) => {
    const p = JSON.parse(data);
    // data = JSON.parse(data);
    // console.log(data);
    console.log(p)
    noi=p.Data.batting.score.length
    battingteam=p.Data.batting.team

    const srs =p.match[0].srs
    const mnum =p.match[0].mnum
    const status = p.match[0].status

    const v=p.Data.batting.score[noi-1].runs
    const w=p.Data.batting.score[noi-1].wickets

    app.get("/",function(req,res){

    res.render("home",{score:v,wickets:w,srs:srs,mnum:mnum,status:status,battingteam:battingteam});

    })












    app.listen(3000,function(req,res){
      console.log("Server chalu ho gya hai")
    });
});

// Handle error output
scriptExecution.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log(uint8arrayToString(data));
});

scriptExecution.on('exit', (code) => {
    console.log("Process quit with code : " + code);
});
