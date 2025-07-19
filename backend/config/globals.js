module.exports.globals = {

    _: require('@sailshq/lodash'),
    async: false,
    models: true,
    sails: true,

    /****************************************************************************
    *                                                                           *
    * Custom globals                                                            *
    *                                                                           *
    ****************************************************************************/

    responseHelper: require('../utils/responseHelper'),
};
