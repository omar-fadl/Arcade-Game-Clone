// buges that player must avoid
class Bug {
  constructor(x, y, move) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.move = move;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any move by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move * dt;

    // resets position of enemy to move from left to right when player reaches destination
    if (this.x > 500) {
      this.x = -150;
      this.move = 150 + Math.floor(Math.random() * 500);
    }

    // below code will check for any collisions between player and enemy
    if (player.x < this.x + 60 &&
      player.x + 37 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y) {
      player.x = 200; // re-aligns position.1
      player.y = 400; // re-aligns position.2
    }
  };
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y, move) {
    this.x = x;
    this.y = y;
    this.move = move;
    this.sprite = 'images/char-boy.png';
  }
  update() {
    // Below code will stop the player from moving off canvas
    if (this.y > 380) {
      this.y = 380;
    }

    if (this.x > 400) {
      this.x = 400;
    }

    if (this.x < 0) {
      this.x = 0;
    }
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Maneuver around the board using standard arrow keys OR WASD keys
  handleInput(keyPress) {
    switch (keyPress) {
      case 'left':
        this.x -= this.move + 50;
        break;
      case 'up':
        this.y -= this.move + 30;
        break;
      case 'right':
        this.x += this.move + 50;
        break;
      case 'down':
        this.y += this.move + 30;
        break;
    }
  };
}

// Now instantiate your objects.
// Place all buges objects in an array called allbuges
// Place the player object in a variable called player

let allbuges = [];

// Position buges to be created
let bugPosition = [50, 135, 220];
let player = new Player(200, 400, 50);
let bug;

bugPosition.forEach(function (posY) {
  bug = new Bug(0, posY, 100 + Math.floor(Math.random() * 499));
  allbuges.push(bug);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});