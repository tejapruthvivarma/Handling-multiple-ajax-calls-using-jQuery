/*
 *  Publish/Subscribe - courtesy of davidwalshblog.com
 *
 *  === How to Subscribe ===
 *
 *  var mySubscription = events.subscribe('testSubscription', function(returnObject){
 *      console.log('Time to do something!', returnObject);
 *  });
 *
 *
 *  === How to Publish ===
 *
 *  events.publish('testSubscription', {
 *      status: 'success',
 *      message: 'this is the returnObject that will pass to the subscriber'
 *  });
 *
 *
 *  === How to Unsubscribe ===
 *
 *  mySubscription.remove();
 *
 *
 */
var events = (function(){
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      // Create the topic's object if not yet created
      if(!hOP.call(topics, topic)) topics[topic] = [];

      // Add the listener to queue
      var index = topics[topic].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!hOP.call(topics, topic)) return;

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
          item(info != undefined ? info : {});
      });
    }
  };
})();