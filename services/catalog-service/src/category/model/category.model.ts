import { Field, ObjectType, Int } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => GraphQLUUID)
  id: string;

  @Column({ type: 'uuid', nullable: true })
  @Field(() => GraphQLUUID, { nullable: true })
  ownerId: string | null;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  slug: string;

  @Column({ type: 'uuid', nullable: true })
  @Field(() => GraphQLUUID, { nullable: true })
  parentId: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  image: string | null;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  sortOrder: number;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
