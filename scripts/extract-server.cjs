const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4567;
const ROOT = path.resolve(__dirname, '..');
const VIDEO_PATH = path.join(ROOT, 'Public', 'grok-video-0414ac6b-d958-4f45-907b-4326a62c1e1b.mp4');
const FRAMES_DIR = path.join(ROOT, 'Public', 'frames', 'hero');

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Frame Extractor</title>
  <style>
    body { font-family: sans-serif; background: #111; color: #eee; padding: 20px; }
    #status { font-size: 18px; margin-bottom: 12px; font-family: monospace; color: #4ade80; }
    canvas { background: #000; border: 1px solid #333; max-width: 300px; }
  </style>
</head>
<body>
  <h2>VEYRA Hero Frame Extractor (12fps WebP)</h2>
  <div id="status">Initializing video...</div>
  <video id="vid" src="/video.mp4" playsinline muted crossOrigin="anonymous" preload="auto" style="display:none"></video>
  <canvas id="cvs" width="544" height="544"></canvas>

  <script>
    async function extract() {
      const vid = document.getElementById('vid');
      const cvs = document.getElementById('cvs');
      const ctx = cvs.getContext('2d');
      const status = document.getElementById('status');

      await new Promise(r => {
        if (vid.readyState >= 2) return r();
        vid.addEventListener('loadeddata', r, { once: true });
      });

      const duration = vid.duration || 6;
      const fps = 12;
      const totalFrames = Math.floor(duration * fps);
      status.innerText = 'Video loaded. Duration: ' + duration.toFixed(2) + 's (' + totalFrames + ' frames). Extracting...';

      for (let i = 0; i < totalFrames; i++) {
        const targetTime = Math.min(i / fps, duration - 0.01);
        vid.currentTime = targetTime;
        await new Promise(resolve => {
          vid.addEventListener('seeked', resolve, { once: true });
        });

        ctx.drawImage(vid, 0, 0, 544, 544);
        const blob = await new Promise(resolve => cvs.toBlob(resolve, 'image/webp', 0.88));
        const arrayBuf = await blob.arrayBuffer();

        await fetch('/save-frame?index=' + i + '&total=' + totalFrames, {
          method: 'POST',
          headers: { 'Content-Type': 'image/webp' },
          body: arrayBuf
        });

        status.innerText = 'Extracted frame ' + (i + 1) + ' / ' + totalFrames + ' (' + Math.round(((i + 1) / totalFrames) * 100) + '%)';
      }

      status.innerText = 'EXTRACTION COMPLETE: ' + totalFrames + ' frames saved to Public/frames/hero/';
      document.title = 'FINISHED';
    }

    window.addEventListener('load', () => {
      extract().catch(err => {
        document.getElementById('status').innerText = 'Error: ' + err.message;
      });
    });
  </script>
</body>
</html>
    `);
    return;
  }

  if (url.pathname === '/video.mp4') {
    if (!fs.existsSync(VIDEO_PATH)) {
      res.writeHead(404);
      return res.end('Video not found');
    }
    const stat = fs.statSync(VIDEO_PATH);
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(VIDEO_PATH, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4'
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': 'video/mp4'
      });
      fs.createReadStream(VIDEO_PATH).pipe(res);
    }
    return;
  }

  if (url.pathname === '/save-frame' && req.method === 'POST') {
    const index = parseInt(url.searchParams.get('index') || '0', 10);
    const filename = `frame_${String(index).padStart(3, '0')}.webp`;
    const destPath = path.join(FRAMES_DIR, filename);

    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(destPath, buffer);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, file: filename }));
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Extractor server listening at http://localhost:${PORT}`);
});
