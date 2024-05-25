    //create author api app
    const exp=require('express');
    const authorApp=exp.Router();
    const expressAsyncHandler=require('express-async-handler')
    const bcryptjs=require('bcryptjs')
    const jwt=require('jsonwebtoken')
    const verifyToken =require('../Middlewares/verifyToken')
    require('dotenv').config()


    let authorcollection;
    let articlecollection;
    //get usercollection app
    authorApp.use((req,res,next)=>{
        authorcollection=req.app.get('authorcollection')
        articlecollection=req.app.get('articlecollection')
        next()
    })


    // author registration
    authorApp.post('/user',expressAsyncHandler(async(req,res)=>{
        //get user resource from client
        const newUser=req.body;
        //check for duplicate user based on username
        const dbuser=await authorcollection.findOne({username:newUser.username})
        //if user found in db
        if(dbuser!==null){
            res.send({message:"User existed"})
        }else{
            //hash the password
            const hashedPassword=await bcryptjs.hash(newUser.password,6)
            //replace plain pw with hashed pw
            newUser.password=hashedPassword;
            //create user
            await authorcollection.insertOne(newUser)
            //send res 
            res.send({message:"Author created"})
        }
    }))


    //author login route
    authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
        //get cred obj from client
        const userCred = req.body;
        //check for username
        const dbuser = await authorcollection.findOne({username:userCred.username})
        if(dbuser===null){
            res.send({message:"Invalid username"})
        }else{
            //check for password
        const status=await bcryptjs.compare(userCred.password,dbuser.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }else{
            //create jwt token and encode it
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            //send res
            res.send({message:"login success",token:signedToken,user:dbuser})
            }
        }
    }))

    //adding new article by author route
    authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
        //get new article from client
        const newArticle=req.body;
        //post to artciles collection
        await articlecollection.insertOne(newArticle)
        //send res
        res.send({message:"New article created"})
    }))


    //modify artcile by author
    authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
        //get modified article from client
        const modifiedArticle = req.body;
    
        //update by article id
        let result = await articlecollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
        let lataestArticle = await articlecollection.findOne({articleId:modifiedArticle.articleId})
        res.send({message:"Article modified",article:lataestArticle})
    }))

    //delete an article by article ID
    authorApp.put('/article/:articleId',verifyToken ,expressAsyncHandler(async(req,res)=>{
        //get articleId from url
        const artileIdFromUrl=(+req.params.articleId);
        //get article 
        const articleToDelete=req.body;
        //update status of article to false for deletion
        if(articleToDelete.status===true){
            let modifiedArt= await articlecollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
            res.send({message:"article deleted", payload:modifiedArt.status})
        }
        //update status of article to true for restoration
        if(articleToDelete.status===false){
            let modifiedArt= await articlecollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
            res.send({message:"article restored",payload:modifiedArt.status})
        }
    }))


    //view articles of author
    authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
        //get author's username from url
        const authorName=req.params.username;
        //get atricles whose status is true
        const articlesList=await articlecollection.find({username:authorName}).toArray()
        res.send({message:"List of articles",payload:articlesList})
    }))

    //export userApp
    module.exports=authorApp;



    