import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'johndoe', description: 'Nom d\'utilisateur unique' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Adresse e-mail unique' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Mot de passe (minimum 6 caractères)' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com', description: 'Adresse e-mail de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'utilisateur' })
  id: string;
  
  @ApiProperty({ example: 'johndoe', description: 'Nom d\'utilisateur' })
  username: string;
  
  @ApiProperty({ example: 'john@example.com', description: 'Adresse e-mail de l\'utilisateur' })
  email: string;
  
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Token JWT d\'authentification' })
  token: string;
} 