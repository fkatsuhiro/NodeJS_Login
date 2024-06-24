# マークダウン記法文書PDF化アプリ

## 機能実装目的
普段LatexやWord等を用いて文書作成を行っている際にWordではPDF化できないものがあったり、Latexだと記述方法を覚えないといけないという点からもっと楽に使えるサービスはないかと思い作成に当たりました。

## 機能概要
本Webアプリケーションでは、簡単なログイン・ログアウト機能があり、ログイン認証が完了すると機能を利用することができます。

画面左側で内容を入力し、プレビューボタンをクリックすることで、画面右側に完成形が表示されます。さらに、PDFボタンをクリックすると文書をPDF化することができます。

## 認証ユーザー
すでにDBファイルを作成してあり、認証済みのユーザーを用意してあるので、自身の環境で以下のユーザーを用いて認証を行ってみてください。

### ユーザー1(katsuhiro)
- email: "katsuhiro@gmail.com"
- password: "password"

### ユーザー2(testuser)
- email: "sample@gmail.com"
- password: "password"

## 環境構築
本機能は、デプロイする予定はまだないため、環境構築の方法をここに明記しておきます。

### 前提条件

1. **Node.js**および**npm**のインストール
   - Node.jsおよびnpm（Node Package Manager）は、JavaScriptランタイム環境およびパッケージ管理ツールです。インストール方法は公式サイトからダウンロードできます。
   - [Node.js 公式サイト](https://nodejs.org/)

2. **Git**のインストール
   - ソースコード管理に使用します。インストール方法は公式サイトからダウンロードできます。
   - [Git 公式サイト](https://git-scm.com/)

### 環境構築手順

1. **リポジトリのクローン**
   - プロジェクトのソースコードをGitHubなどからクローンします。
   ```bash
   git clone https://github.com/fkatsuhiro/NodeJS_Login
   cd NodeJS_Login
   ```

2. **依存関係のインストール**
   - プロジェクトディレクトリ内で、必要なパッケージをインストールします。
   ```bash
   npm install
   ```

3. **環境変数の設定**
   - アプリケーションで使用する環境変数を設定します。プロジェクトルートに`.env`ファイルを作成し、必要な環境変数を記載します。
   ```plaintext
   PORT=5000
   SECRET_KEY=your_secret_key
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   ```

4. **PDF化に必要なパッケージ**

    PDF化するための機能を利用するためには、以下のパッケージが必要です。これらのパッケージは、MarkdownをHTMLに変換し、HTMLをPDFに変換するために使用されます。

    ### 必要なパッケージ

    - **express**
        - Webサーバーを構築するためのフレームワーク
        ```bash
        npm install express
        ```

    - **body-parser**
        - HTTPリクエストのボディを解析するためのミドルウェア
        ```bash
        npm install body-parser
        ```

    - **marked**
        - MarkdownをHTMLに変換するためのライブラリ
        ```bash
        npm install marked
        ```

    - **puppeteer**
        - ヘッドレスブラウザを操作してHTMLをPDFに変換するためのライブラリ
        ```bash
        npm install puppeteer
        ```

    - **ejs**
        - テンプレートエンジン
        ```bash
        npm install ejs
        ```

    ### package.json の一例

    以下は、これらのパッケージが含まれた `package.json` の一例です。

    ```json
        {
        "name": "pdf-generator",
        "version": "1.0.0",
        "description": "A simple PDF generator from Markdown",
        "main": "server.js",
        "scripts": {
            "start": "node server.js"
        },
        "dependencies": {
            "body-parser": "^1.19.0",
            "express": "^4.17.1",
            "ejs": "^3.1.6",
            "marked": "^2.0.0",
            "puppeteer": "^10.0.0"
        }
        }
    ```

5. **アプリケーションの起動**
   - サーバーを起動します。
   ```bash
   npm start
   ```

6. **ブラウザでアプリケーションにアクセス**
   - ブラウザで`http://localhost:5000`にアクセスし、ログイン画面が表示されることを確認します。

### フォルダ構成（例）

以下はプロジェクトのフォルダ構成の一例です：

```
/project-directory
├── /db
│   └── User.js
├── /node_modules
├── /public
│   └── style.css
├── /routes
│   ├── auth.js
│   └── Post.js
├── /views
│   ├── login.ejs
│   ├── register.ejs
│   └── top.ejs
├── .env
├── package.json
├── server.js
└── README.md
```

少し手間ですが、この手順で環境構築を行ってもらえますと、ご利用いただけると思います。

## デモ動画
後日公開予定(別のリポジトリから公開し、ここにリンクを張る予定です。)
