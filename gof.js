$(document).ready(function() {
  $('#createButton').click(function() {
    var gof = new GameOfLife(
      $('#size_x').val(), 
      $('#size_y').val(), 
      $('#delay').val(),
      $('#generations').val());
    gof.create();
  })
});

/* constructor function */
function GameOfLife(x, y, delay, generations) {
  this.x = x;
  this.y = y;
  this.delay = delay;
  this.generations = generations;
  this.currentGeneration = 0;
}

GameOfLife.prototype = {

  /* create the game board */
  create: function() {
    $('#board').empty();
    $('#board').append('<h2 id="gencount">generation 0</h2>');
    for (var i = 0; i < this.y; i++) {
      var rowId = "row" + i;
      $('#board').append('<div class="row" id="' + rowId + '"></div>');
      for (var k = 0; k < this.x; k++) {
        var cellId = 'cell_' + i + '_' + k;
        $('#' + rowId).append('<div class="cell" id="' + cellId + '"></div>');
      }
    }
    $('.cell').click(function(){ $(this).toggleClass('alive')});
    $('#runButton').click($.proxy(this.run, this));
  },

  /* count how many living neighbors cell(x,y) has got */
  countEnv: function(x, y) {
    var retval = 0;
    for (var yy = y-1; yy <= y+1; yy++) {
      if (yy < 0 || yy >= this.y) {
        continue;
      }
      for (var xx = x-1; xx <= x+1; xx++) {
        if (xx < 0 || xx >= this.x || (xx == x && yy == y)) {
          continue;
        }
        if ($('#cell_' + yy + '_' + xx).hasClass('alive')) {
          retval += 1;
        }
      }
    }
    return retval;
  },

  /* run the game */
  run: function() {
    for (var y = 0; y < this.y; y++) {
      for (var x = 0; x < this.x; x++) {
        var cell = $('#cell_' + y + '_' + x);
        var envCount = this.countEnv(x, y); 
        // rule 1
        if (!cell.hasClass('alive') && envCount == 3) {
          cell.addClass('should_alive');
          continue;
        }
        // rule 2
        if (cell.hasClass('alive') && 2 <= envCount && envCount <= 3) {
          cell.addClass('should_alive');
          continue;
        }
        // rule 3
        cell.addClass('should_dead');
      }
    }
    $('.should_alive').addClass('alive').removeClass('should_alive');
    $('.should_dead').removeClass('alive').removeClass('should_dead');
    $('#gencount').text('generation ' + this.currentGeneration);
    if (this.generations > ++this.currentGeneration) {
      var _t = this;
      $(document).delay(this.delay).queue(function(){
        _t.run();
        $(this).dequeue();
      });
    }
  }
}
