var loaderTL, introTL, tagHolder, sliderImagesHolder;

var tagStartTime = 1000;
var tagDuration = 5000;
var numberOfSliderImages = 6;

buildDOMItems();
idsToVars();
setStates();
setTimelines();
setInteractions();

setTimeout(showTag, tagStartTime);
setTimeout(hideTag, tagStartTime + tagDuration);

function showTag() {  
  loaderTL.play();
  introTL.play();
}

function hideTag() {
  introTL.reverse();
}

function showOverlay() {
  TweenMax.set(myOverlay, {autoAlpha:1});
}

function closeOverlay() {
  TweenMax.set(myOverlay, {autoAlpha:0});
}

function pulse(){
  TweenMax.staggerFromTo([pulse1, pulse2, pulse3], 1.4, {scale:1, alpha:0.6}, {scale:1.6, alpha:0, ease:Power2.easeInOut, repeat:-1, repeatDelay:0.6}, 0.3);
}

function buildDOMItems(){
  // TAG 
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
  var tagTextHolder = document.createElement("div");
  tagTextHolder.setAttribute("id", "tagTextHolder");
  tagTextHolder.innerHTML += "<span id='copy1' style='display: table; width: 100%; font-size: 1.2vw; font-style: italic'>click to learn about</span>";
  tagTextHolder.innerHTML += "<span id='copy2' style='display: table; width: 100%; font-size: 2vw; font-style: italic'>THE LONDON EYE</span>";
  tagHolder.appendChild(tagTextHolder);


  // Images in overlay slider
  sliderImagesHolder = document.getElementById("sliderImagesHolder");
  for (var z=1; z<=numberOfSliderImages; z++){

    var tempImageDiv = document.createElement("div");
    tempImageDiv.setAttribute("id", "sliderImage" + z);
    tempImageDiv.setAttribute("class", "sliderImage");

    var tempImage = new Image();
    tempImage.src = "img/LE" + z + ".jpg";
    tempImage.onload = function (){
      sliderImageLoaded();
    }

    tempImageDiv.appendChild(tempImage);
    sliderImagesHolder.appendChild(tempImageDiv);
  }


  // Overlay text
  // var overlayTextHolder = document.createElement("div");
  // overlayTextHolder.setAttribute("id", "overlayTextHolder");
  overlayTextHolder.innerHTML += "<span id='copy2' style='display: inline-block; width: 90%; font-size: 60px; font-style: italic'>THE LONDON EYE</span>";
  overlayTextHolder.innerHTML += "<span id='copy1' style='display: inline-block; width: 90%; font-size: 40px; font-style: italic'>The London Eye, known for sponsorship reasons as the Coca-Cola London Eye, is a giant Ferris wheel on the South Bank of the River Thames in London. The structure is 443 feet tall and the wheel has a diameter of 394 feet.</span>";
  // tagHolder.appendChild(overlayTextHolder);


}

// This counts how many images ahve been loaded and once it gets to the total amount
// it then creates the image strip.
var sliderImagesTotalLoaded = 0;
function sliderImageLoaded(){
    sliderImagesTotalLoaded++;
    if (sliderImagesTotalLoaded == numberOfSliderImages){
      for (var r=1; r<=numberOfSliderImages; r++){
        var tempImage = window["sliderImage" + r];
        if (r != 1){
          var tempPreImage = window["sliderImage" + (r-1)];
          TweenMax.set(tempImage, {x:tempPreImage._gsTransform.x + tempPreImage.offsetWidth});
        } else {
          TweenMax.set(tempImage, {x:(sliderImagesHolder.offsetWidth/2) - (window["sliderImage" + 2].offsetWidth/2) - tempImage.offsetWidth});
        }
      }
    }
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
  TweenMax.set(tagTextHolder, {transformOrigin:"50% 0%"});
  TweenMax.set([pulse1, pulse2, pulse3], {transformOrigin:"50% 35%"});
  TweenMax.set([copy1, copy2], {alpha:0});
  TweenMax.set(SVGCircleLoader, {transformOrigin:"50% 50%", rotation:-90});
  TweenMax.set([lArrowImage, rArrowImage], {alpha:0.5});
}

// Timelines
function setTimelines(){
  loaderTL = new TimelineMax({paused:true});
  loaderTL.fromTo(SVGCircleLoader, (tagDuration / 1000), {drawSVG:"100%"}, {drawSVG:"0%", ease:Linear.easeNone});

  introTL = new TimelineMax({paused:true});
  introTL.add("frame1")
    .set(myTag, {autoAlpha:1}, "frame1")
    .to(SVGHolder, 0.4, {scale:1, ease:Back.easeOut, onComplete:pulse}, "frame1")
    .to(copy1, 0.6, {alpha:1, ease:Linear.easeNone}, "frame1+=0.6")
    .to(copy2, 0.6, {alpha:1, ease:Linear.easeNone}, "frame1+=0.7")
}

