import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Unit {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  canTraining: boolean;
  @Field()
  summary: string;
  @Field()
  mainColorCode: string;
  @Field()
  subColorCode: string;
  @Field()
  shortName: string;
  @Field((type) => [Number])
  initDeckCharacterIds: number[];
}

@ObjectType()
export class Character {
  @Field()
  id: number;
  @Field()
  fullName: string;
  @Field()
  firstName: string;
  @Field()
  firstNameEnglish: string;
  @Field()
  unitPrimaryKey: number;
  @Field()
  fullNameEnglish: string;
  @Field()
  colorCode: string;
}

@ObjectType()
export class Card {
  @Field()
  id: number;
  @Field()
  rarityPrimaryKey: number;
  @Field()
  cardName: string;
  @Field()
  attributePrimaryKey: number;
  @Field()
  characterPrimaryKey: number;
  @Field()
  skillParameterPrimaryKey: number;
  @Field()
  skillName: string;
  @Field((type) => [Number])
  maxParameters: number[];
  @Field()
  gachaMessage: string;
  @Field()
  clothCardId: number;
  @Field()
  debutOrder: number;
  @Field((type) => [Number])
  cardIllustHeadDistanceY: number[];
  @Field((type) => [Number])
  cardIllustCenterDistanceX: number[];
  @Field((type) => Date)
  startDate: Date;
  @Field((type) => Date)
  endDate: Date;
}
