import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ResourceType {
  Music = 'Music',
}

registerEnumType(ResourceType, { name: 'ResourceType' });

@ObjectType()
export class Resource {
  @Field((returns) => String)
  name: ResourceType;

  @Field()
  lastUpdate: Date;
}
