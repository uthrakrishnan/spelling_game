    var synth = window.speechSynthesis;
    var $cntrl = $('#playAudio');
    var $currentImg = $('#currentImg');
    var currentWord;
    var missingLetter;
    var displayWord;
    var utterWord;
    var $nextWord = $('#nextWord'); 
    var currWordPool = wordpool.animals;
    var optionsArray=[];

$(document).ready(function(){

    // window.speechSynthesis.voice = 



    $nextWord.on('click', function(){
        // Select current Word
        currentWord = currWordPool[Math.floor(Math.random() * currWordPool.length)];
        // console.log(currentWord);
        // Set image from current word
        $currentImg.attr('src', currentWord.image);
        //sets word to be spoken
        utterWord = new SpeechSynthesisUtterance(currentWord.word);

        // displays word with missing letter and call function
        (function wordToDisplay(){
            // randomly choose missing letter
            missingLetter = _.sample(`${currentWord.word}`);
            //Split string at missing letter and join with underscore
            var displayWord = currentWord.word.split(missingLetter).join("__");
            //append word with missing letter to div
            $('#gameWord h2').text(displayWord);
        })();
        (function optionsToDisplay(){
            optionsArray.push(missingLetter);
            while (optionsArray.length<3){
                var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                if(optionsArray.indexOf(letter) === -1){
                    optionsArray.push(letter);
                }
            } 
            optionsArray = _.shuffle(optionsArray);
            $('#options1').append(`<h3>${optionsArray[0]}</h3>`);
            $('#options2').append(`<h3>${optionsArray[1]}</h3>`);
            $('#options3').append(`<h3>${optionsArray[2]}</h3>`);
        })();
    });

    $cntrl.on('click', function(){
        synth.speak(utterWord);
    });

});