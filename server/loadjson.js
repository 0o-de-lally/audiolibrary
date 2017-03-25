var fs = require('fs');

Meteor.methods({
  loadjson:function(){
    var json = JSON.parse(fs.readFileSync('/Users/LUCAS/Desktop/Skyro-metadata-backup.JSON', 'utf8'));
    console.log(json[0])
    _.each(json, function(each){
      each.skyroId = each._id
      delete each._id
      Meta.insert(each)
    })
  }
});
