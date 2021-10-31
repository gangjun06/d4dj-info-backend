import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import prisma, { StockCategory, RewardCategory } from '@prisma/client';

registerEnumType(StockCategory, { name: 'StockCategory' });
registerEnumType(RewardCategory, { name: 'RewardCategory' });

@ObjectType()
export class StockViewCategory {
  @Field((type) => Number)
  id: number;
  @Field()
  name: string;

  static prismaSchema(data: StockViewCategory): prisma.StockViewCategory {
    return data;
  }

  static gqlSchema(data: prisma.StockViewCategory): StockViewCategory {
    return data;
  }
}

export class Stock {
  @Field((type) => Number)
  id: number;
  @Field()
  name: string;
  @Field()
  category: StockCategory;
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

  @Field()
  viewCategory: StockViewCategory;

  static prismaSchema(data: Stock): prisma.Stock {
    return data;
  }

  static gqlSchema(
    data: prisma.Stock & {
      viewCategory?: prisma.StockViewCategory;
    },
  ): Stock {
    return {
      ...data,
      viewCategory:
        data.viewCategory && StockViewCategory.gqlSchema(data.viewCategory),
    };
  }
}

@ObjectType()
export class Reward {
  @Field((type) => Number)
  id: number;
  @Field()
  category: RewardCategory;
  @Field()
  rewardId: number;
  @Field()
  amount: number;

  //   @Field()
  //   stock: Stock;

  static prismaSchema(data: Reward): prisma.Reward {
    return data;
  }

  static gqlSchema(data: prisma.Reward & { stock?: prisma.Stock }): Reward {
    return {
      ...data,
      //       stock: data.stock && Stock.gqlSchema(data.stock),
    };
  }
}
