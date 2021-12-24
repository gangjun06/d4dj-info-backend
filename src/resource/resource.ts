import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ResourceType {
  Music = 'Music',
  Character = 'Character',
  Event = 'Event',
  Episode = 'Episode',
  Items = 'Items',
}

registerEnumType(ResourceType, { name: 'ResourceType' });

@ObjectType()
export class Resource {
  @Field((type) => String)
  name: ResourceType;

  @Field()
  lastUpdate: Date;
}
