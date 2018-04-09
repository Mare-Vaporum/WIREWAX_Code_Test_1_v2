var tagStartTime = 1000;
var tagDuration = 5000;

var loaderTimeline;

buildItems();
idsToVars();
setStates();
setInteractions();

setTimeout(showTag, tagStartTime);
// setTimeout(hideTag, tagStartTime + tagDuration);

function showTag() {
  TweenMax.set(myTag, {autoAlpha:1});
  TweenMax.to(SVGHolder, 1, {scale:1, ease:Elastic.easeOut, onComplete:pulse});
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

function pulse(){
  TweenMax.staggerFromTo([pulse1, pulse2, pulse3], 1.4, {scale:1, alpha:0.6}, {scale:1.6, alpha:0, ease:Power2.easeInOut, repeat:-1, repeatDelay:1}, 0.3);
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
  var mainSVG = document.createElementNS("http://www.w3.org/2000/svg",'svg');
  mainSVG.setAttribute("id", "mainSVG");
  mainSVG.setAttribute("viewBox", "0 0 100 100");
  mainSVG.setAttribute("preserveAspectRatio", "xMinYMin");
  SVGHolder.appendChild(mainSVG);

  // main outline of the svg and the pulses
  var mainOutline = "M50,99.5l-1.3-1.8C47.4,95.9,16,53.1,16,34.7C16,15.8,31.2,0.5,50,0.5c18.8,0,34,15.4,34,34.2c0,18.3-31.4,61.2-32.7,63L50,99.5z M50,3.7c-17,0-30.8,13.9-30.8,31C19.2,50,44,85.6,50,94c6-8.4,30.8-44,30.8-59.3,C80.8,17.6,67,3.7,50,3.7z";

  for (var q=1; q<=3; q++){
    var tempPulse = document.createElementNS("http://www.w3.org/2000/svg",'path');
    tempPulse.setAttribute("id", "pulse" + q);
    tempPulse.setAttribute("d", mainOutline);
    tempPulse.setAttribute("vector-effect", "non-scaling-stroke");
    tempPulse.setAttribute('style', 'stroke-width: 0px;' );
    mainSVG.appendChild(tempPulse);
  }
  var mainSVGOutline = document.createElementNS("http://www.w3.org/2000/svg",'path');
  mainSVGOutline.setAttribute("id", "mainSVGOutline");
  mainSVGOutline.setAttribute("d", mainOutline);
  mainSVG.appendChild(mainSVGOutline);

  // the white circle
  var SVGCircleBG = document.createElementNS("http://www.w3.org/2000/svg",'circle');
  SVGCircleBG.setAttribute('cx', 50);
  SVGCircleBG.setAttribute('cy', 35);
  SVGCircleBG.setAttribute('r', 20);
  SVGCircleBG.setAttribute('style', 'fill: none; stroke: #FFFFFF; stroke-width: 3px;' );
  mainSVG.appendChild(SVGCircleBG);

  // loader circle
  var SVGCircleLoader = document.createElementNS("http://www.w3.org/2000/svg",'circle');
  SVGCircleLoader.setAttribute('cx', 50);
  SVGCircleLoader.setAttribute('cy', 35);
  SVGCircleLoader.setAttribute('r', 20);
  SVGCircleLoader.setAttribute('id', "SVGCircleLoader");
  SVGCircleLoader.setAttribute('style', 'fill: none; stroke: #46E4C1; stroke-width: 3px;' );
  mainSVG.appendChild(SVGCircleLoader);

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
  TweenMax.set([pulse1, pulse2, pulse3], {transformOrigin:"50% 35%"});
  TweenMax.set([copy1, copy2], {alpha:0});

  loaderTimeline = new TimelineMax({paused:true});
  loaderTimeline.fromTo(SVGCircleLoader, 1, {drawSVG:"100%"}, {drawSVG:"0%", ease:Linear.easeNone});
}

// All eventlisteners
function setInteractions(){
  var myTag = document.getElementById('myTag');

  myTag.addEventListener('click', function(){
    showOverlay();
  });

  myTag.addEventListener('mouseover', function(){
    TweenMax.to([mainSVG, pulse1, pulse2, pulse3], 0.3, {fill:"#46E4C1"});
    TweenMax.to(textHolder, 0.4, {scale:1.05});
  });

  myTag.addEventListener('mouseout', function(){
    TweenMax.to([mainSVG, pulse1, pulse2, pulse3], 0.3, {fill:"#FFFFFF"});
    TweenMax.to(textHolder, 0.4, {scale:1});    
  });
}
