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





    app.get("/",function(req,res){

      const scriptExecution = spawn(pythonExecutable, [myPythonScript]);
      // Handle normal output
      scriptExecution.stdout.on('data', (data) => {
          const p = JSON.parse(data);
          // data = JSON.parse(data);
          // console.log(data);
          // console.log(p.livematchesinfo[1].batting)
          noi1=p.livematchesinfo[0].batting.score.length
          noi2=p.livematchesinfo[1].batting.score.length



          const battingteam1=p.livematchesinfo[0].batting.team
          const srs1 =p.livematches[0].srs
          const mnum1=p.livematches[0].mnum
          const status1 = p.livematches[0].status
          const runs1=p.livematchesinfo[0].batting.score[noi1-1].runs
          const wkt1=p.livematchesinfo[0].batting.score[noi1-1].wickets


          const battingteam2=p.livematchesinfo[1].batting.team
          const srs2 =p.livematches[1].srs
          const mnum2=p.livematches[1].mnum
          const status2 = p.livematches[1].status
          const runs2=p.livematchesinfo[1].batting.score[noi2-1].runs
          const wkt2=p.livematchesinfo[1].batting.score[noi2-1].wickets






    res.render("home",{runs1:runs1,wkt1:wkt1,srs1:srs1,mnum1:mnum1,status1:status1,battingteam1:battingteam1,runs2:runs2,wkt2:wkt2,srs2:srs2,mnum2:mnum2,status2:status2,battingteam2:battingteam2});

    });

    // Handle error output
    scriptExecution.stderr.on('data', (data) => {
        // As said before, convert the Uint8Array to a readable string.
        console.log(uint8arrayToString(data));
    });

    scriptExecution.on('exit', (code) => {
        console.log("Process quit with code : " + code);
    });
  })












    app.listen(3000,function(req,res){
      console.log("Server chalu ho gya hai")
    });
