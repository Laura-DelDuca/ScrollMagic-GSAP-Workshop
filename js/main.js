// On commence par créer un controlleur qui va héberger toutes les animations
var controller = new ScrollMagic.Controller();

// Maintenant que l'on a un controlleur, on peut lui ajouter des animations et, chaque fois que l'on
// veut ajouter une nouvelle animation, on doit créer une nouvelle “ScrollMagic.Scene”

// ------------------------------------------------- PARALLAX BACKGROUND
new ScrollMagic.Scene({
    // On détermine l'élément qui va déclencher l'animation
    triggerElement: "#parallax",
    // Par défaut, l'animation démarre quand l'élément déclencheur arrive au milieu de l'écran (“onCenter”), 
    // Dan ce cas-ci, on veut qu'elle commence quand l'élément entre sur la page: “onEnter”
    triggerHook: "onEnter",
})
// On détermine la durée de l'animation
.duration('400%')
// Avec .setTween, on ajoute l'animation GSAP à la scène
.setTween("#parallax", {
    backgroundPosition: "0% 100%",
    ease: Linear.easeNone
})
.addIndicators() 
// Quand notre scène est configurée, on l'ajoute au controlleur
.addTo(controller);


// L'animation suivante est le "slide and pin" pour les slides 1 et 2
// Les deux slides ont besoin de la même animation

// ------------------------------------------------- SLIDE 1
new ScrollMagic.Scene({
    triggerElement: "#slidein",
    // Les slides doivent être "épinglées" sur l'écran quand elles sont sur le bout de le quitter, d'où “onLeave”
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

// Sur la dernière slide, il y a trois animations et elles requièrent les timelines de GSAP 

// ------------------------------------------------- WORD FROM LEFT

var leftword = new TimelineMax();
// L'objet dans être en dehors de l'écran quand on arrive sur la slide
// On le moet donc en position initiale à -500
var fromLeftFrom = TweenMax.from("#left", 1, {x: -500});
var fromLeftTo = TweenMax.to("#left", 3, {x: 0});
leftword
    .add(fromLeftFrom)
    .add(fromLeftTo);

// Quand on a fini la timeline de GSAP, il faut créer une Scène dans laquelle l'animation que l'on vient de créer sera appelée

new ScrollMagic.Scene({
    triggerElement: "#slidein2",
    // Le point de départ est de 200 px au dessous du haut de la slide 2
    offset: 200,
})
// On ajoute notre timeline via .setTween()
.setTween(leftword)
// Et on détermine la durée de l'animation à un scroll de 400px
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
var fromBottomTo = TweenMax.to("#bottom", 3, {y: 0});
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

// ------------------------------------------------- SLIDE 3 - CARDS
new ScrollMagic.Scene({
    triggerElement: "#slidein3",
    triggerHook: "onLeave",
})
.setPin("#slidein3")
.addIndicators()
.addTo(controller);

// ------------------------------------------------- LEFT BOX
var leftbox = new TimelineMax();
var leftboxFrom = TweenMax.staggerFrom(".box", 1, {x:-300, opacity:0}, 0.5);
// var leftboxTo = TweenMax.staggerTo(".box", 1, {x: 0});
leftbox
    .add(leftboxFrom)
    // .add(leftboxTo)

new ScrollMagic.Scene({
    triggerElement: "#slidein3",
    offset: 250,
})
.setTween(leftbox)
.reverse(true)
.addIndicators()
.addTo(controller);

// ------------------------------------------------- SLIDE 4 - PHOTO and TEXTE
// Photo en zoom (.to scale???)
// Texte: plusieurs lignes en stagger
new ScrollMagic.Scene({
    triggerElement: "#slidein4",
    triggerHook: "onLeave",
})
.setPin("#slidein4")
.addIndicators()
.addTo(controller);

// ------------------------------------------------- SLIDE 4 - PHOTO
var zoommountain = new TimelineMax();
var mountainzoom = TweenMax.to("#mountain2", 1, {scale:2.5});
zoommountain
    .add(mountainzoom)

new ScrollMagic.Scene({
    triggerElement: "#slidein4",
})
.setTween(zoommountain)
.reverse(true)
.addIndicators()
.addTo(controller);
