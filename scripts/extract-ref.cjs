const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4568;
const ROOT = path.resolve(__dirname, '..');
const VIDEO_PATH = path.join(ROOT, 'Public', 'WhatsApp Video 2026-09-11 at 20.33.17.mp4');
const OUT_DIR = path.join(ROOT, 'public_assets', 'ref_frames');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE html>
<html>
<body>
  <video id="vid" src="/video.mp4" playsinline muted crossOrigin="anonymous" preload="auto"></video>
  <canvas id="cvs"></canvas>
  <div id="status">Loading...</div>
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

      cvs.width = vid.videoWidth || 1280;
      cvs.height = vid.videoHeight || 720;
      const duration = vid.duration;
      const timestamps = [0.5, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0].filter(t => t < duration);

      for (let i = 0; i < timestamps.length; i++) {
        vid.currentTime = timestamps[i];
        await new Promise(r => vid.addEventListener('seeked', r, { once: true }));
        ctx.drawImage(vid, 0, 0, cvs.width, cvs.height);
        const blob = await new Promise(r => cvs.toBlob(r, 'image/jpeg', 0.85));
        const buf = await blob.arrayBuffer();
        await fetch('/save?frame=' + i, { method: 'POST', body: buf });
        status.innerText = 'Saved frame ' + i;
      }
      status.innerText = 'DONE';
      document.title = 'REF_DONE';
    }
    window.onload = extract;
  </script>
</body>
</html>
    `);
    return;
  }

  if (url.pathname === '/video.mp4') {
    const stat = fs.statSync(VIDEO_PATH);
    res.writeHead(200, { 'Content-Length': stat.size, 'Content-Type': 'video/mp4' });
    fs.createReadStream(VIDEO_PATH).pipe(res);
    return;
  }

  if (url.pathname === '/save' && req.method === 'POST') {
    const f = url.searchParams.get('frame');
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      fs.writeFileSync(path.join(OUT_DIR, `ref_${f}.jpg`), Buffer.concat(chunks));
      res.end('ok');
    });
    return;
  }

  res.end('404');
});

server.listen(PORT, () => {
  console.log('Server on ' + PORT);
});
