// script.js
const config = {
    debug: {
        mousePoint: true,
        colisions: false,
    }
};


const canvas = document.getElementById("gameCanvas");
canvas.willReadFrequently = true;
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const spaceship = new Image();
spaceship.src = "images/spaceship.png"; // Replace with the actual path to your spaceship image

const spaceshipSize = {
    width: 50, // Adjust the width and height to match your image dimensions
    height: 80,
};

const spaceshipData = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: spaceshipSize.width,
    height: spaceshipSize.height,
    rotation: 0,
};

const lasers = [];


const mouse = {
    x: 0,
    y: 0,
}

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX - canvas.getBoundingClientRect().left;
    mouse.y = e.clientY - canvas.getBoundingClientRect().top;

    const centerX = spaceshipData.x;
    const centerY = spaceshipData.y;

    const angle = Math.atan2(mouse.y - centerY, mouse.x - centerX);
    spaceshipData.rotation = angle;
});

setInterval(() => {
    const laser = {
        x: spaceshipData.x,
        y: spaceshipData.y,
        speed: 5,
        angle: spaceshipData.rotation,
    };

    lasers.push(laser);
}, 250);

drawAimPoint = () => {
    ctx.beginPath();
    ctx.strokeStyle = "#a8189a"; // Red color
    ctx.lineWidth = 2;
    ctx.arc(mouse.x, mouse.y, 20, 0, 2 * Math.PI);
    ctx.stroke();
}


function drawBoundingBox(x, y, width, height) {
    ctx.strokeStyle = "#00FF00"; // Green color
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
}


function drawSpaceship() {
    ctx.save();
    ctx.translate(spaceshipData.x, spaceshipData.y);
    ctx.rotate(spaceshipData.rotation+Math.PI/2);

    ctx.drawImage(spaceship, -spaceshipData.width / 2, -spaceshipData.height / 2, spaceshipData.width, spaceshipData.height);
    //ctx.drawImage(spaceship, 0, 0, spaceshipData.width, spaceshipData.height);

    if(config.debug.colisions) {
        console.log('collisions enabled');

        drawBoundingBox(-spaceshipData.width / 2, -spaceshipData.height / 2, spaceshipData.width, spaceshipData.height);
    };

    ctx.restore();
}

function drawLasers() {
    ctx.fillStyle = "#2bff00"; // Red color
    lasers.forEach((laser) => {
        ctx.save();
        ctx.translate(laser.x, laser.y);
        ctx.rotate(laser.angle);
        ctx.fillRect(-1, -1, 10, 2); // Laser beam
        ctx.restore();
    });
}

function moveLasers() {
    lasers.forEach((laser) => {
        laser.x += Math.cos(laser.angle) * laser.speed;
        laser.y += Math.sin(laser.angle) * laser.speed;
    });
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(config.debug.mousePoint) drawAimPoint();
    
    drawLasers();
    drawSpaceship();
    moveLasers();

}

// Load the spaceship image
spaceship.onload = () => {
    animate();
};
