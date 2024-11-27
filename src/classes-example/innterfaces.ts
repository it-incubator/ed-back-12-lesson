interface IWorker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Human implements IWorker {
  work(): void {
    console.log('Human is working');
  }

  eat(): void {
    console.log('Human is eating');
  }

  sleep(): void {
    console.log('Human is sleeping');
  }
}

//проблема
class Robot implements IWorker {
  work(): void {
    console.log('Robot is working');
  }

  eat(): void {
    throw new Error("Robots don't eat");
  }

  sleep(): void {
    throw new Error("Robots don't sleep");
  }
}

//решение

interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human2 implements Workable, Eatable, Sleepable {
  work(): void {
    console.log('Human is working');
  }

  eat(): void {
    console.log('Human is eating');
  }

  sleep(): void {
    console.log('Human is sleeping');
  }
}

class Robot2 implements Workable {
  work(): void {
    console.log('Robot is working');
  }
}
