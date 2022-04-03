'use strict';

/**
 * honor service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::honor.honor');
