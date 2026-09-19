function myMiddlewares(req,res,next){
    console.log(req.method)
    next()
}
module.exports={myMiddlewares}