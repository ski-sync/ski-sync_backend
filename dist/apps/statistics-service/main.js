/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/statistics-service/src/app.module.ts":
/*!***************************************************!*\
  !*** ./apps/statistics-service/src/app.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const statistics_module_1 = __webpack_require__(/*! ./statistics/statistics.module */ "./apps/statistics-service/src/statistics/statistics.module.ts");
const prisma_module_1 = __webpack_require__(/*! @shared/prisma/prisma.module */ "./shared/prisma/prisma.module.ts");
const geojson_module_1 = __webpack_require__(/*! ./geojson/geojson.module */ "./apps/statistics-service/src/geojson/geojson.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            prisma_module_1.PrismaModule,
            statistics_module_1.StatisticsModule,
            geojson_module_1.GeojsonModule,
        ],
    })
], AppModule);


/***/ }),

/***/ "./apps/statistics-service/src/geojson/geojson.controller.ts":
/*!*******************************************************************!*\
  !*** ./apps/statistics-service/src/geojson/geojson.controller.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeojsonController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
let GeojsonController = class GeojsonController {
    getGeojson() {
        try {
            let filePath = path.join(process.cwd(), 'dist', 'apps', 'statistics-service', 'src', 'assets', 'stations.geojson');
            if (!fs.existsSync(filePath)) {
                filePath = path.join(process.cwd(), 'apps', 'statistics-service', 'src', 'assets', 'stations.geojson');
            }
            const geojsonData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(geojsonData);
        }
        catch (error) {
            console.error('Error reading GeoJSON file:', error);
            throw error;
        }
    }
};
exports.GeojsonController = GeojsonController;
__decorate([
    (0, microservices_1.MessagePattern)('geojson.get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GeojsonController.prototype, "getGeojson", null);
exports.GeojsonController = GeojsonController = __decorate([
    (0, common_1.Controller)('geojson')
], GeojsonController);


/***/ }),

/***/ "./apps/statistics-service/src/geojson/geojson.module.ts":
/*!***************************************************************!*\
  !*** ./apps/statistics-service/src/geojson/geojson.module.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeojsonModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const geojson_controller_1 = __webpack_require__(/*! ./geojson.controller */ "./apps/statistics-service/src/geojson/geojson.controller.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_auth_guard_1 = __webpack_require__(/*! ../guards/jwt-auth.guard */ "./apps/statistics-service/src/guards/jwt-auth.guard.ts");
let GeojsonModule = class GeojsonModule {
};
exports.GeojsonModule = GeojsonModule;
exports.GeojsonModule = GeojsonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRES_IN')
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [geojson_controller_1.GeojsonController],
        providers: [jwt_auth_guard_1.JwtAuthGuard],
    })
], GeojsonModule);


/***/ }),

/***/ "./apps/statistics-service/src/guards/jwt-auth.guard.ts":
/*!**************************************************************!*\
  !*** ./apps/statistics-service/src/guards/jwt-auth.guard.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtAuthGuard_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                this.logger.error('No token provided');
                throw new common_1.UnauthorizedException('No token provided');
            }
            try {
                const payload = this.jwtService.verify(token, {
                    secret: this.configService.get('JWT_SECRET'),
                });
                this.logger.debug(`Token verified successfully: ${JSON.stringify(payload)}`);
                request.user = payload;
                return true;
            }
            catch (error) {
                this.logger.error(`Invalid token: ${error.message}`);
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
        catch (error) {
            this.logger.error(`Authentication error: ${error.message}`);
            throw error;
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtAuthGuard);


/***/ }),

/***/ "./apps/statistics-service/src/influxdb/influxdb.module.ts":
/*!*****************************************************************!*\
  !*** ./apps/statistics-service/src/influxdb/influxdb.module.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfluxDBModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const influxdb_service_1 = __webpack_require__(/*! ./influxdb.service */ "./apps/statistics-service/src/influxdb/influxdb.service.ts");
let InfluxDBModule = class InfluxDBModule {
};
exports.InfluxDBModule = InfluxDBModule;
exports.InfluxDBModule = InfluxDBModule = __decorate([
    (0, common_1.Module)({
        providers: [influxdb_service_1.InfluxDBService],
        exports: [influxdb_service_1.InfluxDBService],
    })
], InfluxDBModule);


/***/ }),

