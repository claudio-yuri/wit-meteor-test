import { Meteor } from 'meteor/meteor';
import { template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated(){
    this.state = new ReactiveDict();
});

Template.body.helpers({
    tasks(){
        const instance = Template.instance();
        if(instance.state.get('hideCompleted')){
            //if hide completed is checked, filter tasks
            return Tasks.find({ checked: { $ne: true } }, { sort: {checked: 1, createdAt: -1 } });
        }
        //otherwise, return all of the tasks
        return Tasks.find({}, { sort: { checked: 1, createdAt: -1} });
    },
    incompleteCount(){
        return Tasks.find({ checked: { $ne: true } }).count();
    },
});

Template.body.events({
   'submit .new-task'(event){
        event.preventDefault();
        
        // Get value from form element
        const target = event.target;
        const text = target.text.value;
    
        // Insert a task into the collection
        Tasks.insert({
          text,
          createdAt: new Date(), // current time
          owner: Meteor.userId(),
          username: Meteor.user().username,
        });
    
        // Clear form
        target.text.value = '';
   },
   'change .hide-completed input'(event, instance){
       instance.state.set('hideCompleted', event.target.checked);
   },
});