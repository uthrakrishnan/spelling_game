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
    var $answerOptions = $('#answerOptions');

$(document).ready(function(){

    (function onStart(){
        $answerOptions.show();
        $('#correctAnswer').hide();   
    })();  

    // window.speechSynthesis.voice = 



    $nextWord.on('click', function(){
        
        (function reset(){
            optionsArray=[];
            $answerOptions.show();
            $('#correctAnswer').hide();
            $('#option1').removeClass('incorrect');
            $('#option2').removeClass('incorrect');
            $('#option3').removeClass('incorrect');
        })();

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
            optionsArray.push(missingLetter.toLowerCase());
            while (optionsArray.length<3){
                var letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                if(optionsArray.indexOf(letter) === -1){
                    optionsArray.push(letter);
                }
            } 
            optionsArray = _.shuffle(optionsArray);
            $('#option1').text(optionsArray[0]);
            $('#option2').text(optionsArray[1]);
            $('#option3').text(optionsArray[2]);
        })();
    });

    $answerOptions.on('click', '.answer', function checkAnswer(e){
        if($(this).hasClass('answer')){
            if (this.innerText === missingLetter.toLowerCase()){
                $('#gameWord h2').text(currentWord.word);
                $('audio')[0].play();
                $answerOptions.hide();
                $('#correctAnswer').show();
                console.log("Correct!");
            }
            else {
                this.classList.add('incorrect');
                $('audio')[1].play();
                console.log("Incorrect!");
            }
        }
    });

    $cntrl.on('click', function(){
        synth.speak(utterWord);
    });

});