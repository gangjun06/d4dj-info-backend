import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attribute } from '@prisma/client';
import {
  Card as PrismaCard,
  Unit as PrismaUnit,
  Character as PrismaCharacter,
  Skill as PrismaSkill,
} from '@prisma/client';

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
  @Field((type) => [Character], { nullable: true })
  characters?: Character[];

  static prismaSchema(data: Unit): PrismaUnit {
    return {
      id: data.id,
      name: data.name,
      canTraining: data.canTraining,
      summary: data.summary,
      mainColorCode: data.mainColorCode,
      subColorCode: data.shortName,
      shortName: data.shortName,
      initDeckCharacterIds: data.initDeckCharacterIds,
    };
  }

  static gqlSchema(
    data: PrismaUnit & {
      characters?: PrismaCharacter[];
    },
  ): Unit {
    return {
      ...data,
      characters: data.characters
        ? data.characters.map((item) => Character.gqlSchema(item))
        : null,
    };
  }
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

  unitPrimaryKey?: number;
  @Field({ nullable: true })
  unit?: Unit;

  @Field()
  fullNameEnglish: string;
  @Field()
  colorCode: string;

  @Field((type) => [Card], { nullable: true })
  card?: Card[];

  static prismaSchema(data: Character): PrismaCharacter {
    return {
      id: data.id,
      colorCode: data.colorCode,
      firstName: data.firstName,
      firstNameEnglish: data.firstNameEnglish,
      fullName: data.fullName,
      fullNameEnglish: data.fullNameEnglish,
      unitPrimaryKey: data.unitPrimaryKey,
    };
  }

  static gqlSchema(
    data: PrismaCharacter & { unit?: PrismaUnit; card?: PrismaCard[] },
  ): Character {
    return {
      ...data,
      unit: data.unit ? Unit.gqlSchema(data.unit) : null,
      card: data.card ? data.card.map((item) => Card.gqlSchema(item)) : null,
    };
  }
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

  static prismaSchema(data: Skill): PrismaSkill {
    return {
      ...data,
    };
  }

  static gqlSchema(data: PrismaSkill): Skill {
    return {
      ...data,
    };
  }
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

  static prismaSchema(data: Card): PrismaCard {
    const attribute: Attribute =
      Attribute[AttributeForParse[data.attributePrimaryKey]];
    return {
      id: data.id,
      attribute,
      cardName: data.cardName,
      characterPrimaryKey: data.characterPrimaryKey,
      clothCardId: data.clothCardId,
      debutOrder: data.debutOrder,
      gachaMessage: data.gachaMessage,
      rarity: data.rarityPrimaryKey,
      skillName: data.skillName,
      skillParameterPrimaryKey: data.skillParameterPrimaryKey,
      cardIllustCenterDistanceX: data.cardIllustCenterDistanceX,
      cardIllustHeadDistanceY: data.cardIllustHeadDistanceY,
      startDate: data.startDate,
      endDate: data.endDate,
      maxParameters: data.maxParameters,
    };
  }

  static gqlSchema(
    data: PrismaCard & { character?: PrismaCharacter; skill?: PrismaSkill },
  ): Card {
    return {
      ...data,
      attrubute: data.attribute,
      skill: data.skill ? Skill.gqlSchema(data.skill) : null,
      character: data.character ? Character.gqlSchema(data.character) : null,
    };
  }
}
