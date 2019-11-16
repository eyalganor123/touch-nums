/* 
touch the numbers game
*/

'use strict'
var gTable = [];
var gNextNumber = 1;
var gInterval;
var gIsGameOn = false;
var gTimer;
var gIsLevelDisplayed = false;
var gElLevel = document.querySelector('#level');

function init(level) {
    if (level === 0) {
        playAgain()
    } else {
        gElLevel.style.display = 'none';
        document.querySelector('h1').innerText = "Restart";
    }
    gTimer = 0;
    gTable = createTable(level);
    randomizeTableValues(gTable);
    console.table(gTable);
    render();
}

function createTable(num) {
    for (var i = 0; i < num; i++) {
        var tableRow = [];
        for (var j = 0; j < num; j++) {
            // var cell = createCell(i,j);
            var cell = {
                value: 0,
                isClicked: false
            };
            tableRow.push(cell)
        }
        gTable.push(tableRow);
    }
    return gTable;
}

function createCell(i, j) {
    var cell = {
        value: 0,
        isClicked: false
    };
    return cell;
}

function randomizeTableValues(table) {
    var nums = [];
    var tableSize = table.length;
    for (var i = 1; i <= tableSize * tableSize; i++) {
        nums.push(i);
    }
    nums = shuffle(nums);
    console.log(nums);
    var idxCounter = 0;
    for (var i = 0; i < table.length; i++) {
        var tableRow = table[i];
        for (var j = 0; j < tableRow.length; j++) {
            var cell = tableRow[j];
            cell.value = nums[idxCounter];
            idxCounter++;
        }

    }
}

function render() {
    var elTable = document.querySelector('#table');
    var elNextNumber = document.querySelector('#next-number');
    var elTimer = document.querySelector('#timer');
    var fontSize = 100/gTable.length;
    var strHtml = ''
    for (var i = 0; i < gTable.length; i++) {
        var row = gTable[i];
        strHtml += `<tr>`
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            if (gTable[i][j].isClicked === true) {
                var cellColor = 'yellow';
            } else var cellColor = 'cyan';
            strHtml += `<td onclick="cellClicked(${gTable[i][j].value},${i},${j})" 
            style="background:${cellColor};font-size:${fontSize}px">${cell.value}</td>`
        }
        strHtml += `</tr>`

    }
    elTable.innerHTML = strHtml;
    if (gNextNumber !== 'WINNER') {
        elNextNumber.innerHTML = `<div><div class='next-number' style="background:rgb(23, 212, 156);font-size:40px">${gNextNumber}</div></div>`
    } else {
        elNextNumber.innerHTML = `<div class='winner' style="background:red;font-size:30px">You Are A Winner</div>`
    }
    elTimer.innerText = gTimer;


}

function cellClicked(cellValue, i, j) {
    if (!gInterval) {
        startInterval()
    }

    if (cellValue === gNextNumber) {
        gTable[i][j].isClicked = true;
        if (gNextNumber >= (gTable.length ** 2)) {
            gNextNumber = 'WINNER';
            clearInterval(gInterval);
            gIsGameOn = false;
            setTimeout(function(){ playAgain(); }, 3000);
        } else gNextNumber++;
        render();
    }
}

function startInterval() {

    var startTime = Date.now()
    gInterval = setInterval(function () {
        var currentTime = Date.now()
        var timer = currentTime - startTime;
        gTimer = Math.round((timer), 3) / 1000;
        gTimer = Number(gTimer).toFixed(3)
        render();
    }, 100);

}

function playAgain() {
    // if (gIsLevelDisplayed === false) {
    gTable = [];
    if (gInterval) {
        clearInterval(gInterval)
    };
    gInterval = '';
    gNextNumber = 1;
    render();
    document.querySelector('h1').innerText = "Touch the Numbers";
    gElLevel.style.display = 'block';
    var strHtml = ""
    strHtml = `<div style="background: transparent;font-size:55px; color:red">choose level<br>👇</div>`
    strHtml += `<span class='level-choice' onclick="init(3)">1</span>`
    strHtml += `<span class='level-choice' onclick="init(4)">2</span>`
    strHtml += `<span class='level-choice' onclick="init(5)">3</span>`
    strHtml += `<span class='level-choice' onclick="init(6)">4</span><br><br>`
    strHtml += `<span class='level-choice' onclick="init(7)">5</span>`
    strHtml += `<span class='level-choice' onclick="init(8)">6</span>`
    strHtml += `<span class='level-choice' onclick="init(9)">7</span>`
    strHtml += `<span class='level-choice' onclick="init(10)">8</span>`
    gElLevel.innerHTML = strHtml;    gIsLevelDisplayed = true;

}