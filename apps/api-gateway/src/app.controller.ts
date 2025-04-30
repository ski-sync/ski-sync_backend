import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto, LoginDto, AuthResponseDto } from '@shared/dto/auth.dto';
import { UpdateUserDto, UserResponseDto } from '@shared/dto/user.dto';
import { LogActivityDto, GetUserStatsDto, ActivityResponseDto } from '@shared/dto/statistics.dto';
import { Observable } from 'rxjs';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBearerAuth,
  ApiBody 
} from '@nestjs/swagger';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('STATISTICS_SERVICE') private readonly statisticsClient: ClientProxy
  ) {}

  // Routes d'authentification
  @ApiTags('Authentication')
  @ApiOperation({ summary: 'Inscription d\'un nouvel utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Données d\'entrée invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  @Post('users/register')
  async register(@Body() registerDto: RegisterDto): Promise<Observable<AuthResponseDto>> {
    console.log('API Gateway - Register request received:', registerDto);
    return this.userClient.send('register', registerDto);
  }

  @ApiTags('Authentication')
  @ApiOperation({ summary: 'Connexion d\'un utilisateur existant' })
  @ApiResponse({ status: 200, description: 'Connexion réussie', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  @Post('users/login')
  async login(@Body() loginDto: LoginDto): Promise<Observable<AuthResponseDto>> {
    console.log('API Gateway - Login request received:', loginDto);
    return this.userClient.send('login', loginDto);
  }

  // Routes protégées pour les utilisateurs
  @ApiTags('Users')
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs', type: [UserResponseDto] })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers(): Promise<Observable<UserResponseDto[]>> {
    console.log('API Gateway - Get users request received');
    return this.userClient.send('findAll', {});
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiParam({ name: 'id', description: 'Identifiant unique de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Détails de l\'utilisateur', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('users/:id')
  async getUser(@Param('id') id: string): Promise<Observable<UserResponseDto>> {
    console.log('API Gateway - Get user request received, id:', id);
    return this.userClient.send('findOne', id);
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiParam({ name: 'id', description: 'Identifiant unique de l\'utilisateur à modifier' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Observable<UserResponseDto>> {
    console.log('API Gateway - Update user request received, id:', id, 'data:', updateUserDto);
    return this.userClient.send('update', { id, ...updateUserDto });
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiParam({ name: 'id', description: 'Identifiant unique de l\'utilisateur à supprimer' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<Observable<any>> {
    console.log('API Gateway - Delete user request received, id:', id);
    return this.userClient.send('remove', id);
  }

  // Routes pour les statistiques
  @ApiTags('Statistics')
  @ApiOperation({ summary: 'Enregistrer une activité' })
  @ApiBody({ type: LogActivityDto })
  @ApiResponse({ status: 201, description: 'Activité enregistrée avec succès', type: ActivityResponseDto })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('statistics/log-activity')
  async logActivity(@Body() data: LogActivityDto): Promise<Observable<ActivityResponseDto>> {
    console.log('API Gateway - Log activity request received:', data);
    return this.statisticsClient.send('statistics.logActivity', data);
  }

  @ApiTags('Statistics')
  @ApiOperation({ summary: 'Récupérer les statistiques d\'un utilisateur' })
  @ApiParam({ name: 'userId', description: 'Identifiant unique de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Statistiques de l\'utilisateur' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('statistics/user/:userId')
  async getUserStats(@Param('userId') userId: string): Promise<Observable<any>> {
    console.log('API Gateway - Get user stats request received, userId:', userId);
    return this.statisticsClient.send('statistics.getUserStats', { userId });
  }

  @ApiTags('Statistics')
  @ApiOperation({ summary: 'Récupérer les statistiques du système' })
  @ApiResponse({ status: 200, description: 'Statistiques du système' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('statistics/system')
  async getSystemStats(): Promise<Observable<any>> {
    console.log('API Gateway - Get system stats request received');
    return this.statisticsClient.send('statistics.getSystemStats', {});
  }
} 