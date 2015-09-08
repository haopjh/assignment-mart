var React = require('react');
var ContactStore = require('../stores/ContactStore');
var ContactItem = require('../components/ContactItem.react');

function getContactState() {
  return {
    allContacts: ContactStore.getAll()
  };
}

var ContactList = React.createClass({

  getInitialState: function() {
    return getContactState();
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

    var contacts = [];
    var keyList = Object.keys(this.state.allContacts);

    if(keyList.length) {
      for (var key in this.state.allContacts) {
        contacts.push(<ContactItem key={key} contact={this.state.allContacts[key]} />);
      }
    } else {
      contacts.push(
        <div className="no-contact-content"> 
          No contacts have been added. <br />
          Add a contact now.
        </div>
      );
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
    console.log("this ran");
    this.setState(getContactState());
  }
});

module.exports = ContactList;