var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute, 
	Link = Router.Link, 
	Route = Router.Route, 
	RouteHandler = Router.RouteHandler, 
	Redirect = Router.Redirect;

var ContactList = require('./components/ContactList.react'),
	ContactForm = require('./components/ContactForm.react');


require("./helper/fixture");



//Create and initialize the routes
var routes = (
	<Route path="/">
    <Route name="contacts" path="/contacts" handler={ContactList}/>
    <Route name="new" path="/contacts/new" handler={ContactForm}/>
    <Redirect from="/" to="contacts"/>
  </Route>
);

Router.run(routes, function (Handler) {
	React.render(
	  <Handler />,
	  document.getElementById('app')
	);
});