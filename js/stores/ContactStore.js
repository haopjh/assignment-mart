var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _contacts = {};
var CHANGE_EVENT = "change";
/**
 * Create a Contact item.
 * @param  {number} id
 * @param  {string} name
 * @param  {string} tel
 * @param  {string} email
 */
function create(id, name, tel, email, avatar) {
  if(!avatar) {
    avatar = Math.ceil(Math.random()*15) + '.jpg';
  }

  _contacts[id] = {
    id: id,
    name: name,
    tel: tel,
    email: email,
    avatar: avatar
  };
}

/**
 * Create a list Contacts.
 * @param  {list} contacts
 */
function createList(contacts) {
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
  _contacts[id] = assign(_contacts[id], updates);
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
    case "createContact":
      create(action.id, action.name, action.tel, action.email);
      ContactStore.emitChange();
      break;

    case "createContacts":
      createList(action.contacts);
      ContactStore.emitChange();
      break;

    case "updateContact":
      update(action.id, action.contact);
      ContactStore.emitChange();
      break;

    case "deleteContact":
      destroy(action.id);
      ContactStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ContactStore;
