var paramsEncoded = window.location.search.substr(1);  // get query params as one string
var paramsDecoded = decodeURIComponent(paramsEncoded); // url-decode it
var paramsList = paramsDecoded.split("&");             // parse particular params

// detect if edit mode is on using 3rd param "edit"
var allowEdit = paramsList.length == 3 && paramsList[2] == "edit";

var imageUrl = paramsList[0]; // first param is input image url
var img = new Image;
img.src = imageUrl;
var labelOffset = 15;

containerDiv = document.getElementById('container');
containerDiv.style.backgroundImage = "url('" + imageUrl +   "')";

var textEdit = document.getElementById('textEdit');
if (!allowEdit) {
  textEdit.style.display = "none";
}

var svgns = "http://www.w3.org/2000/svg";
var svgElem = document.getElementById('svg');
var labelTextElem = document.getElementById('labelText');
var labelRectElem = document.getElementById('labelRect');

var itemsDecoded = paramsList[1];
var items = []
if (itemsDecoded) {
  items = JSON.parse(itemsDecoded);
}

window.onload = function () {
  // get scale quotient
  var fw = window.innerWidth / img.width;
  var fh = window.innerHeight / img.height;
  var fScale = Math.min(fw, fh)

  // scale svg element with scale quotient
  svgElem.setAttribute("width", fScale * img.width);
  svgElem.setAttribute("height", fScale * img.height);

  function drawPoint(item) {
    var circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'cx', item.x * fScale);
    circle.setAttributeNS(null, 'cy', item.y * fScale);
    circle.setAttributeNS(null, 'r', 10);

    circle.addEventListener('mouseover', function () {
      labelTextElem.innerHTML = item.desc;
      labelTextElem.setAttribute("x", item.x * fScale + labelOffset);
      labelTextElem.setAttribute("y", item.y * fScale + labelOffset);

      labelRectElem.setAttribute("x", item.x * fScale);
      labelRectElem.setAttribute("y", item.y * fScale);
      labelRectElem.setAttribute("width", labelTextElem.getBBox().width + 2 * labelOffset);
      labelRectElem.setAttribute("height", labelTextElem.getBBox().height + labelOffset);
    });

    circle.addEventListener('mouseleave', function () {
      labelTextElem.innerHTML = "";
      labelRectElem.setAttribute("width", 0);
      labelRectElem.setAttribute("height", 0);
    });

    svgElem.appendChild(circle);
  }

  // draw svg circles - annotated points
  items.forEach(function (item, i) {
    drawPoint(item);
  });

  // enable points adding using mouse click on image
  if (allowEdit) {
    containerDiv.addEventListener('mousedown', function(e) {
      var x = Math.round(e.clientX / fScale);
      var y = Math.round(e.clientY / fScale);
      var m = {"x": x, "y": y, "desc": textEdit.value};
      drawPoint(m);
      textEdit.value = "";

      items.push(m);
      alert(JSON.stringify(items));
    });
  }
}
