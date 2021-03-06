
/**
 * Module dependencies.
 */

var Socket = require('./sock')
  , debug = require('debug')('axon:router');

/**
 * Expose `RouterSocket`.
 */

module.exports = RouterSocket;

/**
 * Initialize a new `RouterSocket`.
 *
 * @api private
 */

function RouterSocket() {
  Socket.call(this);
}

/**
 * Sent `msg` to a connected peer with
 * the identity `id`.
 *
 * @param {String} id
 * @param {Mixed} msg
 */

RouterSocket.prototype.send = function(id, msg) {
  var args = [].slice.call(arguments)
    , msg = args.slice(1);

  if (args.length < 2) throw new Error('identity is required');
  if ('string' != typeof args[0]) throw new Error('invalid identity');

  var sock = this.map[id];
  if (sock) {
    sock.write(this.pack(msg));
  } else {
    debug('no peer "%s"', id);
  }
};

/**
 * Inherits from `Socket.prototype`.
 */

RouterSocket.prototype.__proto__ = Socket.prototype;
