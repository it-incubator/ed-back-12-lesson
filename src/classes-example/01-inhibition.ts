class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name); //вызов конструктора родителя
  }

  move(distanceInMeters = 5) {
    console.log('Slithering...');
    super.move(distanceInMeters); //вызов метода move() родителя
  }

  snakeMove() {}
}

const snake = new Snake('cobra');
snake.move(10); //Slithering... cobra moved 10m.
