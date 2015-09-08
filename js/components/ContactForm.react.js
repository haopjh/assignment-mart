var React = require('react');
var ContactStore = require('../stores/ContactStore');
var ContactActions = require('../actions/ContactActions');
var Router = require('react-router');

var ContactForm = React.createClass({

  getInitialState: function() {
    var contactId = this.props.params.contactId;

    return {
      contact: ContactStore.getOne(contactId)
    };
  },

  componentDidMount: function() {
  },

  componentWillUnmount: function() {
  },

	/**
   * @return {object}
   */
  render: function() {
    //Initialise the contact if any
    var contact = this.state.contact ? this.state.contact : {};

    return (
    	<section id="contact-form">
	      <h2 className="page-header text-center">New or old Contact</h2>
        
        <form role="form" className="form-horizontal contract-form">
          <div className="form-group">
            <label className="col-sm-4 control-label">Full name:</label>
            <div className="col-sm-6">
              <input type="text" className="form-control contact-name-input" defaultValue={contact.name}/>
            </div>
          </div>
          <div className="form-group">
          <label className="col-sm-4 control-label">Email address:</label>
          <div className="col-sm-6">
            <input type="email" className="form-control contact-email-input" defaultValue={contact.email}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-4 control-label">Telephone number:</label>
          <div className="col-sm-6">
            <input type="tel" className="form-control contact-tel-input" defaultValue={contact.tel}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-4 col-sm-3">
            <div onClick={this.onSubmit} className="btn btn-outline btn-lg btn-block">Submit</div>
          </div>
          <div className="col-sm-3">
            <a href="#contacts" className="btn btn-outline btn-lg btn-block">Cancel</a>
          </div>
        </div>
        </form>
	    </section>
    );
  },

  /**
   * Event handler for 'change' events coming from the ContactStore
   */
  _onChange: function() {
    //Do nothing for n
  },

  onSubmit: function(event) {
    if(this.state.contact) {
      //Save the contact
      var updatedContact = {
        name: $(".contact-name-input").val().trim(),
        email: $(".contact-email-input").val().trim(),
        tel: $(".contact-tel-input").val().trim()
      }
      
      ContactActions.update(this.state.contact.id, updatedContact);

      window.location="#contacts";
    } else {
      //Create a new contact

      //Check if inputs are entered correctly
      var verified = true;

      //Validate name
      var name = $(".contact-name-input").val().trim();
      if(!name) {
        $(".contact-name-input").parent().addClass("has-error");
        $(".contact-name-input").attr("placeholder", "Please enter a valid name");
        verified = false;
      } else {
        $(".contact-name-input").parent().removeClass("has-error");
      }


      //Validate email
      var email = $(".contact-email-input").val();
      if(!this.validateEmail(email)) {
        $(".contact-email-input").parent().addClass("has-error");
        $(".contact-email-input").attr("placeholder", "Please enter a valid email");
        verified = false;
      } else {
        $(".contact-email-input").parent().removeClass("has-error");
      }

      //Validate tel
      var tel = $(".contact-tel-input").val();
      if(!this.validateTel(tel)) {
        $(".contact-tel-input").parent().addClass("has-error");
        $(".contact-tel-input").attr("placeholder", "Please enter a valid telephone number");
        verified = false;
      } else {
        $(".contact-tel-input").parent().removeClass("has-error");
      }


      if(verified) {
        ContactActions.create(Date.now(), name, email , tel);

        window.location="#contacts";
      }
    }
  },

  validateEmail: function(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  },

  validateTel: function(tel) {
    var re = /^[0-9\s(-)]*$/;
    return tel.length > 0 && re.test(tel);
  }
});

module.exports = ContactForm;