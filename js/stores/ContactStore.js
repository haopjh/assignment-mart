var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var _contacts = {};

/**
 * Create a Contact item.
 * @param  {number} id
 * @param  {string} name
 * @param  {string} tel
 * @param  {string} email
 */
function create(id, name, tel, email, avatar) {
  if(!avatar);
  avatar = Math.ceil(Math.random()*15) + '.jpg';

  _contacts[id] = {
    id: id,
    name: name,
    tel: tel,
    email: email,
    avatar: avatar
  };
}

function createContacts(contacts) {
  if(contacts.length) {
    for(var i=0; i< contacts.length; i++) {
      var contact = contacts[i];
      if(!contact.avatar) {
        contact.avatar = Math.ceil(Math.random()*15) + '.jpg';
      }
      _contacts[contact.id] = contact;
    }
  }
  
}

/**
 * Update a Contact item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _contacts[id] = assign({}, _contacts[id], updates);
}

/**
 * Delete a Contact item.
 * @param  {string} id
 */
function destroy(id) {
  delete _contacts[id];
}


var ContactStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of Contact.
   * @return {object}
   */
  getAll: function() {
    return _contacts;
  },

  /**
   * Get the entire collection of Contact.
   * @return {object}
   */
  getOne: function(contactId) {
    return _contacts[contactId];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case "create":
      create(action.id, action.name, action.tel, action.email);
      ContactStore.emitChange();
      break;

    case "createContacts":
      createContacts(action.contacts);
      ContactStore.emitChange();
      break;

    case "update":
      update(action.id, action.name, action.tel, action.email);
      ContactStore.emitChange();
      break;

    case "destroy":
      destroy(action.id);
      ContactStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ContactStore;
