## What is Simple CRM?

Demo here: http://redoxsimplecrm.meteor.com/

I come from a .Net background and Simple CRM is a SPA website I built in order to teach myself JavaScript, Meteor, React, Redux, Git etc.  I've been working on it fairly full time for around 6 weeks, but beware that I only started learning JavaScript about three months ago.

I hope that, after I incorporate feedback from more experienced developers, Simple CRM can become a valuable resource to the community that provides the next step in learning after the Todo app examples.  That was a resource that I was desperately looking for but never found when I was learning.
  
## What does the app do?
 
![Simple CRM Dashboard Screenshot](https://cloud.githubusercontent.com/assets/11335350/13715429/7f160b28-e7cc-11e5-862b-41ac82f730eb.png)

The code tries to provide examples of all of the common stuff you need to write for line of business and data-centric apps.  

Namely:

- Data entry forms
- Business logic
- Validation logic
- Real-time validation
- CRUD
- Relationships and relational integrity
- Data denormalization
- Async auto-complete

In time it will also include

- Security
- Charts
- Paper reporting
- Excel export
- Testing

## Er... Where's the code?

If you haven't seen Meteor 1.3's recommended application structure yet you may be wondering where the actual code is.

The UI Is here <a href="https://github.com/tomRedox/simpleCRM/tree/master/imports/ui" target="_blank">https://github.com/tomRedox/simpleCRM/tree/master/imports/ui</a> and the API is here <a href="https://github.com/tomRedox/simpleCRM/tree/master/imports/api" target="_blank">https://github.com/tomRedox/simpleCRM/tree/master/imports/api</a> 

## Technology
This version of Simple CRM uses the following stack/technologies:

- Meteor 1.3
- MongoDB
- React for the view layer
- Redux for the application state 

## Installation
The instructions below assume you've already installed Meteor on your machine.  

1. Clone this repository to your machine:  `git clone https://github.com/tomRedox/simpleCRM.git`
2. Change to the project's directory:  `cd simpleCRM`
3. Install the version of Meteor used by this project:  `meteor update --release 1.3-beta.12`  (you can have multiple versions of Meteor installed on a machine, so this shouldn't upset any other projects.  Meteor stores which version to user for a particular project in the .meteor/release file)
4. Install the npm modules used by the project:  `npm install`

Then run the project with `meteor`.  The login credentials are: email: default@admin.com password: default@admin.

## Meteor
The app is running on Meteor 1.3 Beta 12 and will not work with Meteor 1.2.  

I've tried to adopt the standards laid down in the Meteor guide, especially:

- Application structure that uses main.js entry points and puts the rest of the code in imports directories (ES2015)
- Container pattern
- Template level data subscriptions
- Use of MDG validated methods
- No AutoPublish or Insecure

## React/Redux
The view layer is built in React, with each component in its own file.  I've tried to follow React best practice, although defining exactly what constitutes best practice at present is difficult as React and Redux are still changing so often.

I've used Redux for managing the application state. However, I do not put the stored data in the state, I leave MiniMongo out of Redux altogether.  I do copy data into the state while it's being edited however, I do this to make the record being edited non-reactive during the edit (I don't want the data the user sees to change while they are editing it) and in order to allow real-time data validation.

There is also a ["no-redux" branch](https://github.com/tomRedox/simpleCRM/tree/no-redux) that features the older working version of the system before I switched over to Redux.  That may be interesting to those wishing to see what an app looks like with and without Redux.  I won't be maintaining the no-redux branch, it's just for info.

## UI Design
At the moment I've done the basics to get things up and running, but little in the way of design work has gone into the project so far.

The design consists of:

- Material design-esque theme from Bootswatch
- Parts of the SB Admin 2 Bootstrap theme

I have also experimented with the excellent [Material-UI React component library](http://www.material-ui.com/#/) and I may adopt that at some point.  There is a separate branch for that work 

## Security

The app now has security based on Meteor's in-built security API.  The login credentials are:
email: default@admin.com
password: default@admin

## Testing
There are a couple of unit tests for the business logic in the lib folder.  The testing has been built using the instructions in the [draft Testing chapter of the Meteor Guide](https://github.com/meteor/guide/blob/testing-modules-content/content/testing.md). 

To run the tests open up a second command window and type: 
`meteor test --driver-package avital:mocha --port 3100`
This starts the test runner which will automatically rerun the tests as required.

You can then view the test results at [http://localhost:3100/](http://localhost:3100/).

## Todo
I need to feed the changes from our production dev back into this project, namely:
- [ ] ES6 syntax
- [ ] Functional stateless components
- [ ] Meteor 1.3 final
- [ ] Updates to the testing frameworks

Other broad areas still to be looked at in the project are:

- [ ] IsDirty checking to warn before navigation when changes have been made
- [x] Unit tests
- [ ] End-to-end/integration test
- [ ] Add [Airbnb's linting](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- [ ] Security - only return and write data for logged in users
- [ ] Security - add Admin role, only Admin to be able edit the Products list
- [ ] Charts
- [ ] Paper reporting
- [ ] Excel export
- [ ] Improve/fix the transition animations
- [ ] Customer deletion
- [ ] Customer search page - allow search on address, name and postcode
- [ ] Pagination on All Customers and All Orders pages
- [ ] Sorting options on lists

## Learning resources used in this solution
I am hugely grateful to the Meteor community and the members of the SpaceDojo/Meteor Club Slack channel for all their help getting up to speed on everything.

These are some of the many resources that have really helped me:

### General Meteor stuff
- [Meteor Guide](http://guide.meteor.com/)
- [Meteor Guide 1.3 (draft)](http://guide.meteor.com/v1.3)
- [Meteor Forums](https://forums.meteor.com/)
- [Rob Conery's Building a Realtime Web Application with Meteor.js Pluralsight course](https://app.pluralsight.com/library/courses/meteorjs-web-application/table-of-contents)
- [SpaceDojo](http://spacedojo.com/) and the [SpaceDojo community](https://www.patreon.com/meteorclub?ty=c)
- [Meteor Chef](https://themeteorchef.com/)
- [Meteor Chef - Click to edit fields in react](https://themeteorchef.com/snippets/click-to-edit-fields-in-react/)
- [Stack Overflow](http://stackoverflow.com/)

### React (non Meteor specific)
- [Cory House's Building Applications with React and Flux Pluralsight course](https://app.pluralsight.com/library/courses/react-flux-building-applications/table-of-contents)
- [Official React documentation](https://facebook.github.io/react/docs/getting-started.html)
- [Official Redux documentation](http://redux.js.org/docs) 

### React in Meteor
- [The official guidance from the draft Meteor Guide for Meteor 1.3](http://guide.meteor.com/v1.3/react.html)
- [The official React example app, main React branch](https://github.com/meteor/todos/tree/react)
- [The official React example app, React with Tests branch](https://github.com/meteor/todos/tree/react-testing) 
- [Discussion of the Container pattern and how to stop React components rendering before the data is available](https://thoughts.spacedojo.com/meteor-1-3-and-react-composition-with-reactive-data-b0bb3282fea#.a5yqn4j83)

### Redux in Meteor - the path to enlightenment
If you don't know Redux yet, then learn:
- [Learn it from the master, Dan Abromov's EggHeads Redux video series](https://egghead.io/series/getting-started-with-redux)

Start with this series:
- [Abhi Aiyer's How we Redux series - Part 1](https://medium.com/modern-user-interfaces/how-we-redux-part-1-introduction-18a24c3b7efe#.4xzqhtyea)
- [Abhi Aiyer's How we Redux series - Part 2](https://medium.com/modern-user-interfaces/how-we-redux-part-2-setup-c6aa726fa79e#.kpun54ox5)
- [Abhi Aiyer's How we Redux series - Part 3](https://medium.com/modern-user-interfaces/how-we-redux-part-3-domain-890964824fec#.ujuwer38a)
- [Abhi Aiyer's How we Redux series - Part 4](https://medium.com/modern-user-interfaces/how-we-redux-part-4-reducers-and-stores-f4a0ebcdc22a#.frb4di9zz)
- [Abhi Aiyer's How we Redux series - Part 5](https://medium.com/modern-user-interfaces/how-we-redux-part-5-components-bddd737022e1#.1w2j8scwd)
- [How we Redux example app repo](https://github.com/abhiaiyer91/How-We-Redux-Todos)

But also open up this example and have it to refer to too:
- [ffxSam's ffx-meteor-react-boilerplate - great thunk examples](https://github.com/ffxsam/ffx-meteor-react-boilerplate/blob/example/client/actions/colors.js)

And also this is really useful:
- [AdamBrodzinski's meteor-flux-helpers](https://github.com/AdamBrodzinski/meteor-flux-helpers/blob/master/flux-helpers.js)
- [Discussion of meteor-flux-helpers](https://forums.meteor.com/t/flux-helpers-package/7814/5)
- [Redux version of meteor-flux-helpers example app](https://github.com/AdamBrodzinski/meteor-flux-leaderboard/tree/redux)

Other useful bits:
- [Redux approach in Meteor discussion](https://forums.meteor.com/t/redux-approach-on-meteor/8441/17)

## About Redox Software Ltd
We write bespoke line of business software for small and medium size businesses.  

Read all about us at [http://www.redox-software.co.uk/](http://www.redox-software.co.uk/).

