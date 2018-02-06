var guiplayer = function(game, grid, is_player_one) {
    this.game = game;
    var highlightedCell;
    var key;
    if (is_player_one) {
        key = game.registerPlayerOne();
    } else {
        key = game.registerPlayerTwo();
    }

    var rows = 50;
    var columns = 50;
    var htmlStr = "";
    htmlStr += "<table>"
    
    $("#shootAt").click(function(){
        console.log(highlightedCell);
        var x = highlightedCell[0]
        var y = highlightedCell[1]
        game.shootAt(key,x,y)
        var locationForShip = game.queryLocation(key, x, y);
        
    	//ship=game.getShip(key,fleet,x,y);
    	
        
        
    	
       
       
        
        });

   
    var boardSize = game.getBoardSize();
    
    for (var c = 0; c < boardSize; c++) {
        htmlStr += "<tr>"
        for (var r = 0; r < boardSize; r++) {

            htmlStr += "<td>"
            htmlStr += "<div class='square' id='p" + r + "-" + c + "'></div>"
            htmlStr += "</td>"
        }
        htmlStr += "</tr>"
    }
    htmlStr += "</table>"

    $("#grid").html(htmlStr)
    
     $(".square").click(function() {
        $("#ship").empty();
       // $(this).addClass('hit');
        //alert($(this).attr('id'));
        
        highlightedCell = [$(this).closest("tr").index(),$(this).closest("td").index()];
        console.log(highlightedCell);

        // var row = $(this).closest("tr").index();
         var x = highlightedCell[0]
        var y = highlightedCell[1]
       
        var loc=game.queryLocation(key,x,y);
        
        var ship = loc.ship;
        
        $("#ship").empty();
        if(ship == null){
            $("#ship").append("");
    	}else{
            $("#ship").append("Ship Chosen: "+ship.getName());
        }

   
    

                       


    });


    
    //query location
    
    
    this.mapDraw = function() {

        var boardSize = game.getBoardSize();

        for (var x = 0; x < boardSize; x++) {

            for (var y = 0; y < boardSize; y++) {

                var location = game.queryLocation(key, x, y);
                var square = $('#p' + y + '-' + x);
               // console.log(square.attr('id'));
                square.removeClass();


                if (location.type == 'p1') {
                   // console.log
                    if(location.state == SBConstants.BURNT) {
                        square.addClass('hit');
                    }
                        
                    square.addClass('p1');

                }else if (location.type == 'p2') {
                    if(location.state == SBConstants.BURNT) {
                        square.addClass('hit');
                    }
                   
                    square.addClass('hit');

                }else if (location.type == 'invisible') {
                    square.addClass('invisible');
                } else if (location.type == 'empty') {
                    square.addClass('empty');
                } else if (location.type == "miss") {
                    square.addClass('miss');
                } 

            }
        }

        //p1 and p2 injured, ok, miss, 
    }
    
    var that = this;
    
    game.registerEventHandler(SBConstants.MISS_EVENT,function(event){
         console.log("missed!");
         that.mapDraw();
       //highlightedCell.addClass('hit');
       
    
    
    });
   
    
    game.registerEventHandler(SBConstants.HIT_EVENT,function(event){
        //highlightedCell.addClass('hit');
       
         console.log("yay!hit"); 
    });
     game.registerEventHandler(SBConstants.TURN_CHANGE_EVENT,function(event){
         $("#log").empty();
        if (event.who == SBConstants.PLAYER_ONE) {
				$("#log").append("Battle Log: Player one's turn (count = " + game.getTurnCount() + ")");
        } else {
				$("#log").append("Battle Log: Player two's turn (count = " + game.getTurnCount() + ")");
        }
       
          
    });
    game.registerEventHandler(SBConstants.SHIP_SUNK_EVENT,function(event){
         $("#message").empty();
        var x = highlightedCell[0]
        var y = highlightedCell[1]
        var loc=game.queryLocation(key,x,y);
        
        var ship1 = loc.ship;
        
       if (ship1.isMine(key)) {   
       
           var pos = ship1.getPosition(key);
            $("#message").append("Foe sunk your " + ship1.getName() + " at (" + pos.x + ", " + pos.y + ")");

			} else {
			var pos = ship1.getPosition(null); // This works because ship is dead.
			cli_msg.text("You sunk their " + ship1.getName() + " at (" + pos.x + ", " + pos.y + ")");
		}
       
         console.log("ship sunk!");
         
        
    });
     game.registerEventHandler(SBConstants.GAME_OVER_EVENT,function(event){
          $("#message").empty();
        if (is_player_one && event.winner == SBConstants.PLAYER_ONE) {
			$("#message").append("Game over. You win!");
		} else {
			$("#message").append("Game over. You lose!");
		}
       
         console.log("game over"); 
    });

    var moveForwardButton = $('<button>Move Forward</button>').click(function(){
         var x = highlightedCell[0]
        var y = highlightedCell[1]
        var loc=game.queryLocation(key,x,y);
        
        var ship1 = loc.ship;
		
		if (ship1 != null) {
			game.moveShipForward(key, ship1);
            
		}
	});
	var moveBackButton = $('<button>Move Backward</button>').click(function(){
		  var x = highlightedCell[0]
        var y = highlightedCell[1]
        var loc=game.queryLocation(key,x,y);
        
        var ship1 = loc.ship;
		
		if (ship1 != null) {
			game.moveShipBackward(key, ship1);
		}
	});
	var moveCWButton = $('<button>Rotate CW</button>').click(function(){
		  var x = highlightedCell[0]
        var y = highlightedCell[1]
        var loc=game.queryLocation(key,x,y);
        
        var ship1 = loc.ship;
		
		if (ship1 != null) {
			game.rotateShipCW(key, ship1);
		}
	});
	var moveCCWButton = $('<button>Rotate CCW</button>').click(function(){
		  var x = highlightedCell[0]
        var y = highlightedCell[1]
        var loc=game.queryLocation(key,x,y);
        
        var ship1 = loc.ship;
		
		if (ship1 != null) {
			game.rotateShipCCW(key, ship1);
		}
	});

    
     grid.append(moveForwardButton).append(moveBackButton).append(moveCWButton).append(moveCCWButton);
}
