import { ResourceType } from '@/resource/resource';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import prisma from '@prisma/client';
import { Prisma } from '@prisma/client';
// import { Music as PrismaMusic } from '@prisma/client';

registerEnumType(prisma.MusicSection, { name: 'musicSection' });
registerEnumType(prisma.MusicCategory, { name: 'musicCategory' });

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
  // @Field((returns) => [Number])
  // purchaseBonusesPrimaryKey: any[];
  @Field()
  isHidden: boolean;
  @Field()
  excludeChallenge: boolean;
  @Field()
  isTutorial: boolean;

  @Field({ nullable: true })
  chart: Chart[];

  @Field({ nullable: true })
  musicMix: MusicMix[];

  static prismaSchema(data: Music): prisma.Music {
    return {
      ...(data as prisma.Music),
    };
  }

  static gqlSchema(
    data: prisma.Music & {
      chart?: prisma.Chart[];
      musicMix?: prisma.MusicMix[];
    },
  ): Music {
    return {
      ...data,
      chart: data.chart
        ? data.chart.map((item) => Chart.gqlSchema(item))
        : null,
      musicMix: data.musicMix
        ? data.musicMix.map((item) => MusicMix.gqlSchema(item))
        : null,
    };
  }
}

@ObjectType()
export class Chart {
  @Field()
  id: number;
  @Field()
  musicPrimaryKey: number;
  @Field()
  difficulty: string;
  @Field()
  level: number;
  @Field()
  achieveId: number;
  @Field()
  trends: number[];
  @Field()
  overrideLevel: string;
  @Field()
  designerPrimaryKey: number;

  @Field({ nullable: true })
  chartDesigner: ChartDesigner;
  @Field({ nullable: true })
  chartNoteCount: ChartNoteCount[];

  static gqlSchema(
    data: prisma.Chart & {
      chartDesigner?: prisma.ChartDesigner;
      chartNoteCount?: prisma.ChartNoteCount[];
    },
  ): Chart {
    return {
      ...data,
      chartDesigner: data.chartDesigner
        ? ChartDesigner.gqlSchema(data.chartDesigner)
        : null,
      chartNoteCount: data.chartNoteCount
        ? data.chartNoteCount.map((item) => ChartNoteCount.gqlSchema(item))
        : null,
    };
  }
}

@ObjectType()
export class ChartDesigner {
  @Field()
  id: number;
  @Field()
  name: string;

  static gqlSchema(data: prisma.ChartDesigner): ChartDesigner {
    return {
      ...data,
    };
  }
}

export class MusicMix {
  id: number;
  @Field()
  musicPrimaryKey: number;
  @Field()
  section: prisma.MusicSection;
  @Field()
  startTime: number;
  @Field()
  startTimeBpm: number;
  @Field()
  endTime: number;
  @Field()
  endTimeBpm: number;
  @Field()
  enableLongMixStart: boolean;
  @Field()
  enableLongMixEnd: boolean;

  @Field({ nullable: true })
  music: Music;

  static prismaSchema(data: MusicMix): prisma.MusicMix {
    data.music = undefined;
    return data as prisma.MusicMix;
  }

  static gqlSchema(data: prisma.MusicMix & { music?: prisma.Music }): MusicMix {
    return {
      ...data,
      music: data.music ? Music.gqlSchema(data.music) : null,
    };
  }
}

export class ChartNoteCount {
  id: number;
  @Field()
  chartId: number;
  @Field()
  section: prisma.MusicSection;
  @Field()
  count: number;

  @Field({ nullable: true })
  chart: Chart;

  static prismaSchema(data: ChartNoteCount): prisma.ChartNoteCount {
    return { ...data };
  }

  static gqlSchema(
    data: prisma.ChartNoteCount & { chart?: prisma.Chart },
  ): ChartNoteCount {
    return {
      ...data,
      chart: data.chart ? Chart.gqlSchema(data.chart) : null,
    };
  }
}
