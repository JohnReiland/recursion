// this is what you would do if you liked things to be easy: 
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) { 

  var wrap = function(complexObj) { // arrays and object literals get special treatment
    var stage;
    if (Array.isArray(complexObj) === true) {
      var wrapped = '[';
      for (var i = 0; i < complexObj.length; i++) {
        if (i !== 0) {
          wrapped += ',';
        }
        stage = stringifyJSON(complexObj[i]);     // recursion
        wrapped += stage;
      }
      wrapped += ']';
    } else {
      var wrapped = '{';
      for (prop in complexObj) {
        if (complexObj[prop] === null) {
          continue;
        }
        if (wrapped !== '{') {
          wrapped += ',';
        }
        wrapped += '\"' + prop + '\":';
        stage = stringifyJSON(complexObj[prop]);  // recursion
        wrapped += stage;
      }
      wrapped += '}'
    }
    return wrapped;
  };

  var stringified;
  switch (true) {

    case (Array.isArray(obj) === true) :        
      stringified = wrap(obj);          
      break;

    case ((typeof obj === 'string') || 
           (obj instanceof String)) :
      stringified = '\"' + obj + '\"';
      break;

    case  (obj instanceof Date) :
      stringified = '\"' + obj.toISOString() + '\"';
      break;
     
    case  (typeof obj === 'number') || 
            (obj instanceof Number) :
      stringified = obj.toString();
      break;

    case  (typeof obj === 'bigint') ||
         (typeof obj === 'boolean') || 
           (obj instanceof Boolean) :
      stringified = obj.toString();
      break;

    case (typeof obj === 'function') ||
           (obj instanceof Function) ||
           (typeof obj === 'symbol') ||
             (obj instanceof Symbol) ||
                 (obj === undefined) ||
                      (obj === null) :
      stringified = 'null';
      break;

    case (typeof obj === 'object') :          
      stringified = wrap(obj);      
      break;
  }      
  return stringified;
};

//stringifyJSON({ x: 5, y: 6 });                                            // expected output: "{'x':5,'y':6}"
//stringifyJSON([new Number(3), new String('false'), new Boolean(false)]);  // "[3,'false',false]"
//stringifyJSON({ x: [10, undefined, function(){}, Symbol('')] });          // "{'x':[10,null,null,null]}"
//stringifyJSON(new Date(2006, 0, 2, 15, 4, 5));                            // ""2006-01-02T15:04:05.000Z"" 
//stringifyJSON(new Number(9));                                             // "9"   (NOT 9, NOT "'9'", NOT Number(9))