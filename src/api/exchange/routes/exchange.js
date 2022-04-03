'use strict';

/**
 * exchange router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::exchange.exchange');