/***/ "./apps/statistics-service/src/influxdb/influxdb.service.ts":
/*!******************************************************************!*\
  !*** ./apps/statistics-service/src/influxdb/influxdb.service.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InfluxDBService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const influxdb_client_1 = __webpack_require__(/*! @influxdata/influxdb-client */ "@influxdata/influxdb-client");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let InfluxDBService = class InfluxDBService {
    constructor(configService) {
        this.configService = configService;
        this.token = this.configService.get('INFLUXDB_TOKEN') || 'my-super-secret-auth-token';
        this.org = this.configService.get('INFLUXDB_ORG') || 'ski-sync-org';
        this.bucket = this.configService.get('INFLUXDB_BUCKET') || 'ski-sync-bucket';
    }
    onModuleInit() {
        const url = this.configService.get('INFLUXDB_URL') || 'http://localhost:8086';
        this.client = new influxdb_client_1.InfluxDB({ url, token: this.token });
    }
    async writePoint(measurement, tags, fields) {
        const writeApi = this.client.getWriteApi(this.org, this.bucket);
        const point = new influxdb_client_1.Point(measurement);
        Object.entries(tags).forEach(([key, value]) => {
            point.tag(key, value);
        });
        Object.entries(fields).forEach(([key, value]) => {
            if (typeof value === 'number') {
                point.floatField(key, value);
            }
            else if (typeof value === 'boolean') {
                point.booleanField(key, value);
            }
            else {
                point.stringField(key, String(value));
            }
        });
        writeApi.writePoint(point);
        await writeApi.close();
        return point;
    }
    async query(fluxQuery) {
        const queryApi = this.client.getQueryApi(this.org);
        return new Promise((resolve, reject) => {
            const results = [];
            queryApi.queryRows(fluxQuery, {
                next(row, tableMeta) {
                    const result = tableMeta.toObject(row);
                    results.push(result);
                },
                error(error) {
                    reject(error);
                },
                complete() {
                    resolve(results);
                },
            });
        });
    }
};
exports.InfluxDBService = InfluxDBService;
exports.InfluxDBService = InfluxDBService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], InfluxDBService);


/***/ }),

/***/ "./apps/statistics-service/src/statistics/statistics.controller.ts":
/*!*************************************************************************!*\
  !*** ./apps/statistics-service/src/statistics/statistics.controller.ts ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatisticsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const statistics_service_1 = __webpack_require__(/*! ./statistics.service */ "./apps/statistics-service/src/statistics/statistics.service.ts");
const statistics_dto_1 = __webpack_require__(/*! @shared/dto/statistics.dto */ "./shared/dto/statistics.dto.ts");
const message_patterns_interface_1 = __webpack_require__(/*! @shared/interfaces/message-patterns.interface */ "./shared/interfaces/message-patterns.interface.ts");
let StatisticsController = class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async logActivity(logActivityDto) {
        return this.statisticsService.logActivity(logActivityDto);
    }
    async getUserStats(getUserStatsDto) {
        return this.statisticsService.getUserStats(getUserStatsDto);
    }
    async getSystemStats() {
        return this.statisticsService.getSystemStats();
    }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, microservices_1.MessagePattern)(message_patterns_interface_1.StatisticsMessagePattern.LOG_ACTIVITY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof statistics_dto_1.LogActivityDto !== "undefined" && statistics_dto_1.LogActivityDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], StatisticsController.prototype, "logActivity", null);
__decorate([
    (0, microservices_1.MessagePattern)(message_patterns_interface_1.StatisticsMessagePattern.GET_USER_STATS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof statistics_dto_1.GetUserStatsDto !== "undefined" && statistics_dto_1.GetUserStatsDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], StatisticsController.prototype, "getUserStats", null);
__decorate([
    (0, microservices_1.MessagePattern)(message_patterns_interface_1.StatisticsMessagePattern.GET_SYSTEM_STATS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], StatisticsController.prototype, "getSystemStats", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof statistics_service_1.StatisticsService !== "undefined" && statistics_service_1.StatisticsService) === "function" ? _a : Object])
], StatisticsController);


/***/ }),

/***/ "./apps/statistics-service/src/statistics/statistics.module.ts":
/*!*********************************************************************!*\
  !*** ./apps/statistics-service/src/statistics/statistics.module.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatisticsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const statistics_controller_1 = __webpack_require__(/*! ./statistics.controller */ "./apps/statistics-service/src/statistics/statistics.controller.ts");
