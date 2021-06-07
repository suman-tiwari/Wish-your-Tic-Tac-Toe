// Generate the board
$('.select-nine, .select-three').one('click', function(){
    $(this).parent().hide();
    boardLength = this.getAttribute('data-value');
    for (var i=1; i <= boardLength; i++){
        $('#selected-board').append('<div class="row d-flex justify-content-center" id=' + "row" + i + ' data-value=' + boardLength + '></div>');
        for(var j=1; j <=boardLength; j++){
            $('#row'+i).append('<div class="col-3 cell cell-styles" data-value='+ i+j+' ></div>')
        }
    }
});

$('#selected-board').on('click', '.cell', function(){
    setClickEventForBoxes()
});

// initializeVariables();
var player = "O";
var clickCount = 0;
var winner;
var boardLength;
displayCurrentPlayer();
selectPlayer();

function setClickEventForBoxes(){
    $('#choose-player').addClass('d-none');
    cell = event.target;
    cell.innerText = player;
    cell.classList.remove('cell')

    clickCount += 1;
    setPlayer();

    // if number of clicks is 5 or more then only check the winner
    setTimeout(function () {
        if (clickCount >= ((boardLength * 2) - 1)) {
            checkRow(getDataAttrValue(cell));
            // checkColumn(getDataAttrValue(cell));
            // checkDiagonal(getDataAttrValue(cell));
            winner == undefined ? checkColumn(getDataAttrValue(cell)) : true;
            winner == undefined ? checkDiagonal(getDataAttrValue(cell)) : true;
        }

        if (winner == undefined && clickCount == boardLength * boardLength) {
            displayAlert("Game is tie.");
        }
    }, 100);

}

// append current player
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
    // display current player
    displayCurrentPlayer();
}



// check winner
// function checkWinner(a, b, c) {
//     if (a === b && b===c && a != null) {
//         winner = a;
//         displayAlert("Winner is: " + winner);
//     }
// }

function checkWinner(boxValuesArray){
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
    let i = dataValue.split('')[0];
    // checkWinner(getBoxValue(i+'1'), getBoxValue(i+'2'), getBoxValue(i+'3'))
    let boxValuesArray = [];
    for (let j=1; j <= boardLength; j++){
        boxValuesArray.push(getBoxValue(i+j))
    }
    checkWinner(boxValuesArray)
}

function createBoxValuesArray(index){
    let boxValuesArray = [];
    for(let k=1; k<=boardLength; k++){
        boxValuesArray.push(getBoxValue(index.toString()+k))
    }
    checkWinner(boxValuesArray)
}

// check column
function checkColumn(dataValue) {
    let i = dataValue.split('')[1];
    let boxValuesArray = [];
    for (let j=1; j<=boardLength; j++){
        boxValuesArray.push(getBoxValue(j+i))
    }
    checkWinner(boxValuesArray)
}

// check diagonal
function checkDiagonal(dataValue) {
    let i = dataValue.split('')[0];
    let j = dataValue.split('')[1];

    if (i === j) {
        let boxValuesArray = [];
        for(let k=1; k<=boardLength; k++){
            boxValuesArray.push(getBoxValue(k.toString()+k))
        }
        checkWinner(boxValuesArray)
    } else {
        let boxValuesArray = [];
        var SecondaryDiagonalBoxSum = parseInt(boardLength) + 1;
        for(let k=1; k<=boardLength; k++){
            let lastIndex = SecondaryDiagonalBoxSum - k;
            boxValuesArray.push(getBoxValue(k.toString()+ lastIndex));
        }
        checkWinner(boxValuesArray)
    }
}