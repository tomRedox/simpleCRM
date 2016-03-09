## What is Simple CRM?

Demo here: http://tomssimplecrm.meteor.com/

I come from a .Net background and Simple CRM is a SPA website I built in order to teach myself JavaScript, Meteor, React, Git etc.  I've been working on it fairly full time for around 6 weeks, but beware that I only started learning JavaScript about three months ago.

I hope that, after I incorporate feedback from more experienced developers, Simple CRM can become a valuable resource to the community that provides the next step in learning after the Todo app examples.  That was a resource that I was desperately looking for but never found when I was learning.
  
## What does the app do? 

The code tries to provide examples of all of the common stuff you need to write for line of business and data-centric apps.  

Namely:

- Data entry forms
- Business logic
- Validation logic
- Real-time validation
- CRUD
- Relationships and relational integrity
- Data denormalization

In time it will also include

- Security
- Charts
- Paper reporting
- Excel export
- Testing


## Technology
This version of Simple CRM uses the following stack/technologies:

- Meteor 1.3
- MongoDB
- React for the view layer
- Redux for the application state 

## Meteor
The app is running on Meteor 1.3 Beta 8 and will not work with Meteor 1.2.  

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

## Todo
Still to add to the project are:

- [ ] IsDirty checking to warn before navigation when changes have been made
- [ ] Unit tests
- [ ] End-to-end/integration test
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
- [ ] [BUG] blanking a field results in the change not being recorded - assume this is a simple schema CLEAN issue?
- [ ] [BUG] stop cursor jumping when you update the unit price


## Learning resources used in this solution
I am hugely grateful to the Meteor community and the members of the SpaceDojo/Meteor Club Slack channel for all their help getting up to speed on everything.

These are some of the many resources that have really helped me:

- [Meteor Guide](http://guide.meteor.com/)
- [Meteor Guide 1.3 (draft)](http://guide.meteor.com/v1.3/structure.html)
- [Meteor Forums](https://forums.meteor.com/)
- [SpaceDojo](http://spacedojo.com/) and the [SpaceDojo community](https://www.patreon.com/meteorclub?ty=c)
- [Abhi Aiyer's How we Redux series](https://medium.com/modern-user-interfaces/how-we-redux-part-1-introduction-18a24c3b7efe#.4xzqhtyea)
- [AdamBrodzinski's meteor-flux-helpers](https://github.com/AdamBrodzinski/meteor-flux-helpers/blob/master/flux-helpers.js)
- [Meteor Chef](https://themeteorchef.com/)
- [Meteor Chef - Click to edit fields in react](https://themeteorchef.com/snippets/click-to-edit-fields-in-react/)
- [Official React documentation](https://facebook.github.io/react/docs/getting-started.html)
- [Official Redux documentation](http://redux.js.org/docs) 
- [Dan Abromov's EggHeads Redux video series](https://egghead.io/series/getting-started-with-redux)
- [Stack Overflow](http://stackoverflow.com/)