'use strict';

/**
 * gacha service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gacha.gacha');
