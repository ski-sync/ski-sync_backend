import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
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

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'johndoe_updated', description: 'Nouveau nom d\'utilisateur' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @ApiPropertyOptional({ example: 'john_updated@example.com', description: 'Nouvelle adresse e-mail' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123', description: 'Nouveau mot de passe' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'utilisateur' })
  id: string;
  
  @ApiProperty({ example: 'johndoe', description: 'Nom d\'utilisateur' })
  username: string;
  
  @ApiProperty({ example: 'john@example.com', description: 'Adresse e-mail de l\'utilisateur' })
  email: string;
  
  @ApiProperty({ example: '2025-04-09T12:00:00.000Z', description: 'Date de création du compte' })
  createdAt: Date;
  
  @ApiProperty({ example: '2025-04-09T12:30:00.000Z', description: 'Date de dernière mise à jour du compte' })
  updatedAt: Date;
} 