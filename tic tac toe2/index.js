const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gamegrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/// let create a function to intialise game

function initGame(){
    currentPlayer= "X";
    gamegrid=["","","","","","","","",""];
    // UI p empty krna pdega 
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents  ="all"
        // green color ko remove krna h
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText= `Current Player -${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer="X"
    }
    //UI UPDATE
    gameInfo.innerText = `Current Player ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPosition.forEach((position) =>{
        if((gamegrid[position[0]] !== "" || gamegrid[position[1]]!== "" || gamegrid[position[2]] !=="")
    && (gamegrid[position[0]]=== gamegrid[position[1]]) && (gamegrid[position[1]] === gamegrid[position[2]])) {
     

        // check if winner is x
        if(gamegrid[position[0]] === "X")
        answer ="X";
        else
        answer = "0";

           // disable pointer
           boxes.forEach((box) =>{
            box.style.pointerEvents ="none";
        })


       
        // now we know  X/O is winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");


}

        
    });

    // its mean we have a winner
    if (answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    // when there is  tie
    let fillCount = 0;
    gamegrid.forEach((box) => {

        if(box !=="")
        fillCount++;
    });
    // board is filled game is Tie

    if(fillCount===9){
        gameInfo.innerText = "Game Tied !"
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gamegrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gamegrid[index] = currentPlayer;
        boxes[index].style.pointerEvents ="none"
        // swap kro turn
        swapTurn();
        //chck koi jeet to ni gya
        checkGameOver();
    }

}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});


newGameBtn.addEventListener("click", initGame);

