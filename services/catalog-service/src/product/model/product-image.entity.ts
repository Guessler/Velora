import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product.model.js";
import type { Relation } from 'typeorm';
@Entity("product_image")
export class ProductImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  key: string;

  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: "CASCADE",
  })
  product: Relation<Product>;
}