import { InputType, Field, Int } from '@nestjs/graphql';
@InputType()
export class CreateProductInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  price: number;

  @Field(() => [String])
  imageKeys: string[];

  @Field(() => Int, { nullable: true })
  discount?: number | null;
}
