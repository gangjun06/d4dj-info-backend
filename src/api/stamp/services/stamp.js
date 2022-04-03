'use strict';

/**
 * stamp service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stamp.stamp');
