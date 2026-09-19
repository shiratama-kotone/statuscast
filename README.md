# StatusCast Server

フォークして自分のRenderアカウントにデプロイするだけで、誰でも自分専用のサーバーを持てます。
コードの書き換えは不要です。

## デプロイ手順
1. このフォルダの中身をGitHubの新規リポジトリにアップロード(またはフォーク)
2. Renderのダッシュボードで「New +」→「Blueprint」を選択
3. 手順1のGitHubリポジトリを選択する( `render.yaml` が自動検出されます)
4. そのままデプロイを実行する
   ( `SHARED_SECRET` はランダムな値が自動生成され、コードを書き換える必要はありません)
5. デプロイ完了後、Renderの「Environment」タブを開き `SHARED_SECRET` の値をコピーする
6. 発行されたURL(例: `https://xxxx.onrender.com`)の末尾に `/update` を付けたものと、
   手順5でコピーした `SHARED_SECRET` の値を、Androidアプリの設定画面(サーバーURL/合言葉欄)に入力する

## API
- `POST /update` : Androidアプリからの送信を受け取る(secretキーで保護)
- `GET /status` : 最新の状態をJSONで返す(誰でもアクセス可、CORS許可済み)
  ```json
  {
    "app": "com.example.app",
    "music": { "title": "曲名", "artist": "アーティスト名" },
    "timestamp": 1234567890123
  }
  ```

## 注意
- Render無料プランは一定時間アクセスがないとスリープします。
  スリープ中は最初のリクエストが数十秒遅れることがあります。
- 状態はメモリ上にのみ保持されるため、サーバー再起動で消えます(履歴保存はしていません)。
