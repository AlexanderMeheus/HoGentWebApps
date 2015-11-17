app.controller('MainCtrl', [
  '$scope',
  'posts',
  'auth',
  function($scope, postFactory, auth) {
    $scope.posts = postFactory.posts;
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.addPost = function() {
      if (!$scope.title || $scope.title === '') {
        return;
      }
      postFactory.create({
        title: $scope.title,
        link: $scope.link,
        author: 'user',
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
      postFactory.upvote(post);
    };

    /*$scope.decrementUpvotes = function(post) {
      postFactory.downvote(post);
    };*/

  }
]);
