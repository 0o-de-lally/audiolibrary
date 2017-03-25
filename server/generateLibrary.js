Meteor.methods({
  generateLibrary:function(){
    var filesList = Files.find().fetch()
    _.each(filesList, function(each){
      Library.upsert({filename: each.file, hash: each.hash, metadata: each.metadata}, {$addToSet: { source: each.source}})
      return
    })

    var metaList = Meta.find().fetch()
    _.each(metaList, function(each){
      Library.upsert({filename: each.title.slice(1), metadata: each._id}, { $set: { created: each.created } })
      return
    })
    // var uniqueHash = _.unique(uniqueHash)

    // console.log(uniqueHash.length);

  }
});
