import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded(import.meta.url));

let posts = [];

app.get("/",(req,res)=>{
    res.render("index.ejs",{posts : posts});
});

app.get("/create",(req,res)=>{
    res.render("create.ejs");
});

app.post("/create",(req,res)=>{
    posts.push({id : posts.length+1,title:req.body['title'],content:req.body['content']});
    res.redirect("/");
})

app.get("/update/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);  
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});


app.post("/edit",(req,res)=>{
    const {id,title,content} = req.body;
    const post = posts.find(p=> p.id == id);
    if(post){
        post.title = title;
        post.content = content;
        res.redirect("/");
    }else{
        res.status(404).send("POST NOT FOUND");
    }
});

app.post("/delete/:id",(req,res)=>{
    posts = posts.filter(p=> p.id != req.params.id);
    res.redirect("/");
});


app.listen(port,(req,res)=>{
    console.log(`Starting ${port}`);
})