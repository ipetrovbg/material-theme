export class CostModel {

  public id?: number;
  public userId: number;
  public cost: string;
  public reason: string;
  public date: Date;
  public createdAt?: Date;
  public updatedAt?: Date;
  public isTest?: boolean;

  constructor(cost?: CostModel) {

    if (cost && cost.createdAt)
      this.createdAt = new Date(cost.createdAt);

    if (cost && cost.updatedAt)
      this.updatedAt = new Date(cost.updatedAt);

    if (cost && cost.id)
      this.id = cost.id;

    this.isTest = (cost && (cost.isTest !== undefined)) ? cost.isTest : false;

    if (cost && cost.userId)
      this.userId = cost.userId;

    this.reason = cost && cost.reason ? cost.reason : '';

    this.cost = `${cost && cost.cost ? +cost.cost : 0}`;

    if (cost && cost.date)
      this.date = new Date(cost.date);
  }

  public initial() {
    return <CostModel>{
      id: this.id,
      userId: this.userId,
      cost: this.cost,
      reason: this.reason,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isTest: this.isTest
    };
  }

}
