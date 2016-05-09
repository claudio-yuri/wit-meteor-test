import { Acounts } from 'meteor/accounts-base';
//import { ServiceConfiguration } from 'meteor/service-configuration';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});

//TODO: complete facebook login
/*
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1777337805831126',
    secret: '46207b01d284958d00bfcab73f5cee29'
});*/