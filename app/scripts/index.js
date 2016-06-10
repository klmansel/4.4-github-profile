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
//Profile
var baseUrl = 'https://api.github.com/users/klmansel';
var profileTemplate = $('#profileTemplate').html();
var template = handlebars.compile(profileTemplate);

$.ajax(baseUrl).done(function(profile){
  console.log(profile);
  console.log(profile.name);
  var renderTemplate = template(profile);
  $('.profile-left').append(renderTemplate);
});


//Repos
var reposUrl = baseUrl + '/repos';
var repotemp = $('#repotemplate').html();
var repoform = handlebars.compile(repotemp);

$.ajax(reposUrl).done(function(repos){
  console.log(repos);
  repos.forEach(function(repo){
    console.log(repo);

    var renderTemplate = repoform(repo);
    $('.repos-section').append(renderTemplate);


  });

});


// var renderTemplate = template(product);
//     $('.products-box').append(renderTemplate);
//   });
// var baseUrl = 'http://swapi.co/api/';
// var planetListItemTemplate = $('#planet-list-item-template').html();
// var template = handlebars.compile(planetListItemTemplate);
//
// $('.js-planets-button').on('click', function(event){
//   event.preventDefault();
//
//   getPlanets();
// });
//
// function getPlanets(){
//   var planetsUrl = baseUrl + 'planets/';
//
//   $.ajax(planetsUrl).done(function(planetList){
//     planetList.results.forEach(function(planet){
//       displayPlanet(planet);
//     });
//   });
// }
//
// function displayPlanet(planet){
//   var html = template(planet)
//   $('.js-planet-list').append(html);
//
//   $.ajax(planet.url).done(function(planetDetails){
//     $('#' + planetDetails.name).append('<span> :: ' + planetDetails.climate + '</span>');
//   });
// }




      /*
        (url: String, callback: Function) -> undefined
        Execute a callback function with the JSON results from the url specified.
        Examples
            var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=tacos&includes=Images,Shop";
            fetchJSONP(url, function(data) {
              // do something with data
            });
            // OR
            function logData(data) {
              console.log(data);
            }
            fetchJSONP(url, logData);
      */
      function fetchJSONP(url, callback) {
          var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
          var script = document.createElement('script');

          window[callbackName] = function(data) {
              delete window[callbackName];
              document.body.removeChild(script);
              callback(data);
          };

          script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
          document.body.appendChild(script);
      }
