$(document).ready(function(){

var $cntrl = $('#playAudio');




$cntrl.on('click', function(){
    SpeechSynthesisUtterance.text = "Hello World";
    SpeechSynthesisUtterance();
});



});