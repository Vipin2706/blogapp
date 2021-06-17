const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://admin_vipin:vipin1234@cluster0.nvnya.mongodb.net/blogDB" , { useNewUrlParser:true , useUnifiedTopology:true});

const blogSchema = new mongoose.Schema({
   title:{
     type:String,
     required:true
   },
   content:{
    type:String,
    required:true
  }
})

const Blogs = mongoose.model("Blog",blogSchema)



app.get("/", (req, res) => {
  res.render("home");
});

app.get("/compose", (req, res) => {
  
  res.render("compose")
  });



app.post("/compose", (req, res) => {
const blogTitle = req.body.BlogTitle;
const blogContent = req.body.BlogContent;
// 
const blog = new Blogs({
  title:blogTitle,
  content:blogContent
})
blog.save();
  res.redirect("/blogs")
});

app.get("/blogs",(req,res)=>{
  Blogs.find({},(err,foundBlogs)=>{
    if(!err){
      res.render("blogs",{
        myBlogs  : foundBlogs
      })
    }
  })

 
})

app.listen(3000, () => {
  console.log("server started ");
});
