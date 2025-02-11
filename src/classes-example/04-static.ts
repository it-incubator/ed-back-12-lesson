export class CreateUserDto {
  name: string = '';
  role: string = '';
  //...
}

class User {
  private static numberOfInstances: number = 0;
  createdAt: string = '';

  private constructor() {
    User.numberOfInstances++;
  }

  static createUser(args: CreateUserDto): User {
    //validate admin role
    if (!args.role) {
      throw Error('не хватает прав');
    }

    const user = new User(); //new this() - так же вызовет конструктор
    user.createdAt = new Date().toISOString();
    //other logic

    return user;
  }

  static getInstanceCount(): number {
    return User.numberOfInstances; // Публичный статический метод для доступа к приватному статическому свойству
  }
}

//реализовать паттерн синглтон
