Meteor.methods({
  uniqueHash: function () {
    var files =  Files.find().fetch()
    hash = _.map(files, function(e){
      return e.hash
    })
    return _.unique(hash)
  }
});
