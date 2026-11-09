import { AuthenticationStorage, RefreshTokenRecord, RefreshTokenStore } from "@nestjs/authentication";
import { Injectable } from "@nestjs/common";
import { DataSource, IsNull, LessThan } from "typeorm";
import { RefreshToken, type Json } from "./entities/refresh.entity.js";

@Injectable()
export class TypeOrmRefreshTokenStore implements RefreshTokenStore {
  constructor(
    private readonly dataSource: DataSource,
    storage: AuthenticationStorage,
  ) {
    storage.registerSource({ refreshTokens: this });
  }

  private get manager() {
    return this.dataSource.manager;
  }

  async getRefreshToken(id: string): Promise<RefreshTokenRecord | undefined> {
    const row = await this.manager.findOneBy(RefreshToken, { id });
    if (!row) return undefined;
    const { revoked: _, ...token } = row;
    return withoutNulls(token);
  }

  async saveRefreshToken(record: RefreshTokenRecord): Promise<void> {
    const claims = (record.claims ?? null) as Record<string, Json> | null;
    await this.manager.insert(RefreshToken, {
      ...record,
      usedAt: record.usedAt ?? null,
      claims,
    });
    await this.manager.delete(RefreshToken, {
      familyExpiresAt: LessThan(record.createdAt),
    });
  }

  async markRefreshTokenUsed(id: string, at: Date): Promise<boolean> {
    const { affected } = await this.manager.update(
      RefreshToken,
      { id, usedAt: IsNull() },
      { usedAt: at },
    );
    return affected === 1;
  }

  async revokeRefreshTokenFamily(familyId: string): Promise<void> {
    await this.manager.update(RefreshToken, { familyId }, { revoked: true });
  }

  isRefreshTokenFamilyRevoked(familyId: string): Promise<boolean> {
    return this.manager.existsBy(RefreshToken, { familyId, revoked: true });
  }

  async revokeUserRefreshTokens(userId: string): Promise<void> {
    await this.manager.update(RefreshToken, { userId }, { revoked: true });
  }
}

/** Убирает NULL-поля: контракт ждёт отсутствие ключа, а не null. */
type WithoutNulls<T> = {
  [K in keyof T as null extends T[K] ? never : K]: T[K];
} & {
  [K in keyof T as null extends T[K] ? K : never]?: Exclude<T[K], null>;
};

function withoutNulls<T extends object>(row: T): WithoutNulls<T> {
  return Object.fromEntries(
    Object.entries(row).filter(([, value]) => value !== null),
  ) as WithoutNulls<T>;
}