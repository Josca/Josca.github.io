imgname = "chb.jpg"

var img = new Image;
img.src = imgname;
var labelOffset = 15;

c = document.getElementById('container');
c.style.backgroundImage = "url('" + imgname +   "')";

var svgns = "http://www.w3.org/2000/svg";
var svgElem = document.getElementById('svg');
var labelTextElem = document.getElementById('labelText');
var labelRectElem = document.getElementById('labelRect');

var items = [
  {"x": 473, "y": 880, "desc": "Chrám sv. Víta, Václava a Vojtěcha"},
  {"x": 2838, "y": 1012, "desc": "Socha sv. Jana Nepomuckého"}
];

window.onload = function () {
  // get scale quotient
  var fw = window.innerWidth / img.width;
  var fh = window.innerHeight / img.height;
  var fScale = Math.min(fw, fh)

  // scale svg element with scale quotient
  svgElem.setAttribute("width", fScale * img.width)
  svgElem.setAttribute("height", fScale * img.height)

  console.log("fw:", fw, "fh:", fh, "fScale:", fScale);

  items.forEach(function (item, i) {
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
  });
}
