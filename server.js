const express = require('express');
const app = express();
const PORT = 5000;
const auth = require('./routes/auth');
const post = require('./routes/Post');
const bodyParser = require('body-parser');
const { marked } = require('marked'); 
const puppeteer = require('puppeteer');
const path = require('path');

// ログイン用の画面取得
app.get('/login', (req, res) => {
    res.render('login.ejs');
    console.log('画面が表示されました。');
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/auth', express.static(path.join(__dirname, 'public')));
app.use('/auth', auth);
app.use('/post', post);

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.post('/preview', (req, res) => {
    const markdownContent = req.body.markdown;
    const htmlContent = marked(markdownContent);
    res.send({ html: htmlContent });
});

app.post('/pdf', async (req, res) => {
    const markdownContent = req.body.markdown;
    const htmlContent = marked(markdownContent);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf();
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
    res.send(pdfBuffer);
});

// サーバー起動
app.listen(PORT, () => {
    console.log('サーバーを起動中・・・');
});
