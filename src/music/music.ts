import { Unit } from '@/character/character';
import { ResourceType } from '@/resource/resource';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import prisma from '@prisma/client';
import { MusicSection, MusicCategory } from '@prisma/client';
// import { Music as PrismaMusic } from '@prisma/client';

registerEnumType(MusicSection, { name: 'MusicSection' });
registerEnumType(MusicCategory, { name: 'MusicCategory' });

@ObjectType()
export class ChartDesigner {
  @Field()
  id: number;
  @Field()
  name: string;

  static prismaSchema(data: ChartDesigner): prisma.ChartDesigner {
    return data;
  }

  static gqlSchema(data: prisma.ChartDesigner): ChartDesigner {
    return data;
  }
}

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
  category: MusicCategory;
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
  purchaseBonusesPrimaryKey?: any[];
  @Field()
  isHidden: boolean;
  @Field()
  excludeChallenge: boolean;
  @Field()
  isTutorial: boolean;
  @Field()
  canFairUse: boolean;

  @Field((type) => [Chart], { nullable: true })
  chart?: Chart[];

  @Field((type) => [MusicMix], { nullable: true })
  musicMix?: MusicMix[];

  @Field((type) => Unit, { nullable: true })
  unit?: Unit;

  static prismaSchema(data: Music): prisma.Music {
    data.purchaseBonusesPrimaryKey = undefined;
    return data as prisma.Music;
  }

  static gqlSchema(
    data: prisma.Music & {
      chart?: prisma.Chart[];
      musicMix?: prisma.MusicMix[];
      unit?: prisma.Unit;
    },
  ): Music {
    return {
      ...data,
      chart: data.chart && data.chart.map((item) => Chart.gqlSchema(item)),
      musicMix:
        data.musicMix && data.musicMix.map((item) => MusicMix.gqlSchema(item)),
      unit: data.unit && Unit.gqlSchema(data.unit),
    };
  }
}

@ObjectType()
export class Chart {
  @Field()
  id: number;
  musicPrimaryKey: number;
  @Field()
  difficulty: string;
  @Field()
  level: number;
  @Field()
  achieveId: number;
  @Field((type) => [Number])
  trends: number[];
  @Field()
  overrideLevel: string;
  @Field()
  designerPrimaryKey: number;
  @Field()
  noteCount: number;

  @Field((type) => ChartDesigner, { nullable: true })
  chartDesigner?: ChartDesigner;

  static prismaSchema(data: Chart): prisma.Chart {
    return data as prisma.Chart;
  }

  static gqlSchema(
    data: prisma.Chart & {
      chartDesigner?: prisma.ChartDesigner;
      chartNoteCount?: prisma.ChartNoteCount[];
    },
  ): Chart {
    return {
      ...data,
      chartDesigner:
        data.chartDesigner && ChartDesigner.gqlSchema(data.chartDesigner),
    };
  }
}

@ObjectType()
export class MusicMix {
  id: number;
  @Field()
  musicPrimaryKey: number;
  @Field()
  section: MusicSection;
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

  @Field((type) => Music, { nullable: true })
  music?: Music;

  static prismaSchema(data: MusicMix): prisma.MusicMix {
    return data as prisma.MusicMix;
  }

  static gqlSchema(data: prisma.MusicMix & { music?: prisma.Music }): MusicMix {
    return {
      ...data,
      music: data.music && Music.gqlSchema(data.music),
    };
  }
}

@ObjectType()
export class ChartNoteCount {
  id: number;
  @Field()
  chartId: number;
  @Field()
  section: MusicSection;
  @Field()
  count: number;

  static prismaSchema(data: ChartNoteCount): prisma.ChartNoteCount {
    return { ...data };
  }

  static gqlSchema(
    data: prisma.ChartNoteCount & { chart?: prisma.Chart },
  ): ChartNoteCount {
    return {
      ...data,
    };
  }
}
