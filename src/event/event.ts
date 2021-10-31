import { Card, Character } from '@/character/character';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import prisma, { EventType, GachaCategory, GachaType } from '@prisma/client';

export enum EventTypeForParse {
  Raid = 'keyDown' as any,
  Slot = 'keyUp' as any,
  Poker = 'mouseDrag' as any,
  Medley = 'mouseMove' as any,
  Bingo = 'mouseUp' as any,
}

export enum GachaTypeForParse {
  Normal = 'Normal' as any,
  StepUp = 'StepUp' as any,
  Etc = 2 as any,
}

registerEnumType(EventType, { name: 'EventType' });
registerEnumType(GachaCategory, { name: 'GachaCategory' });
registerEnumType(GachaType, { name: 'GachaType' });

@ObjectType()
export class Event {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  type: EventType;
  @Field()
  startDate: Date;
  @Field()
  receptionCloseDate: Date;
  @Field()
  rankFixStartDate: Date;
  @Field()
  resultAnnouncementDate: Date;
  @Field()
  endDate: Date;
  @Field()
  stockId: number;
  @Field()
  entryBonusStockAmount: number;
  @Field()
  stockAmountPerUse: number;
  // @Field()
  episodeCharacters: number[];
  @Field()
  storyUnlockDate: Date;
  @Field()
  showExchangeButton: boolean;
  @Field()
  exchangeShopId: number;
  @Field()
  isD4FesStory: boolean;
  @Field()
  topPrefabPath: string;
  @Field()
  showMissionButton: boolean;
  @Field()
  bgmpath: string;
  @Field(() => [Character])
  episodeCharactersData?: Character[];

  static prismaSchema(data: Event): prisma.Event & {
    episodeCharacters: prisma.Prisma.CharacterCreateNestedManyWithoutEventsInput;
  } {
    return {
      ...data,
      type: EventType[EventTypeForParse[data.type as string]],
      episodeCharacters: {
        connect: data.episodeCharacters.map((item) => ({ id: item })),
      },
    };
  }

  static gqlSchema(
    data: prisma.Event & {
      episodeCharactersData?: prisma.Character[];
    },
  ): Event {
    return {
      ...data,
      episodeCharacters: [],
      episodeCharactersData:
        data.episodeCharactersData &&
        data.episodeCharactersData.map((item) => Character.gqlSchema(item)),
    };
  }
}

// @ObjectType()
// export class EventMedelySetlist {
//   @Field()
//   aggregationPrimaryKey: number;
//   @Field()
//   name: string;
//   // @Field()
//   musicIds: number[];
//   @Field()
//   requiredPoint: number;
//   @Field()
//   startDate: string;
//   @Field()
//   endDate: string;
//   @Field()
//   order: number;
//   // @Field()
//   specificBonusCharacterIds: any[];
//   @Field()
//   characterMatchParameterBonusId: number;
//   @Field()
//   characterMatchParameterBonusValue: number;
// }

@ObjectType()
export class Gacha {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field((type) => [Number])
  tableRatesPrimaryKey: number[];
  @Field((type) => [Number])
  tableIds: number[];
  @Field((type) => [Number])
  pickUpCardsPrimaryKey: number[];
  @Field()
  summary: string;
  @Field()
  hasSpecificBg: boolean;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
  @Field()
  note: string;
  @Field()
  detail: string;
  @Field((type) => [String])
  live2dBg: string[];
  @Field()
  loginTriggerMinutes: number;
  @Field()
  showHomeAnimation: boolean;
  @Field()
  hasPickUpDuplicateBonus: boolean;
  @Field()
  gachaCardAttribute: number;
  @Field()
  ascendingSortId: number;
  @Field()
  category: GachaCategory;
  @Field()
  bonusStockId: number;
  @Field()
  selectBonusMaxValue: number;
  @Field((type) => [Number])
  selectBonusCardsPrimaryKey: number[];
  @Field((type) => [Number])
  selectBonusRewardsPrimaryKey: number[];
  @Field((type) => [Number])
  pickUpDuplicateBonusStockIds: number[];
  @Field((type) => [Number])
  pickUpDuplicateBonusStockAmounts: number[];
  @Field((type) => GachaType)
  type: GachaType;
  @Field()
  stepLoopCount: number;

  @Field((type) => [Card])
  pickUpCards: Card[];

  static prismaSchema(data: Gacha): prisma.Gacha & {
    pickUpCards: prisma.Prisma.CardCreateNestedManyWithoutGachaInput;
  } {
    return {
      ...data,
      type: GachaType[GachaTypeForParse[data.type]],
      pickUpCards: {
        connect: data.pickUpCardsPrimaryKey.map((item) => ({ id: item })),
      },
    };
  }

  static gqlSchema(
    data: prisma.Gacha & {
      PickUpCards?: prisma.Card[];
    },
  ): Gacha {
    return {
      ...data,
      pickUpCards:
        data.PickUpCards &&
        data.PickUpCards.map((item) => Card.gqlSchema(item)),
    };
  }
}
