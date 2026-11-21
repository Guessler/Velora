import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationDto {
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;
}
