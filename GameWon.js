var cursors;

class GameWon extends Phaser.Scene  {
  constructor() {
    super("GameWon");
  }
create(){
  this.add.text(350,300, "You beat the level!!! \nPress space to move on to the next level.");

  cursors = this.input.keyboard.createCursorKeys();

}
update(){
  if (cursors.space.isDown){
    this.scene.start("GameScene");
  }
}
}
