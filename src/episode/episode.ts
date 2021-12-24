import { Character, Unit } from '@/character/character';
import { Event } from '@/event/event';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import prisma, { EpisodeCategory, Live2DUIChatCategory } from '@prisma/client';

registerEnumType(EpisodeCategory, { name: 'EventType' });
registerEnumType(Live2DUIChatCategory, { name: 'EventType' });

@ObjectType()
export class Episode {
  @Field()
  category: EpisodeCategory;
  @Field()
  id: number;
  @Field((type) => [Number], { nullable: false })
  conditionsPrimaryKey: number[];
  @Field()
  title: string;
  @Field()
  summary: string;
  @Field((type) => [Number], { nullable: false })
  rewardsPrimaryKey: number[];
  @Field()
  startDate: Date;
  @Field()
  endDate: Date;
  @Field()
  hasVoice: boolean;

  static prismaSchema(data: Episode): prisma.Episode {
    return data;
  }

  static gqlSchema(data: prisma.Episode): Episode {
    return data;
  }
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

  @Field((type) => Unit, { nullable: true })
  unit?: Unit;
  @Field((type) => Episode, { nullable: true })
  episode?: Episode;

  static prismaSchema(data: UnitEpisode): prisma.UnitEpisode {
    return data;
  }

  static gqlSchema(
    data: prisma.UnitEpisode & {
      unit: prisma.Unit;
      episode: prisma.Episode;
    },
  ): UnitEpisode {
    return {
      ...data,
      unit: data.unit && Unit.gqlSchema(data.unit),
      episode: data.episode && Episode.gqlSchema(data.episode),
    };
  }
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

  @Field((type) => Event, { nullable: true })
  event?: Event;
  @Field((type) => Episode, { nullable: true })
  episode?: Episode;

  static prismaSchema(data: EventEpisode): prisma.EventEpisode {
    return data;
  }

  static gqlSchema(
    data: prisma.EventEpisode & {
      event: prisma.Event;
      episode: prisma.Episode;
    },
  ): EventEpisode {
    return {
      ...data,
      event: data.event && Event.gqlSchema(data.event),
      episode: data.episode && Episode.gqlSchema(data.episode),
    };
  }
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

  @Field((type) => Character, { nullable: true })
  character?: Character;
  @Field((type) => Episode, { nullable: true })
  episode?: Episode;

  static prismaSchema(data: CharacterEpisode): prisma.CharacterEpisode {
    return data;
  }

  static gqlSchema(
    data: prisma.CharacterEpisode & {
      character: prisma.Character;
      episode: prisma.Episode;
    },
  ): CharacterEpisode {
    return {
      ...data,
      character: data.character && Character.gqlSchema(data.character),
      episode: data.episode && Episode.gqlSchema(data.episode),
    };
  }
}

@ObjectType()
export class LiveResultEpisode {
  @Field()
  id: number;
  @Field((type) => [Number], { nullable: false })
  charactersPrimaryKey: number[];

  static prismaSchema(data: LiveResultEpisode): prisma.LiveResultEpisode {
    return data;
  }

  static gqlSchema(data: prisma.UnitEpisode): UnitEpisode {
    return data;
  }
}

@ObjectType()
export class Live2DUIChat {
  @Field()
  id: number;
  @Field((type) => [Live2DUIChatCategory], { nullable: false })
  categories: Live2DUIChatCategory[];
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

  @Field()
  character?: Character;

  static prismaSchema(data: Live2DUIChat): prisma.Live2DUIChat {
    return data;
  }

  static gqlSchema(
    data: prisma.Live2DUIChat & {
      character: prisma.Character;
    },
  ): Live2DUIChat {
    return {
      ...data,
      character: data.character && Character.gqlSchema(data.character),
    };
  }
}
