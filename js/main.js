// This will create a ScrollMagic controller that will house all of your animations.
var controller = new ScrollMagic.Controller();

// Now that we have a controller, we can start adding animations to it. 
// The first one we’ll do is the parallax animation.

// Whenever you want to add a new animation, you will need to create a new “Scene”.



// ------------------------------------------------- PARALLAX BACKGROUND
new ScrollMagic.Scene({
    // We want the animation to start when #parallax enters the screen
    triggerElement: "#parallax",
    // By default, the animation will start when the triggerElement hits the middle of the screen (“onCenter”), 
    // so we need to change it to “onEnter”
    triggerHook: "onEnter",
})
// How long will the animation last ?
.duration('400%')
// This is a shorthand to add a GSAP animation
// Here, it makes the background move
.setTween("#parallax", {
    backgroundPosition: "0% 100%",
    ease: Linear.easeNone
})
// For debugging purposes:
.addIndicators() 
// Once our scene is complete, we’ll add to the controller
.addTo(controller);



// The next animation is the slide and pin animations for the second and third slides.
// Both slides need the same animation:

// ------------------------------------------------- SLIDE 1
new ScrollMagic.Scene({
    triggerElement: "#slidein",
    // we want the slides to become pinned to the screen once they are about to leave the screen, 
    // hence the “onLeave”
    triggerHook: "onLeave",
})

.setPin("#slidein")
.addIndicators()
.addTo(controller);


// ------------------------------------------------- SLIDE 2
new ScrollMagic.Scene({
    triggerElement: "#slidein2",
    triggerHook: "onLeave",
})
.setPin("#slidein2")
.addIndicators()
.addTo(controller);

// On the last slide, I have 3 animations. Each one requires the use of GSAP timelines. 

// In the first animation, we create a GSAP timeline that will have two points. 
// It will start with our element #left placed 500 pixels to the left of the screen, 
// and it will end with it at its original position.

// ------------------------------------------------- WORD FROM LEFT

var leftword = new TimelineMax();
// The object must be outside the screen when wa scroll down, so we put it at -500
var fromLeftFrom = TweenMax.from("#left", 1, {x: -500});
var fromLeftTo = TweenMax.to("#left", 2, {x: 0});
leftword
    .add(fromLeftFrom)
    .add(fromLeftTo);

// Then we create our scene as before:

new ScrollMagic.Scene({
    triggerElement: "#slidein2",
    // The start point is 200 pixels below the top of the #slidein2
    offset: 200,
})
// We add the timeline via setTween(), and set the duration to a scroll of 400 pixels.
.setTween(leftword)
// And set the duration to a scroll of 400 pixels.
.duration(400)
.reverse(true)
.addIndicators()
.addTo(controller);


// ------------------------------------------------- CENTRAL WORD - OPACITY
var opacity = new TimelineMax();
var fadeInFrom = TweenMax.from("#opacity", 1, {opacity: 0});
var fadeInTo = TweenMax.to("#opacity", 1, {opacity: 1});
opacity
    .add(fadeInFrom)
    .add(fadeInTo);
 
new ScrollMagic.Scene({
        triggerElement: "#slidein2",
        offset: 200,
    })
    .setTween(opacity)
    .duration(400)
    .reverse(true)
    .addIndicators()
    .addTo(controller);
 

// ------------------------------------------------- WORD FROM THE BOTTOM
var rightword = new TimelineMax();
var fromBottomFrom = TweenMax.from("#bottom", 1, {y: 300});
var fromBottomTo = TweenMax.to("#bottom", 2, {y: 0});
rightword
    .add(fromBottomFrom)
    .add(fromBottomTo);
 
new ScrollMagic.Scene({
        triggerElement: "#slidein2",
        offset: 200,
    })
    .setTween(rightword)
    .duration(400)
    .reverse(true)
    .addIndicators()
    .addTo(controller);

