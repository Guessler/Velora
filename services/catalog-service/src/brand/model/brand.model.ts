import { Field, ObjectType, Int } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("brand")
@ObjectType()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => GraphQLUUID)
  id: string;

  @Column({ type: 'uuid', nullable: true })
  @Field(() => GraphQLUUID, { nullable: true })
  ownerId: string | null;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  slug: string;

  @Column()
  @Field(() => String)
  website: string;

  @Column()
  @Field(() => String)
  logo: string;

  @Column({default: true})
  @Field(() => Boolean)
  isActive: boolean;

  @Column()
  @Field(() => Date)
  createdAt: Date;

  @Column()
  @Field(() => Date)
  updatedAt: Date;
}