app.factory("auth",["$http","$window",function(e,n){var t={};return t.saveToken=function(e){n.localStorage["flapper-news-token"]=e},t.getToken=function(){return n.localStorage["flapper-news-token"]},t.isLoggedIn=function(){var e=t.getToken();if(e){var o=JSON.parse(n.atob(e.split(".")[1]));return o.exp>Date.now()/1e3}return!1},t.currentUser=function(){if(t.isLoggedIn()){var e=t.getToken(),o=JSON.parse(n.atob(e.split(".")[1]));return o.username}},t.register=function(n){return e.post("/register",n).success(function(e){t.saveToken(e.token)})},t.logIn=function(n){return e.post("/login",n).success(function(e){t.saveToken(e.token)})},t.logOut=function(){n.localStorage.removeItem("flapper-news-token")},t}]);