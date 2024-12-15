const http = require('http');
const {spawn} = require('child_process');
const WebSocket = require('ws');

const RTSP_URL = 'rtsp://210.99.70.120:1935/live/cctv007.stream';
let activeWs = null;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'video/webm',
        'Transfer-Encoding': 'chunked',
    });

    const ffmpeg = spawn('ffmpeg', [
        '-rtsp_transport', 'tcp',
        '-i', RTSP_URL,
        '-c:v', 'libvpx',
        '-c:a', 'libvorbis',
        '-f', 'webm',
        'pipe:1',
    ]);

    ffmpeg.stdout.pipe(res);

    ffmpeg.stderr.on('data', () => {
        if (!activeWs) return;
        activeWs.send(JSON.stringify({processingTime: new Date().toISOString()}));
    });

    req.on('close', () => {
        console.log('Client disconnected');
        ffmpeg.kill('SIGINT');
    });
});

const wss = new WebSocket.Server({server});
wss.on('connection', (ws) => {
    activeWs = ws;
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
