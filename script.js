let boxes = document.querySelectorAll('.box');// selection de chaque box (button)
let resetBtn = document.querySelector('#reset');// selection du bouton réinitialiser
let turnO = true; // Player O commence le jeu
let newGameBtn = document.querySelector('#new-btn'); // selection bouton pour une nouvelle partie
let msgContainer = document.querySelector('.msg-container'); //selection du conteneur avec le message gagnant
let msg = document.querySelector('#msg'); // selection du message annonciateur du gagnant

const winPatterns = [ //tableau servant de référence à la selection des combinaison gagnantes
    [0, 1, 2],// cases de gauche à droite en commençant à partir du coin gauche
    [0, 3, 6], // cases horizontales en commancçant du point gauche vers le bas
    [0, 4, 8], // case diagonales en commançant par le coin haut et gauche
    [1, 4, 7], //etc...
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => { // boucles sur chaque "box"
    box.addEventListener('click', function () { // evènement clic + callback fonction
        if (box.innerText !== "") {// vérifie si la box n'est pas vide et si c'est en effet pas vide
            return; // alors on retourne le résultat afin d'empêcher une resélection de la même case par la suite si elle n'est pas vide
        }

        box.style.transform = "scale(0)"; // animation css qui rétrécit la box jusqu'à la faire disparaitre au clic
        setTimeout(() => { // retardataire léger de 0.2secondes
            if (turnO) { // si c'est bien le jour O qui commence la partie alors
                box.innerText = 'O'; // dans la box je dois voir cette chaine de caractère "O"
                box.style.color = 'purple'; // donc elle apparaitra en violet
                turnO = false; // et la valeur du joueur O passe à false car son tour vient de passer
            } else { // sinon Le jeu est déjà commencé et le 2ème joueur qui s'active 
                box.innerText = 'X'; // on doit voir dans la box cette chaine de caractère "X"
                box.style.color = 'yellow';// donc elle apparaitra en jaune
                turnO = true; // son tour vient de passer et le joueur O repasse à "true" => ce qui peur de nouveau nous faire revenir sur la condition première
            }
            box.style.transform = "scale(1)"; //redimensionne la box
            box.disabled = true; // la box est désactivé grossomodo onnpeut pas recliquer dessus si c'est pas vide
            checkWinner();
        }, 200);
    });
});

const enableBoxes = () => { // activer la box
    for (let box of boxes) {
        box.disabled = false; // la désactivation des box n'est pas enclenché
        box.innerText = ""; // vérifie que les "box" soient vides
        box.style.transform = "scale(1)";// reprends un taille de "box" normal
    }
};

const disableBoxes = () => { // désactiver la box
    for (let box of boxes) {
        box.disabled = true;// désactivation des "box"
    }
};

const showWinner = (winner) => { // vérifier la gagnant
    msg.innerText = `🎉 Bravo, ${winner} a gagné !`; // message affichant le gagnant
    msgContainer.classList.remove('hide'); // retire la camouflage du message "winner"
    disableBoxes();// désactive les "bo" une fois qu'un gagnant a été trouvé 
};

const checkWinner = () => {// vérifier le gagnant 
    let hasWin = false; // pas de gagnant au départ
    for (let pattern of winPatterns) {
        console.log(`Vérification deu triplet : ${pattern[0]}, ${pattern[1]}, ${pattern[2]}`);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        console.log(`Valeurs des cases: pos1Val = ${pos1Val}, pos2Val = ${pos2Val}, pos3Val = ${pos3Val}`);
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "" && 
            pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            hasWin = true;
            return;
        }
    }

    if (!hasWin) {
        let allBoxesFilled = true;
        for (let box of boxes) {
            if (box.innerText === "") {
                allBoxesFilled = false;
                break;
            }
        }
        if (allBoxesFilled) {
            msgContainer.classList.remove('hide');
            msg.innerText = '😲 Match Nul !';
        }
    }
};

const resetGame = () => {// réinitialiser le jeux et les "boxes"
    turnO = true; 
    enableBoxes(); // activer les boxes pour les rendre cliquable
    msgContainer.classList.add('hide');// cacher à nouveau le message gagnant qui ne s'enclenche qu'au clic
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
