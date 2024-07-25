const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const winnerDisplay = document.getElementById('winner');
const editForm = document.getElementById('edit-form');

let segments = [
    'Prize 1',
    'Prize 2',
    'Prize 3',
    'Prize 4',
    'Prize 5',
    'Prize 6'
];

const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#D5AAFF', '#ABABFF', '#FFABAB'];

let angle = 0;
const segmentAngle = (2 * Math.PI) / segments.length;

function drawWheel() {
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < segments.length; i++) {
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, angle + i * segmentAngle, angle + (i + 1) * segmentAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.stroke();
        
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + (i + 0.5) * segmentAngle);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(segments[i], radius - 10, 10);
        ctx.restore();
    }
}

function spinWheel() {
    const spinDuration = 5000;
    const spinAngle = Math.random() * 360;
    const spinSpeed = 20;

    let startTime = null;

    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;

        if (elapsed < spinDuration) {
            angle += (spinSpeed * Math.PI / 180);
            drawWheel();
            requestAnimationFrame(animate);
        } else {
            angle = angle % (2 * Math.PI);
            const winnerIndex = Math.floor((segments.length - (angle / segmentAngle) % segments.length) % segments.length);
            winnerDisplay.textContent = `Congratulations! ${segments[winnerIndex]} is the winner`;
            drawWheel();
        }
    }

    requestAnimationFrame(animate);
}

function updateSegmentNames(event) {
    event.preventDefault();

    segments = [
        document.getElementById('segment1').value,
        document.getElementById('segment2').value,
        document.getElementById('segment3').value,
        document.getElementById('segment4').value,
        document.getElementById('segment5').value,
        document.getElementById('segment6').value
    ];

    drawWheel();
}

drawWheel();

spinBtn.addEventListener('click', spinWheel);
editForm.addEventListener('submit', updateSegmentNames);
