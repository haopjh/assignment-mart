var AppDispatcher = require('../dispatcher/AppDispatcher');

var ContactActions = {

  /**
   * @param  {string} text
   */
  create: function(id, name, email, tel) {
    AppDispatcher.dispatch({
      actionType: "createContact",
      id: id,
      name: name,
      email: email,
      tel: tel
    });
  },

  /**
   * @param  {string} text
   */
  update: function(id, contact) {
    AppDispatcher.dispatch({
      actionType: "updateContact",
      id: id,
      contact: contact
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: "deleteContact",
      id: id
    });
  },

};

module.exports = ContactActions;
