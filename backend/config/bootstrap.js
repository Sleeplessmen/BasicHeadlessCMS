require('dotenv').config({
    path: require('path').resolve(__dirname, '../.env'),
});

module.exports.bootstrap = async function (done) {
    try {
        if (process.env.NODE_ENV === 'development') {
            await require('../scripts/seedPermissions')();
            await require('../scripts/seedRoles')();
            await require('../scripts/seedUsers')();
            await require('../scripts/seedProducts')();
        }

        return done();
    } catch (err) {
        sails.log.error('❌ Bootstrap error:', err.stack || err.message);
        return done(err);
    }
};
