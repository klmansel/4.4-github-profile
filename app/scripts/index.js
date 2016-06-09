var $ = require('jquery');
var handlebars = require('handlebars');

var githubtoken = require('./githubapikey.js');

if(githubtiken !== undefined){
  $.ajaxSetup({
    headers: {
      'Authorization': 'token' + githubtoken
    }
  });
}
