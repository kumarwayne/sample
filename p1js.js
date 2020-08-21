// The path to your python script
var myPythonScript = "p1py.py";
// Provide the path of the python executable, if python is available as environment variable then you can use only "python"
var pythonExecutable = "python.exe";

// Function to convert an Uint8Array to a string
var uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};
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
          const arr=[]
          const p = JSON.parse(data);
          // data = JSON.parse(data);
          // console.log(data);
          // console.log(p.livematchesinfo[1].batting)
          nom=p.livematchesinfo.length
          console.log(nom)
          // console.log(p.livematches)
          // console.log(p.livematchesinfo[0].batting)

          for(i=0;i<=nom-1;i++)
          {
            try{const noi1=p.livematchesinfo[i].batting.score.length
              const infoo = {
              m : i,
              choice :'1',
              battingteam1:p.livematchesinfo[i].batting.team,
              bowlingteam1:p.livematchesinfo[i].bowling.team,
              srs1 :p.livematches[i].srs,
              mnum1:p.livematches[i].mnum,
              status1: p.livematches[i].status,
              runs1:p.livematchesinfo[i].batting.score[noi1-1].runs,
              wkt1:p.livematchesinfo[i].batting.score[noi1-1].wickets,
              overs:p.livematchesinfo[i].batting.score[noi1-1].overs
              }
              arr.push(infoo)
            }
            catch(err){
              const infoo = {

              choice :'2',
              srs1 :p.livematches[i].srs,
              mnum1:p.livematches[i].mnum,
              status1: p.livematches[i].status,


              }
              arr.push(infoo)
            }

          }





    res.render("home",{arr:arr});

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






app.get("/match/:matchno",function(req,res){
    var an = req.params.matchno
    console.log(an)
    const scriptExecution = spawn(pythonExecutable, [myPythonScript]);
    // Handle normal output
    scriptExecution.stdout.on('data', (data) => {

    const p = JSON.parse(data);
    // console.log(p.livematchesinfo)
    // console.log(p.livematches)

    noi1=p.livematchesinfo[an].batting.score.length

    const scoreinfo={
       battingteam1:p.livematchesinfo[an].batting.team,
       srs1 :p.livematches[an].srs,
       mnum1:p.livematches[an].mnum,
       status1 : p.livematches[an].status,
       runs1:p.livematchesinfo[an].batting.score[noi1-1].runs,
       wkt1:p.livematchesinfo[an].batting.score[noi1-1].wickets,


       noofinning:p.livematchesinfo[an].batting.score[noi1-1].inning_num,
  // print("(",noofinning,"Inning )")
  // print(battingteam,runs,"/",wkt)
  // print("\n")
       bat1:p.livematchesinfo[an].batting.batsman[0].name,
       bat1r:p.livematchesinfo[an].batting.batsman[0].runs,
       bat1b:p.livematchesinfo[an].batting.batsman[0].balls,
       bat1f:p.livematchesinfo[an].batting.batsman[0].fours,
       bat1s:p.livematchesinfo[an].batting.batsman[0].six,
       bat2:p.livematchesinfo[an].batting.batsman[1].name,
       bat2r:p.livematchesinfo[an].batting.batsman[1].runs,
       bat2b:p.livematchesinfo[an].batting.batsman[1].balls,
       bat2f:p.livematchesinfo[an].batting.batsman[1].fours,
       bat2s:p.livematchesinfo[an].batting.batsman[1].six
    }


res.render("score",{scoreinfo:scoreinfo})














   })
   scriptExecution.stderr.on('data', (data) => {
       // As said before, convert the Uint8Array to a readable string.
       console.log(uint8arrayToString(data));
   });

   scriptExecution.on('exit', (code) => {
       console.log("Process quit with code : " + code);
   });

  })





app.post("/",function(req,res){

   console.log(req.body.match)



})






    app.listen(3000,function(req,res){
      console.log("Server started")
    });
