app.controller("NavCtrl",["$scope","auth",function(r,e){r.isLoggedIn=e.isLoggedIn,r.currentUser=e.currentUser,r.logOut=e.logOut}]);