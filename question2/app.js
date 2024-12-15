const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let latency = 0;
video.src = 'http://localhost:8080';

const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => {
    const arrivedTime = new Date();
    const data = JSON.parse(event.data);
    const serverProcessingTime = new Date(data.processingTime);
    latency = (arrivedTime - serverProcessingTime) / 1000;
}

video.addEventListener('play', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
});


function updateOverlay() {
    if (!video.paused && !video.ended) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '24px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`latency: ${latency}s`, 10, 60);

        requestAnimationFrame(updateOverlay);
    }
}

video.addEventListener('play', updateOverlay);

