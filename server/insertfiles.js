const fs = require('fs');
const md5File = require('md5-file')

var basepath = `/Users/LUCAS/Desktop/AudioRecorder/`

Meteor.methods({
  insertfiles: function () {
    fs.readdir(basepath, Meteor.bindEnvironment((err, files) => {
      files.forEach(file => {
        console.log(file);
        const hash = md5File.sync(basepath + file)
        console.log(hash)
        Files.insert({ file, hash , source: 'backup'})

      });
    }))
  },
  insertDropbox: function () {
    var basepath = `/Users/LUCAS/Dropbox/Apps/Sky recorder/`

    fs.readdir(basepath, Meteor.bindEnvironment((err, files) => {
      files.forEach(file => {
        console.log(file);
        const hash = md5File.sync(basepath + file)
        console.log(hash)
        Files.insert({ file, hash , source: 'dropbox'})
      });
    }))
  }
});
