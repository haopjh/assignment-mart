var React = require('react');
// var ContactStore = require('../stores/ContactStore');

var ContactItem = React.createClass({

  getInitialState: function() {
    return {};
  },

  // componentDidMount: function() {
  //   ContactStore.addChangeListener(this._onChange);
  // },

  // componentWillUnmount: function() {
  //   ContactStore.removeChangeListener(this._onChange);
  // },

  /**
   * @return {object}
   */
  render: function() {
    var contact = this.props.contact;
    if(!contact) {
      contact = {};
    }

    var imgSource = "/img/faces/" + contact.avatar;
    var editLink = "#contacts/edit/" + contact.id;

    return (
      <section id="contact-item" className="media col-md-6 col-lg-4">
        <div className="thumbnail">
          <img className="media-object" src={imgSource}/>
        </div>
        <div className="media-heading">
          <h3>
            {contact.name}
            <small>
              <a href={editLink}><span className="glyphicon glyphicon-pencil"></span></a>
              <a href="#contacts/delete/{id}" className="delete-contract">
                <span className="glyphicon glyphicon-trash"></span>
              </a>
            </small>
          </h3>
        </div>
        <div className="media-body">
          <dl>
            <dt>Phone Number:</dt>
            <dd>{contact.tel}</dd>
            <dt>Email:</dt>
            <dd>{contact.email}</dd>
          </dl>
        </div>
        <hr />
      </section>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  // _onChange: function() {
  //   //Do nothing for n
  // }
});

module.exports = ContactItem;