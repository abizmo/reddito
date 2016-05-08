/**
 * Link model events
 */

'use strict';

import {EventEmitter} from 'events';
import Link from './link.model';
var LinkEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LinkEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Link.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LinkEvents.emit(event + ':' + doc._id, doc);
    LinkEvents.emit(event, doc);
  }
}

export default LinkEvents;
