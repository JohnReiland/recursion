// If life was easy, we could just do things the easy way: 
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var elements = [];
  var body = document.body; 

  function hasClass(body) {

    if ((body.classList !== undefined)  &&  (body.classList.contains(className))) {
      elements.push(body);
    }

    if (body.hasChildNodes()) {
      for(var i = 0; i < body.childNodes.length; i++) {
        hasClass(body.childNodes[i]);
      }
    }

  };

  hasClass(body);

  return elements;
};
