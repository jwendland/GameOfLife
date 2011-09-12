$(document).ready(function() {
  $('#createButton').click(function() {
    (new GameOfLife($('#size_x').val(), $('#size_y').val(), 2, 100)).create();
  })
});

function GameOfLife(x, y, pause, iterations) {
  this.x = x;
  this.y = y;
  this.pause = pause;
  this.iterations = iterations;
  this.currentIteration = 0;
}

GameOfLife.prototype = {

  create: function() {
    $('#board').empty();
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

  run: function() {
    for (var y = 0; y < this.y; y++) {
      for (var x = 0; x < this.x; x++) {
        var cell = $('#cell_' + y + '_' + x);
        var envCount = this.countEnv(x, y); 
        cell.text(envCount);
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
    console.log('iteration ' + this.currentIteration);
    $('.should_alive').addClass('alive').removeClass('should_alive');
    $('.should_dead').removeClass('alive').removeClass('should_dead');
    if (this.iterations > ++this.currentIteration) {
      window.setTimeout($.proxy(this.run, this), this.pause * 1000);
    }
  }
}
