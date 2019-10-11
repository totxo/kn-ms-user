const userCtrl = require('../controllers/user.ctrl');

module.exports = (app) => {
  app.route('/user/:username')
      .get(userCtrl.getOneUser)
};