var currentSliderImage = 2;
function moveImageSlider(whichDirection){
  
  currentSliderImage = checkNum((currentSliderImage += (whichDirection == "left" ? 1 : -1)), numberOfSliderImages);




  if (whichDirection == "left"){
      var moveSlide = window["sliderImage" + checkNum((currentSliderImage +  2), numberOfSliderImages)];
      var tempFollowSlide = window["sliderImage" + (checkNum((currentSliderImage + 1), numberOfSliderImages))];
      var tempFollowStart = tempFollowSlide._gsTransform.x + tempFollowSlide.offsetWidth;
      TweenMax.set(moveSlide, {x:tempFollowStart});
  } else {
      var moveSlide = window["sliderImage" + checkNum((currentSliderImage +  -2), numberOfSliderImages)];
      var tempFollowSlide = window["sliderImage" + (checkNum((currentSliderImage - 1), numberOfSliderImages))];
      var tempFollowStart = tempFollowSlide._gsTransform.x - moveSlide.offsetWidth;
      TweenMax.set(moveSlide, {x:tempFollowStart});
  }





  var tempImage = window["sliderImage" + currentSliderImage];  


  var targetDestination = (sliderImagesHolder.offsetWidth/2) - (tempImage.offsetWidth/2);


  var tempDistance = tempImage._gsTransform.x - targetDestination;  


  // for (var w=1; w<=numberOfSliderImages; w++){
  //   var followSlide, followStart;
  //   var tempImageSlide = window["sliderImage" + w];

  //   if (whichDirection == "left"){
  //     followSlide = window["sliderImage" + (checkNum((w - 1), numberOfSliderImages))];
  //     followStart = followSlide._gsTransform.x + followSlide.offsetWidth;
  //   } else {
  //     followSlide = window["sliderImage" + (checkNum((w + 1), numberOfSliderImages))];
  //     followStart = followSlide._gsTransform.x - tempImageSlide.offsetWidth;
  //   }
    
  //   var tempDestination = (whichDirection == "left" ? "-=" : "+=") + tempDistance;

  //   TweenMax.fromTo(tempImageSlide, 0.6, {x:followStart}, {x:tempDestination});
  // }
  
}

function checkNum(whatNumber, numberCheck){
    whatNumber = whatNumber < 1 ? (numberCheck - Math.abs(whatNumber)) : whatNumber;
    whatNumber = whatNumber > numberCheck ? (whatNumber - numberCheck)  : whatNumber;
    return whatNumber;
}

// All eventlisteners
function setInteractions(){
  // Tag
  tagHolder.addEventListener('click', function(){
    showOverlay();
  });

  tagHolder.addEventListener('mouseover', function(){
    TweenMax.to([mainSVG, pulse1, pulse2, pulse3], 0.3, {fill:"#46E4C1"});
    TweenMax.to(tagTextHolder, 0.3, {scale:1.04, ease:Linear.easeNone});
  });

  tagHolder.addEventListener('mouseout', function(){
    TweenMax.to([mainSVG, pulse1, pulse2, pulse3], 0.3, {fill:"#FFFFFF"});
    TweenMax.to(tagTextHolder, 0.3, {scale:1, ease:Linear.easeNone});    
  });


  // Image slider
  lArrow.addEventListener('click', function(){
    moveImageSlider("right");
  });

  rArrow.addEventListener('click', function(){
    moveImageSlider("left");
  });


  var tempArrows = document.getElementsByClassName("arrowHolder");
  for (i = 0; i < tempArrows.length; i++) {
    arrowTravelDistance = 10;
    tempArrows[i].addEventListener('mouseover', function(e){
      var arrowDirection = e.currentTarget.id == "lArrow" ? "-" : "+";
      TweenMax.to(e.currentTarget.firstElementChild, 0.3, {alpha:1, x:arrowDirection + "=" + arrowTravelDistance});
    });

    tempArrows[i].addEventListener('mouseout', function(e){
      var arrowDirection = e.currentTarget.id == "lArrow" ? "+" : "-";
      TweenMax.to(e.currentTarget.firstElementChild, 0.3, {alpha:0.5, x:arrowDirection + "=" + arrowTravelDistance});      
    });
  }


}
