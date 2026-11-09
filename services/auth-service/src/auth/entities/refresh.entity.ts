import { Column, Entity, Index, PrimaryColumn } from "typeorm";

/** Что можно положить в jsonb-колонку. */
export type Json = object | string | number | boolean | null;

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string; // SHA-256 токена

  @Index()
  @Column({ type: 'varchar', length: 64 })
  familyId: string;

  @Index()
  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @Index()
  @Column({ type: 'timestamptz' })
  familyExpiresAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  usedAt: Date | null;

  // Семья отозвана, если хотя бы одна её строка revoked.
  @Column({ type: 'boolean', default: false })
  revoked: boolean;

  @Column({ type: 'jsonb', nullable: true })
  claims: Record<string, Json> | null;
}