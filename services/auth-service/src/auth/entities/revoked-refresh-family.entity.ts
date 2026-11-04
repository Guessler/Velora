import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('revoked_refresh_family')
export class RevokedRefreshFamily {
  @PrimaryColumn({ name: 'family_id', type: 'varchar', length: 64 })
  familyId: string;

  @Column({ name: 'revoked_at', type: 'timestamptz' })
  revokedAt: Date;
}