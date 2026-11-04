import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryColumn({ type: 'varchar', length: 64 })
  id: string; // SHA-256 токена, не сам токен

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

  @Column({ type: 'jsonb', nullable: true })
  claims: Record<string, unknown> | null;
}
