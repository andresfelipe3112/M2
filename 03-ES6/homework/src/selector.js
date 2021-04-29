var traverseDomAndCollectElements  = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {    // STAReL Es el elemento del DOM que vamos a evaluar
    startEl = document.body;               //si el primero no existe le decimos que comience de domument.body.
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  if(matchFunc(startEl)){                 //si machea el primer elemento lo agrega de una array
    resultSet.push(startEl);
  }
  for(let i=0; i<startEl.children.length; i++){ // recorreremos todo el DOM  y en cada uno hacemos recursion
                                                // var traverseDomAndCollectElements  = function(matchFunc, startEl)
    var collectedElements = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = resultSet.concat(collectedElements);
  }
  return resultSet;

  
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí

  if (selector[0]=== "#") {
    return "id" 
   }
   
 
   
   if (selector[0] === ".") {
     return "class"
   }
 
   
   if (selector.split(".").length >1 ) {
     return "tag.class"
   }
 
    
   return "tag"
 
  
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;

  if (selectorType === "id") {
    matchFunction = function (el) {
      return "#"+ el.id && ("#" + el.id.toLowerCase() === selector.toLowerCase());
    }

  } else if (selectorType === "class") {
    matchFunction = function (el) {

      var clases = el.classList;


      for (let index = 0; index < clases.length; index++) {
        if ("." + clases[index] === selector ) {
          return true;
        }
      }

      return false;

     /*clases.filter(function (element) {
        if ("." + element.toLowerCase() ===  selector.toLowerCase()) {
          return true;
        }
        return false;

      })*/

    }

  } else if (selectorType === "tag.class") {
    matchFunction = function (el) {
      
   var tagClass = selector.split(".");

  var tag = tagClass[0];
  let clase = "." + tagClass[1];

  return matchFunctionMaker(tag)(el) && matchFunctionMaker(clase)(el)

    }

  } else if (selectorType === "tag") {
    matchFunction = function (el) {
      return el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase());
    }

  }
  return matchFunction;
};


var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
