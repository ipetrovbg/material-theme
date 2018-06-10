export class IncomeModel {

  public id?: number;
  public userId: number;
  public income: string;
  public reason: string;
  public year: number;
  public month: number;
  public date: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
  public isTest?: boolean;

  constructor(income?: IncomeModel) {

    if (income && income.createdAt)
      this.createdAt = new Date(income.createdAt);

    if (income && income.updatedAt)
      this.updatedAt = new Date(income.updatedAt);

      this.date = income && income.date ? new Date(income.date): new Date();

    if (income && income.id)
      this.id = income.id;

    this.isTest = (income && (income.isTest !== undefined)) ? income.isTest : false;

    if (income && income.userId)
      this.userId = income.userId;

    this.reason = income && income.reason ? income.reason : '';

    this.income = `${income && income.income ? +income.income : 0}`;

    this.year = income && income.year ? income.year : new Date().getFullYear();

    this.month = income && income.month ? income.month : new Date().getMonth() + 1;
  }

  public initial() {
    return <IncomeModel>{
      id: this.id,
      userId: this.userId,
      income: this.income,
      reason: this.reason,
      year: this.year,
      month: this.month,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isTest: this.isTest
    };
  }

}
