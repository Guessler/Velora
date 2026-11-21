import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity.js';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => GraphQLUUID)
  id: string;

  @Column()
  @Field()
  image: string;

  @Column()
  @Field()
  title: string;

  @Column('text')
  @Field()
  description: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  count: number;

  @Column({
    type: 'numeric',
    precision: 2,
    scale: 1,
    default: 0,
    transformer: { to: (v: number) => v, from: (v: string) => Number(v) },
  })
  @Field(() => Float, { defaultValue: 0 })
  grade: number;

  @Column({ name: 'seller_id', type: 'uuid', nullable: true })
  @Field(() => GraphQLUUID, { nullable: true })
  sellerId: string | null;

  @Column({ type: 'int' })
  @Field(() => Int)
  price: number;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  discount?: number | null;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images: ProductImage[];

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
