function myMiddleWare(req,res,next){
    console.log(req.method)
    next();
}
module.exports={myMiddleWare}