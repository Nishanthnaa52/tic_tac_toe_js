const gameBoard = document.querySelector('.gameboard');

const gameInfo = document.querySelector('.info');

gameInfo.innerHTML = '<span style="color: rgb(35, 165, 90)">Circle</span> plays first';

const gameBoxs = ["","","","","","","","",""];

let start = "circle";

function gameBox () {
    gameBoxs.forEach((_cell, index) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.id = index;
        box.addEventListener('click', addGo);
        gameBoard.append(box);
    })
}

gameBox()


function addGo (e) {
    const goDisay = document.createElement('div');
    goDisay.classList.add(start);
    e.target.append(goDisay);
    start = start === 'circle' ? 'cross' : 'circle';
    gameInfo.innerHTML = `it is now <span style="color: ${start === 'cross' ? 'rgb(242, 63, 67)' : 'rgb(35, 165, 90)'}">${start}</span>'s turn`;
    e.target.removeEventListener("click", addGo);

    checkScore();
}

function checkScore() {
    const allBox = document.querySelectorAll('.box')
    const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6,],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]

    let winnerFound = false;

    winningCombos.forEach(array => {
        const circleWins = array.every(cell => allBox[cell].firstChild?.classList.contains('circle'))
        if (circleWins) {
            gameInfo.innerHTML = "<span style='color: rgb(35, 165, 90)'>Circle</span> Wins!";
            allBox.forEach(box => box.replaceWith(box.cloneNode(true)));
            document.location.hash = "#gameOver";
            winnerFound = true;
        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => allBox[cell].firstChild?.classList.contains('cross'))
        if (crossWins) {
            gameInfo.innerHTML = "<span style='color: rgb(242, 63, 67)'>Cross</span> Wins!";
            allBox.forEach(box => box.replaceWith(box.cloneNode(true)));
            document.location.hash = "#gameOver";
            winnerFound = true;
        }
    })

    if (!winnerFound) {
        const isDraw = [...allBox].every(box => box.firstChild);
        if (isDraw) {
            gameInfo.innerHTML = "<span style='color: rgb(226 219 85);'>Draw</span>!";
            allBox.forEach(box => box.replaceWith(box.cloneNode(true)));
            document.location.hash = "#gameOver";
        }
    }
}
