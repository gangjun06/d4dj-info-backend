import { Character } from '@/character/character';
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

  static prismaSchema(data: Episode): prisma.Episode {
    return {
      ...data,
    };
  }

  static gqlSchema(data: prisma.Episode): Episode {
    return {
      ...data,
    };
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

  static prismaSchema(data: UnitEpisode): prisma.UnitEpisode {
    return {
      ...data,
    };
  }

  static gqlSchema(data: prisma.UnitEpisode): UnitEpisode {
    return {
      ...data,
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

  static prismaSchema(data: UnitEpisode): prisma.UnitEpisode {
    return {
      ...data,
    };
  }

  static gqlSchema(data: prisma.UnitEpisode): UnitEpisode {
    return {
      ...data,
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

  static prismaSchema(data: UnitEpisode): prisma.UnitEpisode {
    return {
      ...data,
    };
  }

  static gqlSchema(data: prisma.UnitEpisode): UnitEpisode {
    return {
      ...data,
    };
  }
}

@ObjectType()
export class LiveResultEpisode {
  @Field()
  id: number;
  @Field()
  charactersPrimaryKey: number[];
  static prismaSchema(data: UnitEpisode): prisma.UnitEpisode {
    return {
      ...data,
    };
  }

  static gqlSchema(data: prisma.UnitEpisode): UnitEpisode {
    return {
      ...data,
    };
  }
}

@ObjectType()
export class Live2DUIChat {
  @Field()
  id: number;
  @Field()
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

  static prismaSchema(data: Live2DUIChat): prisma.Live2DUIChat & {
    character: prisma.Character;
  } {
    return {
      ...data,
      character: data.character && Character.prismaSchema(data.character),
    };
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
