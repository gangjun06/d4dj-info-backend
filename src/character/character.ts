import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attribute, Prisma } from '@prisma/client';

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

  initDeckCharacterIds?: number[];
  @Field((type) => [Character], { nullable: false })
  characters?: Character[];
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
export class Skill {
  @Field()
  id: number;
  @Field()
  minRecoveryValue: number;
  @Field()
  maxRecoveryValue: number;
  @Field()
  comboSupportCount: number;
  @Field()
  scoreUpRate: number;
  @Field()
  minSeconds: number;
  @Field()
  maxSeconds: number;
  @Field()
  perfectScoreUpRate: number;
}

registerEnumType(Attribute, { name: 'attribute' });

export enum AttributeForParse {
  STREET = 1,
  PARTY = 2,
  CUTE = 3,
  COOL = 4,
  ELEGANT = 5,
}

@ObjectType()
export class Card {
  @Field()
  id: number;

  rarityPrimaryKey?: number;
  @Field({ nullable: false })
  rarity?: number;

  @Field()
  cardName: string;

  attributePrimaryKey?: number;
  @Field({ nullable: false })
  attrubute?: Attribute;

  characterPrimaryKey?: number;
  @Field({ nullable: false })
  character?: Character;

  skillParameterPrimaryKey?: number;
  @Field({ nullable: false })
  skill: Skill;

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
