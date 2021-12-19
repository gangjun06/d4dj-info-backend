export default (): ConfigType => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || '',
  databaseUrl: process.env.DATABASE_URL || '',
  baseFileUrl: process.env.BASE_FILE_URL || 'https://asset.d4dj.info/',
  basicAuth: process.env.BASIC_AUTH,
  oauth: {
    google: {
      clientNumber: process.env.GOOGLE_CIENT_Number || 'sadf',
      clientSecret: process.env.GOOGLE_CLI,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:3000/auth/google/callback',
    },
  },
});

export type ConfigType = {
  port: number;
  jwtSecret: string;
  databaseUrl: string;
  baseFileUrl: string;
  oauth: OauthConfig;
  basicAuth: string;
};

export type OauthConfig = {
  google: {
    clientNumber: string;
    clientSecret: string;
    callbackURL: string;
  };
};
