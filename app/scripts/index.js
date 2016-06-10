var $ = require('jquery');
var handlebars = require('handlebars');

var githubtoken = require('./githubapikey.js');

if(githubtoken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token ' + githubtoken.token
    }
  });
}
