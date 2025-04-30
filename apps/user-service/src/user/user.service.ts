import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '@shared/dto/user.dto';
import { RegisterDto, LoginDto, AuthResponseDto } from '@shared/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Vérifier si l'email existe déjà
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Récupérer le rôle utilisateur standard (ou le créer s'il n'existe pas)
    let userRole = await this.prisma.role.findUnique({
      where: { name: 'user' },
    });

    if (!userRole) {
      userRole = await this.prisma.role.create({
        data: {
          name: 'user',
        },
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Créer l'utilisateur
    const user = await this.prisma.user.create({
      data: {
        name: registerDto.username,
        email: registerDto.email,
        password: hashedPassword,
        rolesUuid: userRole.uuid,
      },
    });

    // Générer le token JWT
    const token = this.jwtService.sign({ 
      userId: user.uuid,
      email: user.email 
    });

    return {
      id: user.uuid,
      username: user.name,
      email: user.email,
      token
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Trouver l'utilisateur par email
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Générer le token JWT
    const token = this.jwtService.sign({ 
      userId: user.uuid,
      email: user.email 
    });

    return {
      id: user.uuid,
      username: user.name,
      email: user.email,
      token
    };
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    
    return users.map(user => ({
      id: user.uuid,
      username: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      id: user.uuid,
      username: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.prisma.user.findUnique({
      where: { uuid: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Hasher le mot de passe si fourni
    let data: any = {};
    if (updateUserDto.username) data.name = updateUserDto.username;
    if (updateUserDto.email) data.email = updateUserDto.email;
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await this.prisma.user.update({
      where: { uuid: id },
      data,
    });

    return {
      id: updatedUser.uuid,
      username: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };
  }

  async remove(id: string): Promise<void> {
    // Vérifier si l'utilisateur existe
    const existingUser = await this.prisma.user.findUnique({
      where: { uuid: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Supprimer l'utilisateur
    await this.prisma.user.delete({
      where: { uuid: id },
    });
  }
} 