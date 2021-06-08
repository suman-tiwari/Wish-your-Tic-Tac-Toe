// initialize global variables
var player = "O";
var clickCount = 0;
var winner;
var boardLength;
displayCurrentPlayer();
selectPlayer();

function getPlayerToken(){
    return player
}

function setPlayerToken(inputToken){
    player = inputToken
}

function getClickCount(){
    return clickCount
}

function getBoardLength(){
    return boardLength
}

// Generate the board after submission of board length
$('form').on('submit', function(event){
    boardLength = $('.board-length').val();
    // hide form
    $(this).hide();
    // show reset button
    $('.resetBtn').removeClass('d-none');

    displayBoardLengthHeader();
    // prevent click event on submit
    event.preventDefault();

    generateBoard(getBoardLength());
});

function generateBoard(boardLength){
    for (var i=1; i <= boardLength; i++){
        $('#selected-board').append('<tr class="" style="height: 50px; " id=' + "row" + i + ' data-value=' + boardLength + '></tr>');
        for(var j=1; j <=boardLength; j++){
            $('#row'+i).append('<td class="cell cell-styles" data-value='+ i+j+' ></td>')
        }
    }
}

function displayBoardLengthHeader(){
    $('h1').prepend(getBoardLength()+ "X" + getBoardLength());
}

// add click method for dynamically generated cells
$('#selected-board').on('click', '.cell', function(){
    setClickEventForBoxes(this)
});

// reset board
$('.resetBtn').one('click', function(){
    window.location.reload();
})

function setClickEventForBoxes(cell){
    $('#choose-player').addClass('d-none');
    cell.innerText = player;
    cell.classList.remove('cell')

    clickCount += 1;
    changePlayer();
    setTimeOutToCheckWinner(cell);
}

function setTimeOutToCheckWinner(cell){
     // if number of clicks is 5 or more then only check the winner
     setTimeout(function () {
        if (clickCount >= ((getBoardLength() * 2) - 1)) {
            checkRow(getDataAttrValue(cell));
            // check column only if winner is undefined
            winner == undefined ? checkColumn(getDataAttrValue(cell)) : true;
            
            // check diagonal only if winner is undefined
            winner == undefined ? checkDiagonal(getDataAttrValue(cell)) : true;
        }

        if (winner == undefined && clickCount == getBoardLength() * getBoardLength()) {
            displayAlertMessage("Game is tie.");
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
        setPlayerToken('X');
        $('#choose-player').addClass('d-none');
        displayCurrentPlayer();
    });
}

// get data position value of an element
function getDataAttrValue(elem){
    return $(elem)[0].getAttribute('data-value');
}

// function to set players and display player text
function changePlayer() {
    if (player==='O') {
        setPlayerToken('X');
    } else {
        setPlayerToken('O');
    }
    displayCurrentPlayer();
}

function declareWinner(boxValuesArray){
    let uniqValuesArray = [...new Set(boxValuesArray)];
    if(uniqValuesArray.length == 1 && uniqValuesArray[0] !=""){
        winner = uniqValuesArray[0];
        displayAlertMessage("Winner is: " + winner);
    }
}

// display alert message and load page
function displayAlertMessage(msg) {
    alert(msg);
    window.location.reload();
}

// get rowise box value
function getBoxValue(dataVal){
    return $('[data-value="'+dataVal+'"]').text()
}
// check row
function checkRow(dataValue) {
    checkWinnerForRowColumn("row", getFirstIndexOfCell(dataValue));
}

// check column
function checkColumn(dataValue) {
    checkWinnerForRowColumn('column', getLastIndexOfCell(dataValue));
}

// get first index of the current cell
function getFirstIndexOfCell(dataValue){
    let dataValueLength = dataValue.length
    return dataValue.slice(0, dataValueLength/2);
}
// get last index of the current cell
function getLastIndexOfCell(dataValue){
    let dataValueLength = dataValue.length
    return dataValue.slice(dataValueLength/2);
}
// check diagonal
function checkDiagonal(dataValue) {
    let i = getFirstIndexOfCell(dataValue);
    let j = getLastIndexOfCell(dataValue);

    if (i === j) {
        checkWinnerForDiagonal('primary-diagonal')
    } else {
        checkWinnerForDiagonal('secondary-diagonal')
    }
}


function checkWinnerForRowColumn(checkType, index){
    let boxValuesArray = [];
    if(checkType=='row'){
        for (let j=1; j <= getBoardLength(); j++){
            boxValuesArray.push(getBoxValue(index+j))
        }
    }else if(checkType=='column'){
        for (let i=1; i<=getBoardLength(); i++){
            boxValuesArray.push(getBoxValue(i+index))
        }
    }
    declareWinner(boxValuesArray);
}


function checkWinnerForDiagonal(checkType){
    let boxValuesArray = [];
    if(checkType == 'primary-diagonal'){
        for(let k=1; k<=getBoardLength(); k++){
            boxValuesArray.push(getBoxValue(k.toString()+k))
        }
    }else if(checkType == 'secondary-diagonal'){
        var SecondaryDiagonalBoxSum = parseInt(getBoardLength()) + 1;
        for(let k=1; k<=getBoardLength(); k++){
            let lastIndex = SecondaryDiagonalBoxSum - k;
            boxValuesArray.push(getBoxValue(k.toString()+ lastIndex));
        }
    }
    declareWinner(boxValuesArray)
}