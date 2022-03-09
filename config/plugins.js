module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "mailgun",
      providerOptions: {
        apiKey: env("MAILGUN_API_KEY"),
        domain: env("MAILGUN_DOMAIN"),
        host: env("MAILGUN_HOST", "api.mailgun.net"),
      },
      settings: {
        defaultFrom: env("MAILGUN_FROM"),
        defaultReplyTo: env("MAILGUN_FROM"),
      },
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 9,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
});
