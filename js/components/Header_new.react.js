var React = require('react');

var Header_new = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <section id="header">
        <header id="bs-header">
          <div class="container">
            <h1>Contact Manager</h1>
            <p>Simple Backbone.js example application</p>
          </div>
        </header>
        <section id="app"></section>
      </section>
    );
  }

});

module.exports = Header_new;
