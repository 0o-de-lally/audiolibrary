import { Session } from 'meteor/session'
import moment from 'moment'
Template.audio.helpers({
  list: function(){
    if ( Session.get('missing-files') || Session.get('missing-meta') ){
      return Library.find({ hash: { $exists: !Session.get('missing-files') }, created: { $exists: !Session.get('missing-meta') }  }).fetch()

    } else {
      return Library.find({},{sort:{created:-1}}).fetch()

    }
  },
  createdDate: function (timestamp) {
    return moment(timestamp).format('DD/MM/YYYY')
  }
});

Template.audio.events({
  "change #missing-files": function(event, template){
     var state = $('#missing-files').prop('checked')
    //  console.log('state', state)
     Session.set('missing-files', state)
  },
  "change #missing-meta": function(event, template){
     var state = $('#missing-meta').prop('checked')
    //  console.log('state', state)
     Session.set('missing-meta', state)
  },
  "change .star-checkbox": function(event, template){
     var state = $(event.currentTarget).prop('checked')
     console.log('state', state)
     var audioId = $(event.currentTarget).attr('data-id')
     Library.update({_id: audioId}, {$set: {starred: state } })
     console.log('audioId', audioId)

    //  Session.set('missing-meta', state)
  },
  "click .stage-option": function(event, template){
    // console.log('event', event.currentTarget)
    var id = $(event.currentTarget).attr('data-id')
    var value = $(event.currentTarget).attr('data-value')

    Library.update({_id: id }, {$set: { stage: value } })
    // console.log('id', id);
     $('.dropdown-button').dropdown('close');
    //  var state = $('#missing-meta').prop('checked')
    //  console.log('state', state)
    //  Session.set('missing-meta', state)
  }
});

Template.audio.rendered = function(){
  setTimeout( function(){
    $('.dropdown-button').dropdown()
  }, 5 * 1000)

  Session.set('missing-files', false)
  Session.set('missing-meta', false)

}
