app.factory('posts', ['$http', 'auth', function($http, auth) {
  var postFactory = {
    posts: []
  };

  postFactory.getAll = function() {
    return $http.get('/posts').success(function(data) {
      angular.copy(data, postFactory.posts);
    });
  };

  postFactory.create = function(post) {
    return $http.post('/posts', post, {
      headers: {
        Authorization: 'Bearer ' + auth.getToken()
      }
    }).success(function(data) {
      postFactory.posts.push(data);
    });
  };

  postFactory.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote', null, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      })
      .success(function(data) {
        post.upvotes += 1;
      });
  };

  postFactory.downvote = function(post) {
    if (post.upvotes > 0) {
      return $http.put('/posts/' + post._id + '/downvote', null, {
          headers: {
            Authorization: 'Bearer ' + auth.getToken()
          }
        })
        .success(function(data) {
          post.upvotes -= 1;
        });
    }
  };

  postFactory.get = function(id) {
    return $http.get('/posts/' + id).then(function(res) {
      return res.data;
    });
  };

  postFactory.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment, {
      headers: {
        Authorization: 'Bearer ' + auth.getToken()
      }
    });
  };

  postFactory.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote', null, {
        headers: {
          Authorization: 'Bearer ' + auth.getToken()
        }
      })
      .success(function(data) {
        comment.upvotes += 1;
      });
  };

  postFactory.downvoteComment = function(post, comment) {
    if (comment.upvotes > 0) {
      return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/downvote', null, {
          headers: {
            Authorization: 'Bearer ' + auth.getToken()
          }
        })
        .success(function(data) {
          comment.upvotes -= 1;
        });
    }
  };

  return postFactory;
}]);
