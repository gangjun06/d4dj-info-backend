import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attribute, Prisma } from '@prisma/client';
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
      canTraining: data.canTraining,
      initDeckCharacterIds: data.initDeckCharacterIds,
      mainColorCode: data.mainColorCode,
      name: data.mainColorCode,
      shortName: data.shortName,
      subColorCode: data.shortName,
      summary: data.summary,
    };
  }

  static gqlSchema(
    data: PrismaUnit & {
      Characters?: PrismaCharacter[];
    },
    parseChild?: boolean,
  ): Unit {
    const characters: Character[] = [];
    if (parseChild) {
      data.Characters.forEach((item) => {
        characters.push(Character.gqlSchema(item));
      });
    }
    return {
      ...data,
      characters,
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
    data: PrismaCharacter & { Unit?: PrismaUnit; Card?: PrismaCard[] },
    parseChild?: boolean,
  ): Character {
    return {
      ...data,
      unit: parseChild ? Unit.gqlSchema(data.Unit) : null,
      card: parseChild
        ? data.Card.map((item) => {
            return Card.gqlSchema(item);
          })
        : null,
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
    data: PrismaCard & { Character?: PrismaCharacter; Skill?: PrismaSkill },
    parseChild?: boolean,
  ): Card {
    return {
      ...data,
      attrubute: data.attribute,
      skill: parseChild ? Skill.gqlSchema(data.Skill) : null,
      character: parseChild ? Character.gqlSchema(data.Character) : null,
    };
  }
}
