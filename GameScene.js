var player;
var shoot;
var gameOver = false;
var keys;
var enemy;
var enemyhealth = 10;
var score = 0;
var enemySpawn = false;
var scoreText;
var cursors;
var levels = 1;
var enemyNumber = 0;
var levelText;
var lastPosition = 50;

class GameScene extends Phaser.Scene  {
  constructor() {
    super("GameScene");
  }

preload ()
{
    this.load.image('sky', 'assets/background.png');
    this.load.image('ship','assets/spaceShip.png');
    this.load.image('bul','assets/bullet.png');
    this.load.image('enemy','assets/enemy.png');
    this.load.image('explosion', 'assets/explosion.png');
}

create ()
{

    scoreText = this.add.text(550, 545, '', { fontSize: '20px', fill: '#250' });
    levelText = this.add.text(330, 16, '',{ fontSize: '24px', fill: '#250' });
    scoreText.setText('Ghosts Killed: ' + score);
    levelText.setText('Level: ' + levels);
    this.add.image(400, 300, 'sky');

    player = this.physics.add.image(400, 550, 'ship').setDisplaySize(100,90);

    //player hits walls
    player.setCollideWorldBounds(true);
    //allow keys
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys('A,W,S,D');

    //add groups
    shoot = this.physics.add.group();
    enemy = this.physics.add.group();
    //spawn first enemy
    for(var i = 0; i <  levels; i++){

        enemy.create(Phaser.Math.Between(20,780), lastPosition,'enemy');
        lastPosition -= 10;
    }
    enemy.setVelocityY(300);
    this.physics.add.overlap(player, enemy, this.hitBomb, null, this);
    this.physics.add.overlap(enemy,shoot,this.hitEnemy);
}
hitBomb (player, enemy)
{
    this.physics.pause();
    this.add.image(player.x,player.y,'explosion');
    gameOver = true;
}
hitEnemy(enemy, shoot){
  if(enemyhealth <= 0){
    enemy.destroy();
    enemySpawn = false;

  }else{
    enemyhealth = enemyhealth -1;
  }
  shoot.destroy();



}
update ()
{

    if (gameOver)
    {
        this.scene.start("Gameover");
        gameOver = false;
        score = 0;
        enemyNumber = 0;
        levels = 1;
        lastPosition = 50;

    }
    if(enemyNumber == levels){
      this.scene.start("GameWon");
      levels += 1;
      enemyNumber = 0;
      lastPosition = 50;
    }
    if (keys.A.isDown)
    {
        player.setVelocityX(-600);
    }
    else if (keys.D.isDown)
    {
        player.setVelocityX(600);
    }
    else
    {
        player.setVelocityX(0);
    }
    if (cursors.space.isDown){
      shoot.create(player.x, player.y-55, 'bul');
      shoot.setVelocityY(-1000);
    }
    if (enemyhealth <= 0 && !enemySpawn){
      enemySpawn = true;
      enemyhealth = 10;
      score += 1;
      enemyNumber +=1;
      scoreText.setText('Ghosts Killed: ' + score);

    }

    enemy.children.iterate(function (child) {
    //bit found in code that works, no idea what it does. ..
    if (child == undefined)
        return;
        if (child.y > 600)  {
          child.destroy();
          enemy.create(Phaser.Math.Between(20,780), lastPosition,'enemy');
          lastPosition -= 10;
        }
      })
    shoot.children.iterate(function (child) {
      //bit found in code that works, no idea what it does...
    if (child == undefined)
        return;
        if (child.y < 0)  {
          child.destroy();
        }
      })



    enemy.setVelocityY(300);



}
}
