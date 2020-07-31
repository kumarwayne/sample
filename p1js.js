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
          const arr=[]
          const p = JSON.parse(data);
          // data = JSON.parse(data);
          // console.log(data);
          // console.log(p.livematchesinfo[1].batting)
          nom=p.livematchesinfo.length
          console.log(nom)

          for(i=0;i<=nom-1;i++)
          {
            const noi1=p.livematchesinfo[i].batting.score.length
              const infoo = {

              battingteam1:p.livematchesinfo[i].batting.team,
              srs1 :p.livematches[i].srs,
              mnum1:p.livematches[i].mnum,
              status1: p.livematches[i].status,
              runs1:p.livematchesinfo[i].batting.score[noi1-1].runs,
              wkt1:p.livematchesinfo[i].batting.score[noi1-1].wickets
              }
              arr.push(infoo)


          }
          console.log(arr)


          // noi2=p.livematchesinfo[1].batting.score.length
          // const battingteam2=p.livematchesinfo[1].batting.team
          // const srs2 =p.livematches[1].srs
          // const mnum2=p.livematches[1].mnum
          // const status2 = p.livematches[1].status
          // const runs2=p.livematchesinfo[1].batting.score[noi2-1].runs
          // const wkt2=p.livematchesinfo[1].batting.score[noi2-1].wickets
    // ,runs2:runs2,wkt2:wkt2,srs2:srs2,mnum2:mnum2,status2:status2,battingteam2:battingteam2





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

  app.get("/live",function(req,res){

    const scriptExecution = spawn(pythonExecutable, [myPythonScript]);
    // Handle normal output
    scriptExecution.stdout.on('data', (data) => {

    const p = JSON.parse(data);

    noi1=p.livematchesinfo[0].batting.score.length


    const battingteam1=p.livematchesinfo[0].batting.team
    const srs1 =p.livematches[0].srs
    const mnum1=p.livematches[0].mnum
    const status1 = p.livematches[0].status
    const runs1=p.livematchesinfo[0].batting.score[noi1-1].runs
    const wkt1=p.livematchesinfo[0].batting.score[noi1-1].wickets


noofinning=p.livematchesinfo[0].batting.score[noi1-1].inning_num
runs=p.livematchesinfo[0].batting.score[noi1-1].runs
wkt=p.livematchesinfo[0].batting.score[noi1-1].wickets
// print("(",noofinning,"Inning )")
// print(battingteam,runs,"/",wkt)
// print("\n")
bat1=p.livematchesinfo[0].batting.batsman[0].name
bat1r=p.livematchesinfo[0].batting.batsman[0].runs
bat1b=p.livematchesinfo[0].batting.batsman[0].balls
bat1f=p.livematchesinfo[0].batting.batsman[0].fours
bat1s=p.livematchesinfo[0].batting.batsman[0].six
bat2=p.livematchesinfo[0].batting.batsman[1].name
bat2r=p.livematchesinfo[0].batting.batsman[1].runs
bat2b=p.livematchesinfo[0].batting.batsman[1].balls
bat2f=p.livematchesinfo[0].batting.batsman[1].fours
bat2s=p.livematchesinfo[0].batting.batsman[1].six

res.render("score",{runs1:runs1,wkt1:wkt1,srs1:srs1,mnum1:mnum1,status1:status1,battingteam1:battingteam1,bat1:bat1,bat1r:bat1r,bat1b:bat1b,bat1f:bat1f,bat1s:bat1s,bat2:bat2,bat2r:bat2r,bat2b:bat2b,bat2f:bat2f,bat2s:bat2s})














   })
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
