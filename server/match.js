Meteor.methods({
  match: function () {
    var metadata = Meta.find().fetch()
    _.each(metadata, function(each){
      var title = each.title.slice(1)
      var count = Files.find({file: title}).count()
      if( count > 0) {
        var fileProperties = Files.find({ file: title }).fetch()

        Meta.update({ _id: each._id}, { $set: { fileProperties } })
      }
      // var fileProperties = Files.find( {file: title}).fetch()
      // Meta.update({ _id: each._id}, { $set: { fileProperties } })
    })
  },
  matchFileToMeta:function(){
    var filesList = Files.find().fetch()
    _.each(filesList, function(each){
      var filename = each.file
      var metadata = Meta.findOne({ title: '/' +  filename})
      if( metadata ) {
        Files.update({ _id: each._id}, { $set: { metadata: metadata._id } })
      }
      // var fileProperties = Files.find( {file: title}).fetch()
      // Meta.update({ _id: each._id}, { $set: { fileProperties } })
    })
  },
  identifyDuplicates:function(){
    var filesList = Files.find({source: 'dropbox'}).fetch()
    var uniqueHash = _.map(filesList, function(each){
      var filesList = Files.update({source: 'backup', hash: each.hash }, {$set: {dropboxExists: true }}, {multi:true})

      return each.hash
    })

    var filesList = Files.find({source: 'backup'}).fetch()
    var uniqueHash = _.map(filesList, function(each){
      var filesList = Files.update({source: 'dropbox', hash: each.hash }, {$set: {backupExists: true }}, {multi:true})

      return each.hash
    })
    // var uniqueHash = _.unique(uniqueHash)

  }
});
