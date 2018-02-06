$(document).ready(function () {
    
    var game = new SuperBattleship();
    var gui_player_one = new guiplayer(game, $('#grid'), true);
    var ai_player_two = new DumbAI(game, false);
    game.startGame();
    //alert(game.getStatus());
    gui_player_one.mapDraw();
   
    /*
  var rows = 8;
var columns = 8;
    var htmlStr = "";
    htmlStr+="<table>"
    

     
    for (var r = 0; r < rows; r++) {
           htmlStr+="<tr>"
        for (var c = 0; c < columns; c++) {
       
            htmlStr+="<td>"
            
                htmlStr+= "<div class='square' id='p" +r+ "," +c+ "'></div>"
                
            
            htmlStr+="</td>"
      
        }
      htmlStr+="</tr>"   
    }
     htmlStr+="</table>"
    
        $("#grid").html(htmlStr)
        
 $(".square").mousedown(function() {
            alert($(this).attr('id'));
        })
 
 
 
 
    game.queryLocation(key, x, y) 
    
    
 //query location 
    
// instantiate the player and game
 
 
 
 */
});
