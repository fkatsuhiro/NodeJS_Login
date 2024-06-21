const router = require("express").Router();
const path = require('path');
const { body, validationResult } = require("express-validator");
const { User } = require("../db/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

// セッション設定
router.use(session({
    secret: "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
        checkPeriod: 86400000 // セッションの有効期限 (1日)
    })
}));

// ユーザー登録ページの表示
router.get("/register", (req, res) => {
    res.render("register");  // "register.ejs"をレンダリング
});

//ユーザー新規登録用の認証
router.post(
    "/register",
    //validation確認
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    async (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //DBにユーザーが存在しているか確認
        const user = User.find((user) => user.email === email);
        if (user) {
            return res.status(400).json([
                {
                    message: "すでにそのユーザーは存在しています。",
                },
            ]);
        }

        //パスワードの暗号化
        let hashedPassword = await bcrypt.hash(password, 10);
        //console.log(hashedPassword);

        //DBへの保存
        User.push({
            email,
            password: hashedPassword,
        })

        // セッションにユーザー情報を保存する
        req.session.username = user.username;
        console.log(req.session.username);

        // /top.ejsにリダイレクト
        res.redirect("/auth/top");

        //JWTの発行クッキーなどに保存することが望ましい
        const token = await JWT.sign({
            email,
        },
            //本来は直書きしてはいけない
            "SECRET_KEY",
            {
                expiresIn: "24h",
            }
        );

        return res.json({
            token: token,
        });


    });

//ログイン用のAPI
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = User.find((user) => user.email === email);

    // Userの配列内容をログ出力
    console.log("Received email:", email);
    console.log("Received password:", password);
    console.log("All users:", User);


    if (!user) {
        return res.status(400).json([
            {
                message: "そのユーザーは存在しません。",
            },
        ]);
    }

    // 平文のパスワードをbcryptでハッシュ化
    let hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);
    if (!isMatch) {
        return res.status(400).json([
            {
                message: "パスワードが異なります",
            }
        ]);
    }

    const token = await JWT.sign(
        { email },
        "SECRET_KEY",
        { expiresIn: "24h" }
    );

    // セッションにユーザー情報を保存する
    req.session.username = user.username;
    console.log(req.session.username);

    // /top.ejsにリダイレクト
    res.redirect("/auth/top");

    /*return res.json({
        token: token,
    });*/

});

// /top にGETリクエストが来た際の処理
router.get("/top", (req, res) => {
    // セッションからユーザー情報を取得する
    const username = req.session.username;
    // useremail をローカル変数として渡す
    res.render("top.ejs", { username });
});

// ログアウト用のAPI
router.get("/logout", (req, res) => {
    // セッションを破棄する
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "ログアウトに失敗しました。",
            });
        }
        // ログインページにリダイレクト
        res.redirect("/login");
    });
});

//DBのユーザーを確認するためのAPI
router.get("/allUsers", (req, res) => {
    return res.json(User);
});

module.exports = router;
