"use strict";

/**
 *  service controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::service.service", ({ strapi }) => ({

  // async findOne(ctx) {
  //   const { id } = ctx.params;
  //   console.log(ctx.params);
  //   const { query } = ctx;
  //
  //   const entity = await strapi.service("api::service.service").findOne({ shortName: id }, query);
  //   const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
  //
  //   return this.transformResponse(sanitizedEntity);
  // }

}));
