class Account {
  public ownerName: string; // Публичный, доступен всем
  private balance: number; // Приватный, доступен только внутри класса
  protected accountNumber: number; // Защищённый, доступен в классе и подклассах
  readonly bankName: string; // Только для чтения, его значение не может быть изменено после инициализации

  constructor(ownerName: string, initialBalance: number, accountNumber: number, bankName: string) {
    this.ownerName = ownerName;
    this.balance = initialBalance;
    this.accountNumber = accountNumber;
    this.bankName = bankName;
  }

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error('Сумма депозита должна быть положительной.');
    }
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error('Сумма снятия должна быть положительной.');
    }
    if (this.balance < amount) {
      throw new Error('Недостаточно средств на счёте.');
    }
    this.balance -= amount;
  }

  public getBalance(): number {
    return this.balance;
  }

  protected calculateInterest(rate: number): number {
    // Защищённый метод, может быть вызван только внутри класса и подклассов
    return this.balance * rate;
  }
}

class SavingsAccount extends Account {
  private interestRate: number; //процентная ставка

  constructor(
    ownerName: string,
    initialBalance: number,
    accountNumber: number,
    bankName: string,
    interestRate: number
  ) {
    super(ownerName, initialBalance, accountNumber, bankName);
    this.interestRate = interestRate;
  }

  public addInterest(): void {
    //начислить за проценты
    const interest = this.calculateInterest(this.interestRate);
    this.deposit(interest);
  }

  // Попытка вызвать или изменить защищенное или приватное свойство извне вызовет ошибку
  // Например, вызов this.accountNumber или this.balance напрямую не будет работать
}

const mySavingsAccount = new SavingsAccount('John Doe', 1000, 987654321, 'TS Bank', 0.05);
console.log(mySavingsAccount.getBalance()); // 1000
mySavingsAccount.deposit(500);
console.log(mySavingsAccount.getBalance()); // 1500
mySavingsAccount.addInterest();
console.log(mySavingsAccount.getBalance()); // Должно отразить баланс после начисления процентов

// Примеры некорректного использования модификаторов доступа:
// console.log(mySavingsAccount.balance); // Ошибка: свойство 'balance' приватное и доступно только в классе 'Account'
// mySavingsAccount.accountNumber = 123456789; // Ошибка: свойство 'accountNumber' защищённое
// mySavingsAccount.bankName = "New Bank"; // Ошибка: свойство 'bankName' только для чтения и не может быть изменено
