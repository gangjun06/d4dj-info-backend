import { ResourceType } from '@/resource/resource';
import { Field, ObjectType } from '@nestjs/graphql';
// import { Music as PrismaMusic } from '@prisma/client';

@ObjectType()
export class Music {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  readName: string;
  @Field()
  lyrist: string;
  @Field()
  composer: string;
  @Field()
  arranger: string;
  @Field()
  specialUnitName: string;
  @Field()
  category: string;
  @Field()
  unitPrimaryKey: number;
  @Field()
  defaultOrder: number;
  @Field()
  musicBpm: number;
  @Field()
  openKey: number;
  @Field()
  sectionTrend: string;
  @Field()
  startDate: string;
  @Field()
  endDate: string;
  @Field()
  hasMovie: boolean;
  @Field((returns) => [Number])
  purchaseBonusesPrimaryKey: any[];
  @Field()
  isHidden: boolean;
  @Field()
  excludeChallenge: boolean;
  @Field()
  isTutorial: boolean;

  // static prismaSchema(data: Music): Prisma;
}

export class Chart {
  id: number;
  musicPrimaryKey: number;
  difficulty: string;
  level: number;
  achieveId: number;
  trends: number[];
  overrideLevel: string;
  designerPrimaryKey: number;
}

export class ChartDesigner {
  id: number;
  name: string;
}

export class MusicMix {
  musicPrimaryKey: number;
  section: string; // enum
  startTime: number;
  startTimeBpm: number;
  endTime: number;
  endTimeBpm: number;
  enableLongMixStart: boolean;
  enableLongMixEnd: boolean;
}

export class ChartNoteCount {
  id: number;
  chartId: number;
  section: string; // enum
  count: number;
}
