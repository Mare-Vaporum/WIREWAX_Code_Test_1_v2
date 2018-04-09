
var tagStartTime = 2000;
var tagStartTime = 1000;
var tagDuration = 5000;

buildItems();
idsToVars();
setStates();
setInteractions();

setTimeout(showTag, tagStartTime);
// setTimeout(hideTag, tagStartTime + tagDuration);
// setTimeout(animateOutTag, tagStartTime + tagDuration - tagAnimateOutTime);

function showTag() {
  TweenMax.set(myTag, {autoAlpha:1});
  TweenMax.to(SVGHolder, 1, {scale:1, ease:Elastic.easeOut});
  TweenMax.to(copy1, 0.8, {alpha:1, ease:Linear.easeNone, delay:0.6});
  TweenMax.to(copy2, 0.8, {alpha:1, ease:Linear.easeNone, delay:0.7});
}

function hideTag() {
  TweenMax.set(myTag, {autoAlpha:1});
}

function showOverlay() {
  TweenMax.set(myOverlay, {autoAlpha:1});
}

function closeOverlay() {
  TweenMax.set(myOverlay, {autoAlpha:0});
}

function buildItems(){
  var tagHolder = document.createElement("div");
  tagHolder.setAttribute("id", "tagHolder");
  myTag.appendChild(tagHolder);

  // a div to hold the svg
  var SVGHolder = document.createElement("div");
  SVGHolder.setAttribute("id", "SVGHolder");
  tagHolder.appendChild(SVGHolder);

  // this is the svg tag being created
  var SVG = document.createElementNS("http://www.w3.org/2000/svg",'svg');
  SVG.style.width = "100%";
  SVG.style.height = "100%";
  SVG.style.fill= "#FFFFFF";
  SVG.setAttribute("id", "tagHotspot");
  SVG.setAttribute("viewBox", "0 0 100 100");
  SVG.setAttribute("preserveAspectRatio", "xMinYMin");
  SVGHolder.appendChild(SVG);

  // main outline of the svg
  var mainSVGOutline = document.createElementNS("http://www.w3.org/2000/svg",'path');
  mainSVGOutline.setAttribute("d", "M50,99.5l-1.3-1.8C47.4,95.9,16,53.1,16,34.7C16,15.8,31.2,0.5,50,0.5c18.8,0,34,15.4,34,34.2c0,18.3-31.4,61.2-32.7,63L50,99.5z M50,3.7c-17,0-30.8,13.9-30.8,31C19.2,50,44,85.6,50,94c6-8.4,30.8-44,30.8-59.3,C80.8,17.6,67,3.7,50,3.7z");

  // the white circle
  var SVGCircleBG = document.createElementNS("http://www.w3.org/2000/svg",'circle');
  SVGCircleBG.setAttributeNS(null, 'cx', 50);
  SVGCircleBG.setAttributeNS(null, 'cy', 35);
  SVGCircleBG.setAttributeNS(null, 'r', 20);
  SVGCircleBG.setAttributeNS(null, 'style', 'fill: none; stroke: white; stroke-width: 3px;' );

  SVG.appendChild(mainSVGOutline);
  SVG.appendChild(SVGCircleBG);

  // Text box
  var textHolder = document.createElement("div");
  textHolder.setAttribute("id", "textHolder");
  textHolder.innerHTML += "<span id='copy1' style='display: table; width: 100%; font-size: 1.2vw; font-style: italic'>click to learn about</span>";
  textHolder.innerHTML += "<span id='copy2' style='display: table; width: 100%; font-size: 2vw; font-style: italic'>THE LONDON EYE</span>";
  tagHolder.appendChild(textHolder);
}

// SET IDs IN DOM TO GLOBAL VARIABLES
function idsToVars() {
  [].slice.call(document.querySelectorAll('*')).forEach(function(el) {
    if (el.id) window[el.id] = document.getElementById(el.id);
  });
}

// Initial states
function setStates(){
  TweenMax.set([myTag, myOverlay], {autoAlpha:0});
  TweenMax.set(SVGHolder, {scale:0, transformOrigin:"50% 100%"});
  TweenMax.set([copy1, copy2], {alpha:0});
}

// All eventlisteners
function setInteractions(){
  myTag.addEventListener('click', function(){
    showOverlay();
  })
}
