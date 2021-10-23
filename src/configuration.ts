export default (): ConfigType => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || '',
  databaseUrl: process.env.DATABASE_URL || '',
  baseFileUrl: process.env.BASE_FILE_URL || 'https://asset.d4dj.info/',
});

export type ConfigType = {
  port: number;
  jwtSecret: string;
  databaseUrl: string;
  baseFileUrl: string;
};
