const express = require('express');
const app = express();
const PORT = 5000;
const auth = require("./routes/auth");
const post = require("./routes/Post");

//ログイン用の画面取得
app.get("/login", (req, res) => {
    res.render("login.ejs");
    console.log("画面が表示されました。");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", auth);
app.use("/post", post);

app.get("/", (req,res) => {
    res.send("Hello Express");
});

app.listen(PORT, () => {
    console.log("サーバーを起動中・・・");
});