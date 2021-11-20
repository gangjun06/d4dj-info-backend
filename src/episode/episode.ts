import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Episode {
  @Field()
  category: string;
  @Field()
  id: number;
  @Field()
  conditionsPrimaryKey: number[];
  @Field()
  title: string;
  @Field()
  summary: string;
  @Field()
  rewardsPrimaryKey: number[];
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
  @Field()
  hasVoice: boolean;
}

@ObjectType()
export class UnitEpisode {
  @Field()
  id: number;
  @Field()
  backgroundId: number;
  @Field()
  season: number;
  @Field()
  unitPrimaryKey: number;
  @Field()
  chapterNumber: number;
}

@ObjectType()
export class EventEpisode {
  @Field()
  id: number;
  @Field()
  backgroundId: number;
  @Field()
  eventPrimaryKey: number;
  @Field()
  chapterNumber: number;
}

@ObjectType()
export class CharacterEpisode {
  @Field()
  id: number;
  @Field()
  backgroundId: number;
  @Field()
  characterId: number;
  @Field()
  chapterNumber: number;
}

@ObjectType()
export class LiveResultEpisode {
  @Field()
  id: number;
  @Field()
  charactersPrimaryKey: number[];
}

@ObjectType()
export class Live2DUIChat {
  @Field()
  id: number;
  @Field()
  categories: string[];
  @Field()
  characterPrimaryKey: number;
  @Field()
  clothId: number;
  @Field()
  message: string;
  @Field()
  motion: string;
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
}
