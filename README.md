# RedMart Assignment

> An application architecture for React utilizing a unidirectional data flow.

## Contact Manager App Example Implementation

Here is a breakdown of the application's static files

<pre>
./
  index.html
  js/
    app.js
    bundle.js
    actions/
      ContactActions.js
    dispatcher/
      AppDispatcher.js
    components/
      ContactForm.react.js
      ContactList.react.js
      ContactItem.react.js
    stores/
      ContactStore.js
    helper/
      fixture.js
</pre>

## Running

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build the project, first run this command:

    npm start

This will perform an initial build and start a watcher process that will update bundle.js with any changes you wish to make.  This watcher is based on [Browserify](http://browserify.org/) and [Watchify](https://github.com/substack/watchify), and it transforms React's JSX syntax into standard JavaScript with [Reactify](https://github.com/andreypopp/reactify).

To run the app, spin up an HTTP server and visit http://localhost/.../todomvc-flux/.  Or simply open the index.html file in a browser.


## Current Improvements

- Form validation
- No contacts copy

## Future Improvements

- Popup modal to add or edit users
- After user creation, scroll to newly added user location
- Clearer form input rules


## Credit

This ContactManager application adopts the Flux React boilerplate created by [Bill Fisher](https://www.facebook.com/bill.fisher.771).

