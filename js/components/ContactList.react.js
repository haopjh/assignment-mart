var React = require('react');
var ContactStore = require('../stores/ContactStore');
var ContactItem = require('../components/ContactItem.react');

var ContactList = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    ContactStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ContactStore.removeChangeListener(this._onChange);
  },

	/**
   * @return {object}
   */
  render: function() {

    var allContacts = ContactStore.getAll();
    var contacts = [];

    for (var key in allContacts) {
      contacts.push(<ContactItem key={key} contact={allContacts[key]} />);
    }

    return (
    	<section id="contact-list">
	      <h2 className="page-header text-center">List of contacts</h2>
	      <p className="text-center">
	        <a href="#contacts/new" className="btn btn-lg btn-outline">Add Contact</a>
	      </p>
	      <ul className="media-list row contacts-container">
          {contacts}
        </ul>
	    </section>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    //Do nothing for now
  }
});

module.exports = ContactList;