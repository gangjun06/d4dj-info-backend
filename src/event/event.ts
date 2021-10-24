import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

// registerEnumType

@ObjectType()
export class Event {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  type: string;
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
  @Field()
  episodeCharacters: number[];
  @Field()
  storyUnlockDate: string;
  @Field()
  showExchangeButton: boolean;
  @Field()
  sxchangeShopId: number;
  @Field()
  isD4FesStory: boolean;
  @Field()
  topPrefabPath: string;
  @Field()
  showMissionButton: boolean;
  @Field()
  bgmPath: string;
}

@ObjectType()
export class EventMedelySetlist {
  @Field()
  aggregationPrimaryKey: number;
  @Field()
  name: string;
  @Field()
  musicIds: number[];
  @Field()
  requiredPoint: number;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
  @Field()
  order: number;
  @Field()
  specificBonusCharacterIds: any[];
  @Field()
  characterMatchParameterBonusId: number;
  @Field()
  characterMatchParameterBonusValue: number;
}
