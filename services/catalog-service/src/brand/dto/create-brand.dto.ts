import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBrandInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  logo: string;

  @Field(() => String)
  website: string;

  @Field(() => String)
  sortOrder: string; // придумать че-та

  @Field(() => Boolean)
  isActive: boolean;
}
