'use strict';

/**
 * login-bonus service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::login-bonus.login-bonus');
