/*Makes sure the doc is fully loaded*/
$(document).ready(function(){
  //image location containers
  var IMG_SRC_CONTAINER = ["https://hungariandk.appspot.com/images/1.jpg", 
                            "https://hungariandk.appspot.com/images/2.jpg",
                            "https://hungariandk.appspot.com/images/3.jpg",
                            "https://hungariandk.appspot.com/images/4.jpg",
                            "https://hungariandk.appspot.com/images/5.jpg",
                            "https://hungariandk.appspot.com/images/6.jpg",
                            "https://hungariandk.appspot.com/images/7.jpg",
                            "https://hungariandk.appspot.com/images/8.jpg"];
  var BACKSIDE = "https://blog.codepen.io/wp-content/uploads/2012/06/Button-Black-Large.png";
  //max amount of pairs
  var MAX_PAIRS = IMG_SRC_CONTAINER.length;
  //draws an unusable board
  createBoard();
  /*-------------------------------------------------------------------------------------------*/
  /*On button click
  - Removes any previous images and set up the needed logic*/
  $("button").click(function (){
   $("button").text("Genstart spil");
   $("p").text("Good luck!");
   $("img").remove();
   $("br").remove();
   //set difficulty = fliptimer
   var difficulty = $("select").val();
   //game cards & id containers
   var gameCards = createCards(difficulty);
   var cardId1, cardId2 = "";
   //counters
   var pairCounter = 0;
   var clicks = 0;
   //draws board again, interacting with gameCards and logic below
   createBoard();
    
  /*On image click. Contains numerous if conditions 
  to determine action, controlling the flow
  by keeping track of the amount of clicks made.*/
  if(clicks <= 2){
 $("img").mousedown(function() {
    clicks++;
    //saves first image id and places game image
    if(clicks == 1){
      cardId1 = $(this).attr("id");
      $(this).attr("src", gameCards[cardId1]);
    }
     //saves second image id and places game image
    if(clicks == 2){
      cardId2 = $(this).attr("id");
      $(this).attr("src", gameCards[cardId2]);
    }
    //disregards double click on same card.
    if(cardId1 == cardId2){
      clicks = 1;
    }
    //checks if two card images chosen are identical and changes to 'found' class.
    if(clicks == 2 && gameCards[cardId1] == gameCards[cardId2]){
      $('#' + cardId1).addClass("found");
      $('#' + cardId2).addClass("found");
      //updates paircounter and resets clicks
      pairCounter++;
      $("p").text("Par fundet: " + pairCounter);
      clicks = 0;
    //checks for win condition
      if(pairCounter == MAX_PAIRS){
      setTimeout(function() {
        window.alert("Du har fundet alle par!");
        }, 100);
      $("p").text("Par fundet: " + MAX_PAIRS);
      $("button").text("Spil igen");
      }
    }
    //reflips the two non-identical cards after timer.  
    if(clicks == 2 && gameCards[cardId1] != gameCards[cardId2]) {
      setTimeout(function () {
      $('#' + cardId1).attr("src", BACKSIDE);
      $('#' + cardId2).attr("src", BACKSIDE);  
      clicks = 0;
      }, difficulty);
     }
   });
  }
});
/*-------------------------------------------------------------------------------------------*/
  /*creates and returns card images array*/
  function createCards(difficulty){
  //hackerman
    if(difficulty == 0){
      //this breaks the other difficulties - intentionally
      IMG_SRC_CONTAINER = hckrmn();
    }
  //copy of container array
  var imgSource = IMG_SRC_CONTAINER.slice();
  var cardImgs = [];
  /*Loops through MAX_PAIRS times and picks a random pair.
  - Generates a random Index based on imgSource length.
  Note: Math.floor rounds number down.
  - Pushes the random pick to new game image array twice.
  - Splice image used from Source array.
  Note: removes 1 item @ randomIndex position.*/
  for(var i = 0; i < MAX_PAIRS; i++){
    var randomIndex = Math.floor(Math.random(imgSource.length));
    var randomImg = imgSource[randomIndex];
    cardImgs.push(randomImg);
    cardImgs.push(randomImg);
    imgSource.splice(randomIndex, 1);
  }
  /*Shuffles the gameImgs items to pseudo-random positions.
  Note: the equation manipulates the callback sort function to be random
  by passing it either positive or negative values.*/
  cardImgs.sort(function(){
    return 0.5 - Math.random();
   });
    return cardImgs;
  }
 /*-------------------------------------------------------------------------------------------*/
  function createBoard(){
  /*Creates a face down card for every game card*/
  for(var i = 0; i < (MAX_PAIRS * 2); i++){
    $("div").append('<img src=' + BACKSIDE + ' id=' + i + '>');
    //creates breaklines every 4th image
    if((i + 1) % (MAX_PAIRS / 2) == 0){
    $("div").append('<br>');
    }
  }
}
/*-------------------------------------------------------------------------------------------*/
  function hckrmn(){
    var hckrmn = [];
    for(var i = 0; i < MAX_PAIRS; i++){
    hckrmn[i] = "http://i0.kym-cdn.com/photos/images/original/001/176/251/4d7.png";
    }
    return hckrmn;
  }
/*-------------------------------------------------------------------------------------------*/
});