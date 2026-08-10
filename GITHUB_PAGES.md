# 幻想音律 - Phantom Resonance

このフォルダはGitHub Pagesでそのまま公開できる静的HTMLゲームです。

## 公開方法

1. GitHubでリポジトリを作成
2. このフォルダの中身をリポジトリのルートへアップロード
3. `assets/Acid Tunnel of Love.mp3` を `assets` フォルダへ配置
4. GitHubの **Settings → Pages**
5. **Deploy from a branch**
6. Branchを `main`、Folderを `/ (root)` に設定
7. Save

数分後にGitHub PagesのURLからプレイできます。

## ローカル確認

`index.html`を直接ダブルクリックせず、HTTPサーバー経由で開いてください。

例:

```text
python -m http.server 8000
```

その後:

```text
http://localhost:8000/
```
