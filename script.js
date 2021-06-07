// Generate the board
$('form').on('submit', function(event){
    $(this).hide();
    boardLength = $('.board-length').val();
    event.preventDefault();
    $('h1').prepend(boardLength+ "X" + boardLength)
    for (var i=1; i <= boardLength; i++){
        $('#selected-board').append('<div class="row d-flex justify-content-center" id=' + "row" + i + ' data-value=' + boardLength + '></div>');
        for(var j=1; j <=boardLength; j++){
            $('#row'+i).append('<div class="col-3 cell cell-styles" data-value='+ i+j+' ></div>')
        }
    }
});

$('#selected-board').on('click', '.cell', function(){
    setClickEventForBoxes(this)
});

// initializeVariables();
var player = "O";
var clickCount = 0;
var winner;
var boardLength;
displayCurrentPlayer();
selectPlayer();

function setClickEventForBoxes(cell){
    $('#choose-player').addClass('d-none');
    cell.innerText = player;
    cell.classList.remove('cell')

    clickCount += 1;
    setPlayer();

    // if number of clicks is 5 or more then only check the winner
    setTimeout(function () {
        if (clickCount >= ((boardLength * 2) - 1)) {
            checkRow(getDataAttrValue(cell));
            // check column only if winner is undefined
            winner == undefined ? checkColumn(getDataAttrValue(cell)) : true;
            
            // check diagonal only if winner is undefined
            winner == undefined ? checkDiagonal(getDataAttrValue(cell)) : true;
        }

        if (winner == undefined && clickCount == boardLength * boardLength) {
            displayAlert("Game is tie.");
        }
    }, 100);

}

// display current player after click
function displayCurrentPlayer() {
    $('#current-player')[0].innerText = player + " )";
}

// select a player
function selectPlayer() {
    $('.xplayer').one('click', function () {
        player = 'X';
        $('#choose-player').addClass('d-none');
        displayCurrentPlayer();
    });
}

// get data position value of an element
function getDataAttrValue(elem){
    return $(elem)[0].getAttribute('data-value')
}

// function to set players and display player text
function setPlayer() {
    if (player==='O') {
        player = 'X';
    } else {
        player = 'O';
    }
    displayCurrentPlayer();
}



// check winner
// function declareWinner(a, b, c) {
//     if (a === b && b===c && a != null) {
//         winner = a;
//         displayAlert("Winner is: " + winner);
//     }
// }

function declareWinner(boxValuesArray){
    let uniqValuesArray = [...new Set(boxValuesArray)];
    if(uniqValuesArray.length == 1 && uniqValuesArray[0] !=""){
        winner = uniqValuesArray[0];
        displayAlert("Winner is: " + winner);
    }
}

// display alert message and load page
function displayAlert(msg) {
    alert(msg);
    window.location.reload();
}

// get rowise box value
function getBoxValue(dataVal){
    return $('[data-value="'+dataVal+'"]').text()
}
// check row
function checkRow(dataValue) {
    let firstIndex = dataValue.split('')[0];
    checkWinnerForRowColumn("row", firstIndex)
}

// check column
function checkColumn(dataValue) {
    let lastIndex = dataValue.split('')[1];
    checkWinnerForRowColumn('column', lastIndex)
}

// check diagonal
function checkDiagonal(dataValue) {
    let i = dataValue.split('')[0];
    let j = dataValue.split('')[1];

    if (i === j) {
        checkWinnerForDiagonal('primary-diagonal')
    } else {
        checkWinnerForDiagonal('secondary-diagonal')
    }
}


function checkWinnerForRowColumn(checkType, index){
    let boxValuesArray = [];
    if(checkType=='row'){
        for (let j=1; j <= boardLength; j++){
            boxValuesArray.push(getBoxValue(index+j))
        }
    }else if(checkType=='column'){
        for (let i=1; i<=boardLength; i++){
            boxValuesArray.push(getBoxValue(i+index))
        }
    }
    declareWinner(boxValuesArray);
}


function checkWinnerForDiagonal(checkType){
    let boxValuesArray = [];
    if(checkType == 'primary-diagonal'){
        for(let k=1; k<=boardLength; k++){
            boxValuesArray.push(getBoxValue(k.toString()+k))
        }
    }else if(checkType == 'secondary-diagonal'){
        var SecondaryDiagonalBoxSum = parseInt(boardLength) + 1;
        for(let k=1; k<=boardLength; k++){
            let lastIndex = SecondaryDiagonalBoxSum - k;
            boxValuesArray.push(getBoxValue(k.toString()+ lastIndex));
        }
    }
    declareWinner(boxValuesArray)
}