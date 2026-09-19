const express = require('express');
const cors = require('cors');
const app = express();

// アイコン画像(Base64)を含むためボディサイズの上限を広げる
app.use(express.json({ limit: '5mb' }));

// GETはHTMLから直接fetchできるよう誰でもアクセス可能にする
app.use(cors());

// POST(スマホからの送信)だけをこの合言葉で保護する
// Renderの環境変数 SHARED_SECRET に設定してください
const SHARED_SECRET = process.env.SHARED_SECRET || 'CHANGE_ME_SECRET';

let latestStatus = {
  app: { package: null, name: null, icon: null },
  music: { title: null, artist: null, positionMs: null, durationMs: null },
  timestamp: null,
};

app.post('/update', (req, res) => {
  const { secret, app: foregroundApp, music, timestamp } = req.body || {};

  if (secret !== SHARED_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  latestStatus = {
    app: {
      package: foregroundApp?.package ?? null,
      name: foregroundApp?.name ?? null,
      // iconはPNG画像のBase64文字列。<img src="data:image/png;base64,...">でそのまま表示可能
      icon: foregroundApp?.icon ?? null,
    },
    music: {
      title: music?.title ?? null,
      artist: music?.artist ?? null,
      positionMs: music?.positionMs ?? null,
      durationMs: music?.durationMs ?? null,
    },
    timestamp: timestamp ?? Date.now(),
  };

  res.json({ ok: true });
});

app.get('/status', (req, res) => {
  res.json(latestStatus);
});

app.get('/', (req, res) => {
  res.send('StatusCast server is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`StatusCast server listening on port ${PORT}`);
});
