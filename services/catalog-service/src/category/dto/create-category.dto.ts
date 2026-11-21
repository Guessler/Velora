import { Field, Int, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => ID, { nullable: true })
  parentId?: string;

  @Field({ nullable: true })
  image?: string;

  @Field(() => Int, { defaultValue: 0 })
  sortOrder: number;

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;
}
