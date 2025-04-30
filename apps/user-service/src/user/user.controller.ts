import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '@shared/dto/user.dto';
import { RegisterDto, LoginDto, AuthResponseDto } from '@shared/dto/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('register')
  async register(@Payload() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.userService.register(registerDto);
  }

  @MessagePattern('login')
  async login(@Payload() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.userService.login(loginDto);
  }

  @MessagePattern('findAll')
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @MessagePattern('findOne')
  async findOne(@Payload() id: string): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @MessagePattern('update')
  async update(@Payload() payload: { id: string, [key: string]: any }): Promise<UserResponseDto> {
    const { id, ...updateUserDto } = payload;
    return this.userService.update(id, updateUserDto);
  }

  @MessagePattern('remove')
  async remove(@Payload() id: string): Promise<void> {
    return this.userService.remove(id);
  }
} 