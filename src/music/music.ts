import { ResourceType } from '@/resource/resource';
import { Field, ObjectType } from '@nestjs/graphql';

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
}
