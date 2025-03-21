document.addEventListener("DOMContentLoaded", () => {
    let boxes = document.querySelectorAll('.box');
    let resetBtn = document.querySelector('#reset');
    let turnO = true; // Player O starts
    let newGameBtn = document.querySelector('#new-btn');
    let msgContainer = document.querySelector('.msg-container');
    let msg = document.querySelector('#msg');

    const winPatterns = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8],
        [1, 4, 7], [2, 5, 8], [2, 4, 6],
        [3, 4, 5], [6, 7, 8]
    ];

    // Ajout d'une animation lors du clic
    boxes.forEach((box) => {
        box.addEventListener('click', function () {
            if (box.innerText !== "") return;

            box.style.transform = "scale(0)"; // Réduit à 0 avant d'afficher
            setTimeout(() => {
                box.innerText = turnO ? 'O' : 'X';
                box.style.color = turnO ? 'white' : 'white';
                box.style.transform = "scale(1)"; // Réanime en grandissant
            }, 200);
            
            turnO = !turnO;
            box.disabled = true;
            setTimeout(checkWinner, 300);
        });
    });

    const enableBoxes = () => {
        boxes.forEach((box) => {
            box.disabled = false;
            box.innerText = "";
            box.classList.remove("win");
        });
    };

    const disableBoxes = () => {
        boxes.forEach((box) => {
            box.disabled = true;
        });
    };

    const showWinner = (winner, winningPattern) => {
        msg.innerText = `🎉 Bravo, ${winner} a gagné !`;
        msgContainer.classList.remove('hide');

        // Animation des cases gagnantes
        winningPattern.forEach(index => {
            boxes[index].classList.add("win");
        });

        disableBoxes();
    };

    const checkWinner = () => {
        let hasWin = false;
        for (let pattern of winPatterns) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;

            if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1, pattern);
                hasWin = true;
                return;
            }
        }

        if (!hasWin) {
            const allBoxes = [...boxes].every(box => box.innerText !== "");
            if (allBoxes) {
                msgContainer.classList.remove('hide');
                msg.innerText = '😲 Match Nul !';
            }
        }
    };

    const resetGame = () => {
        turnO = true;
        enableBoxes();
        msgContainer.classList.add('hide');
    };

    // Boutons reset et new game
    newGameBtn.addEventListener('click', resetGame);
    resetBtn.addEventListener('click', resetGame);
});
