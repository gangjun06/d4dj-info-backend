'use strict';

/**
 * music-game service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::music-game.music-game');
