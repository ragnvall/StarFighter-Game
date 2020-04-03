var cursors;

class Gameover extends Phaser.Scene  {
  constructor() {
    super("Gameover");
  }
create(){
  this.add.text(350,300, "Game Over \nPress space to restart.");

  cursors = this.input.keyboard.createCursorKeys();

}
update(){
  if (cursors.space.isDown){
    this.scene.start("GameScene");
  }
}
}
