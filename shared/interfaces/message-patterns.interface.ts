export enum UserMessagePattern {
  CREATE = 'user.create',
  FIND_ONE = 'user.findOne',
  FIND_ALL = 'user.findAll',
  UPDATE = 'user.update',
  DELETE = 'user.delete',
}

export enum StatisticsMessagePattern {
  LOG_ACTIVITY = 'statistics.logActivity',
  GET_USER_STATS = 'statistics.getUserStats',
  GET_SYSTEM_STATS = 'statistics.getSystemStats',
} 