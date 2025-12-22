let app=require("./src/app.js");
let PORT=4000;
app.listen(PORT,(req,res)=>{
    console.log("server started"+PORT);
});
