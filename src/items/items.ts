import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StockViewCategory {
  @Field((type) => ID)
  id: number;
  @Field()
  name: string;
}

@ObjectType()
export class Reward {
  @Field((type) => ID)
  id: number;
  @Field()
  category: string;
  @Field()
  rewardId: number;
  @Field()
  amount: number;
}

export class Stock {
  @Field((type) => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  category: string;
  viewCategoryPrimaryKey: number;
  @Field()
  summary: string;
  @Field()
  attributeId: number;
  @Field()
  rarity: number;
  @Field()
  exp: number;
  @Field()
  buffCharacterId: number;
  @Field()
  recoveryAmount: number;
  @Field()
  consumeAmount: number;
  @Field()
  maxAmount: number;
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
  @Field()
  isAppropriateSales: boolean;
}
