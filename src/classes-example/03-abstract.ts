abstract class Repository<T, TId> {
  // Абстрактный метод без реализации.
  abstract find(item: T): T[];

  // Абстрактный метод без реализации.
  abstract findOne(id: TId): T | null;

  // Абстрактный метод без реализации.
  abstract create(item: T): T;

  // Абстрактный метод без реализации.
  abstract update(id: TId, item: T): void;

  // Абстрактный метод без реализации.
  abstract delete(id: TId): void;

  // Неабстрактный метод с реализацией.
  someUtilityFunction(args: any): void {
    // Базовая реализация, которая может быть переопределена в подклассах
    // или использована как есть.
  }
}

// Ошибка: не удастся создать экземпляр абстрактного класса.
//const repo = new Repository();

class User {
  constructor(
    public id: number,
    public name: string
  ) {}
}

class UserRepository extends Repository<User, number> {
  find(user: User): User[] {
    return [new User(1, '')];
    // Реализация метода для поиска пользователей.
  }

  findOne(id: number): User | null {
    return new User(1, '');
    // Реализация метода для поиска одного пользователя по ID.
  }

  create(item: User): User {
    return new User(1, '');
  }

  delete(id: number): void {}

  update(id: number, item: User): void {}
}