const statistics_service_1 = __webpack_require__(/*! ./statistics.service */ "./apps/statistics-service/src/statistics/statistics.service.ts");
const influxdb_module_1 = __webpack_require__(/*! ../influxdb/influxdb.module */ "./apps/statistics-service/src/influxdb/influxdb.module.ts");
let StatisticsModule = class StatisticsModule {
};
exports.StatisticsModule = StatisticsModule;
exports.StatisticsModule = StatisticsModule = __decorate([
    (0, common_1.Module)({
        imports: [influxdb_module_1.InfluxDBModule],
        controllers: [statistics_controller_1.StatisticsController],
        providers: [statistics_service_1.StatisticsService],
    })
], StatisticsModule);


/***/ }),

/***/ "./apps/statistics-service/src/statistics/statistics.service.ts":
/*!**********************************************************************!*\
  !*** ./apps/statistics-service/src/statistics/statistics.service.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StatisticsService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatisticsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const influxdb_service_1 = __webpack_require__(/*! ../influxdb/influxdb.service */ "./apps/statistics-service/src/influxdb/influxdb.service.ts");
const prisma_service_1 = __webpack_require__(/*! @shared/prisma/prisma.service */ "./shared/prisma/prisma.service.ts");
let StatisticsService = StatisticsService_1 = class StatisticsService {
    constructor(influxDBService, prisma) {
        this.influxDBService = influxDBService;
        this.prisma = prisma;
        this.logger = new common_1.Logger(StatisticsService_1.name);
    }
    async logActivity(logActivityDto) {
        this.logger.log(`Logging activity for user ${logActivityDto.userId}`);
        const { userId, activity, details } = logActivityDto;
        const timestamp = logActivityDto.timestamp || new Date();
        try {
            const activityRecord = await this.prisma.activity.create({
                data: {
                    userId,
                    activity,
                    details,
                    timestamp,
                }
            });
            await this.influxDBService.writePoint('user_activity', { userId: userId.toString(), activity }, {
                details: details || '',
                id: activityRecord.id,
                timestamp: timestamp.toISOString(),
            });
            return activityRecord;
        }
        catch (error) {
            this.logger.error(`Error logging activity: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getUserStats(getUserStatsDto) {
        this.logger.log(`Getting stats for user ${getUserStatsDto.userId}`);
        const { userId, startDate, endDate } = getUserStatsDto;
        try {
            const activities = await this.prisma.activity.findMany({
                where: {
                    userId,
                    timestamp: {
                        gte: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        lte: endDate || new Date(),
                    },
                },
            });
            const activityCounts = {};
            activities.forEach(activity => {
                if (!activityCounts[activity.activity]) {
                    activityCounts[activity.activity] = 0;
                }
                activityCounts[activity.activity]++;
            });
            return {
                userId,
                startDate: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                endDate: endDate || new Date(),
                activityCounts,
                totalActivities: activities.length,
            };
        }
        catch (error) {
            this.logger.error(`Error getting user stats: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getSystemStats() {
        this.logger.log('Getting system stats');
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        try {
            const activities = await this.prisma.activity.findMany({
                where: {
                    timestamp: {
                        gte: thirtyDaysAgo,
                    },
                },
            });
            const activityCounts = {};
            activities.forEach(activity => {
                if (!activityCounts[activity.activity]) {
                    activityCounts[activity.activity] = 0;
                }
                activityCounts[activity.activity]++;
            });
            const userIds = new Set(activities.map(a => a.userId));
            return {
                period: '30 days',
                uniqueUsers: userIds.size,
                totalActivities: activities.length,
                activityBreakdown: activityCounts,
            };
        }
        catch (error) {
            this.logger.error(`Error getting system stats: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = StatisticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof influxdb_service_1.InfluxDBService !== "undefined" && influxdb_service_1.InfluxDBService) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object])
], StatisticsService);


/***/ }),

/***/ "./shared/dto/statistics.dto.ts":
/*!**************************************!*\
  !*** ./shared/dto/statistics.dto.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityResponseDto = exports.GetUserStatsDto = exports.LogActivityDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class LogActivityDto {
}
exports.LogActivityDto = LogActivityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'utilisateur' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], LogActivityDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ski', description: 'Type d\'activité (ex: ski, snowboard, etc.)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogActivityDto.prototype, "activity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ski alpin à Chamonix', description: 'Détails supplémentaires sur l\'activité' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogActivityDto.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-04-09T12:00:00.000Z', description: 'Date et heure de l\'activité' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LogActivityDto.prototype, "timestamp", void 0);
class GetUserStatsDto {
}
exports.GetUserStatsDto = GetUserStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'utilisateur' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetUserStatsDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-03-01T00:00:00.000Z', description: 'Date de début pour le filtrage des statistiques' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], GetUserStatsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-04-01T00:00:00.000Z', description: 'Date de fin pour le filtrage des statistiques' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], GetUserStatsDto.prototype, "endDate", void 0);
class ActivityResponseDto {
}
exports.ActivityResponseDto = ActivityResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'activité' }),
    __metadata("design:type", String)
], ActivityResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Identifiant unique de l\'utilisateur' }),
    __metadata("design:type", String)
], ActivityResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ski', description: 'Type d\'activité (ex: ski, snowboard, etc.)' }),
    __metadata("design:type", String)
], ActivityResponseDto.prototype, "activity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Ski alpin à Chamonix', description: 'Détails supplémentaires sur l\'activité' }),
    __metadata("design:type", String)
], ActivityResponseDto.prototype, "details", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-04-09T12:00:00.000Z', description: 'Date et heure de l\'activité' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ActivityResponseDto.prototype, "timestamp", void 0);


/***/ }),

/***/ "./shared/interfaces/message-patterns.interface.ts":
/*!*********************************************************!*\
  !*** ./shared/interfaces/message-patterns.interface.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatisticsMessagePattern = exports.UserMessagePattern = void 0;
var UserMessagePattern;
(function (UserMessagePattern) {
    UserMessagePattern["CREATE"] = "user.create";
    UserMessagePattern["FIND_ONE"] = "user.findOne";
    UserMessagePattern["FIND_ALL"] = "user.findAll";
    UserMessagePattern["UPDATE"] = "user.update";
    UserMessagePattern["DELETE"] = "user.delete";
})(UserMessagePattern || (exports.UserMessagePattern = UserMessagePattern = {}));
var StatisticsMessagePattern;
(function (StatisticsMessagePattern) {
    StatisticsMessagePattern["LOG_ACTIVITY"] = "statistics.logActivity";
    StatisticsMessagePattern["GET_USER_STATS"] = "statistics.getUserStats";
    StatisticsMessagePattern["GET_SYSTEM_STATS"] = "statistics.getSystemStats";
})(StatisticsMessagePattern || (exports.StatisticsMessagePattern = StatisticsMessagePattern = {}));


/***/ }),

/***/ "./shared/prisma/prisma.module.ts":
/*!****************************************!*\
  !*** ./shared/prisma/prisma.module.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./shared/prisma/prisma.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),

/***/ "./shared/prisma/prisma.service.ts":
/*!*****************************************!*\
  !*** ./shared/prisma/prisma.service.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PrismaService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor(configService) {
        super({
            datasources: {
                db: {
                    url: configService.get('DATABASE_URL'),
                },
            },
        });
        this.configService = configService;
        this.logger = new common_1.Logger(PrismaService_1.name);
    }
    async onModuleInit() {
        this.logger.log('Connecting to the database...');
        await this.$connect();
        this.logger.log('Database connection established');
    }
    async onModuleDestroy() {
        this.logger.log('Disconnecting from the database...');
        await this.$disconnect();
        this.logger.log('Database connection closed');
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], PrismaService);


/***/ }),

/***/ "@influxdata/influxdb-client":
/*!**********************************************!*\
  !*** external "@influxdata/influxdb-client" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@influxdata/influxdb-client");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************************************!*\
  !*** ./apps/statistics-service/src/main.ts ***!
  \*********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/statistics-service/src/app.module.ts");
async function bootstrap() {
    const logger = new common_1.Logger('StatisticsService');
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const configService = app.get(config_1.ConfigService);
        const rabbitmqUrl = configService.get('RABBITMQ_URL');
        const rabbitmqQueue = configService.get('RABBITMQ_STATISTICS_QUEUE');
        logger.log(`Connecting to RabbitMQ at ${rabbitmqUrl}, queue: ${rabbitmqQueue}`);
        const microservice = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [rabbitmqUrl],
                queue: rabbitmqQueue,
                queueOptions: {
                    durable: false,
                },
            },
        });
        await microservice.listen();
        logger.log('Statistics microservice is listening');
    }
    catch (error) {
        logger.error(`Failed to start Statistics Service: ${error.message}`);
        logger.error(error.stack);
    }
}
bootstrap();

})();

/******/ })()
;