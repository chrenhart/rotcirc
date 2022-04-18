const canvas = document.getElementById('canvas1');

const nPoints = 2;
const nRads = 13;

var ctx = canvas.getContext('2d');
var w = window.innerWidth;
var h = window.innerHeight;

var points = [];
var rads = [];
var arcStartVals = [];
var arcEndVals = [];
var speeds = [];
var strokes = [];
var arcCols = [];
var counter = 0;

const iv = setInterval(drawShapes, 20);

function init() {
    for (let i = 0; i < nPoints; i++) {
        let p = createPoint(w, h);
        points.push(p);  
    }
    
    for (let i = 0; i < ((nRads * nPoints) + nPoints); i++) { 
        let r = getInt(30, 200);
        rads.push(r);
        
        let s = Math.random() * 2 * Math.PI;
        arcStartVals.push(s);
        
        let e = Math.random() * 2 * Math.PI;
        arcEndVals.push(e);
        
        let v = (Math.random()) * 0.01 - (Math.random() * 0.01)
        speeds.push(v);
        
        let l = getInt(2, 5);
        strokes.push(l);
        
        let c = getColor();
        arcCols.push(c);
    }
}


window.onload = init(); {
    //w = window.innerWidth;
    //h = window.innerHeight;
    
    canvas.width = w;
    canvas.height = h;
    
    ctx.fillStyle = 'FloralWhite';
    ctx.fillRect(0, 0, w, h);
    drawShapes();
       
}

function drawShapes() {
    clear();
    ctx.globalAlpha = 0.2;
    
    for (let j = 0; j < points.length; j++) {
        for (let i = 0; i < rads.length; i++) {
            ctx.lineWidth = strokes[i];
            ctx.strokeStyle = arcCols[i];
            
            ctx.beginPath();    
            ctx.arc(points[j].x, points[j].y, rads[i * (j + 1)], arcStartVals[i * (j + 1)], arcEndVals[i * (j + 1)]);
            ctx.stroke();
            arcStartVals[i * (j + 1)] += speeds[i * (j + 1)];
            arcEndVals[i * (j + 1)] += speeds[i * (j + 1)];
        }
        if (j % 4 == 0) {
            points[j].x += (Math.sin(counter * 0.01) * Math.random());
            points[j].y += (Math.cos(counter * 0.01) * Math.random());
        } else if (j % 4 == 1) {
            points[j].x += (Math.cos(counter * 0.01) * Math.random());
            points[j].y += (Math.sin(counter * 0.01) * Math.random());
        } else if (j % 4 == 2) {
            points[j].x += (Math.sin(counter * 0.01) * Math.random());
            points[j].y += (Math.cos(counter * 0.01) * Math.random());
        } else if (j % 4 == 3) {
            points[j].x += (Math.cos(counter * 0.01) * Math.random());
            points[j].y += (Math.sin(counter * 0.01) * Math.random());
        }
    }
    counter++;
}

function clear() {
    ctx.clearRect(0, 0, w, h);
}


function getColor() {
    var cols = ['Crimson', 'DarkSlateBlue', 'Coral', '#14847b', '#6d6d6d'];
    return cols[Math.floor(Math.random() * cols.length)]
}

function createPoint(w, h) {
    var point = {
        x: getInt(0, w),
        y: getInt(0, h)
    }
    return point;
}

function getInt(min, max) {
    return Math.floor(Math.random() * max) + min + 1;
}