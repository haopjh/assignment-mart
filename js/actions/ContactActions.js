var AppDispatcher = require('../dispatcher/AppDispatcher');

var ContactActions = {

  /**
   * @param  {string} text
   */
  create: function(id, name, email, tel) {
    AppDispatcher.dispatch({
      actionType: "create",
      id: id,
      name: name,
      email: email,
      tel: tel
    });
  },

};

module.exports = ContactActions;
