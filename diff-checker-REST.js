
.factory('$helper', [function() {
var $helper = {};

  /**
  * @param {Object} original
  * @param {Object} toCompare
  * @param boolean (optional)
  *   - default is false
      - false checks all keys of object
      - true checks all keys that are own properties 
  * @return {Object}
  */
  $helper.diff = function (original, toCompare, ownProp) {

    var objectDiff = {}, diffObj;

    // If ownProp is not defined
    // Then default to using standard object key check
    if (ownProp === undefined) { ownProp = false; }

    /**
     * @param {Object} a
     * @param {Object} b
     * @return {Object}
     */
    objectDiff.diff = function diff(a, b) {

      if (a === b) {
        return false;
      }

      var toSave = {};
      var equal = true;

      for (var key in a) {
        if (a[key] !== b[key]) {
          var typeA = typeof a[key];
          var typeB = typeof b[key];

          // Currently using _.isArray func from loDash libarary
          // TODO: Swap out to make more modular / independent
          if (typeA == 'object' && typeB == 'object' && !_.isArray(a[key]) && !_.isArray(b[key])) {
            var valueDiff = diff(a[key], b[key]);

            if (valueDiff !== false) {
              equal = false;
              toSave[key] = valueDiff;
            }
          } else if (!(typeA == 'function') && !(typeB == 'function') && !_.isArray(a[key]) && !_.isArray(b[key])) {
            equal = false;
            toSave[key] = b[key];
          }
        }
      }

      if (equal) {
        return false;
      } else {
        return toSave;
      }
    };

    // Check for changes in object
    // If ownProp is true use ownProperties function
    return diffObj = ( ownProp ? diffOwnProperties.diff(original, toCompare) : objectDiff.diff(original, toCompare) );

  };

  return $helper;

}]);