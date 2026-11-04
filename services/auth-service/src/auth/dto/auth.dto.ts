import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

export class SignInDto {
  @IsEmail()
  @MaxLength(254)
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  password: string;
}
export class RefreshTokenDto {
  @IsString()
  @MinLength(1)
  refreshToken: string;
}
