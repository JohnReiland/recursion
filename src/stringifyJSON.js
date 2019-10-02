// this is what you would do if you liked things to be easy: 
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  stringified = '';
  if (Array.isArray(obj === true)) {
    stringified += '[';
    for (var i = 0; i < obj.length; i++) {
      if (i !== 0) {
        stringified += ',';
      }
      stringified += obj[i].toString();
    }
    stringified += ']';
  }

  if ((typeof obj) === 'object') {
    stringified += '{';
    for (prop in obj) {
      if (stringified !== '{') {
        stringified += ',';
      }
      stringified += '\'';
      stringified += prop;
      stringified += '\':';
      stringified += obj[prop];
    }
    stringified += '}';
  }
  return stringified;
};


stringifyJSON({ x: 5, y: 6 });        // expected output: "{'x':5,'y':6}"
//stringifyJSON([new Number(3), new String('false'), new Boolean(false)]);  // "[3,'false',false]"
//stringifyJSON({ x: [10, undefined, function(){}, Symbol('')] });          // "{'x':[10,null,null,null]}"
