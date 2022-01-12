module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bc1ad5b7866684a2e9750c43bf4a04e3'),
  },
});
