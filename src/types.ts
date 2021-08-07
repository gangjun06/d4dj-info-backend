import { Field, InputType } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field({ nullable: true, defaultValue: 0 })
  @Min(0)
  skip?: number;

  @Field({ nullable: true, defaultValue: 20 })
  @Min(0)
  take?: number;
}
