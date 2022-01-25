'use strict';

/**
 * honor router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::honor.honor');
