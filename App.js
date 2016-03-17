

$(document).ready(function(){
    var synth = window.speechSynthesis;
    var $cntrl = $('#playAudio');
    var $spanishcntrl = $('#playSpanishAudio');
    var $chinesecntrl = $('#playChineseAudio');
    var $frenchcntrl = $('#playFrenchAudio');
    var $currentImg = $('#currentImg');
    var currentWord;
    var missingLetter;
    var displayWord;
    var utterWord;
    var utterSpanishWord;
    var $nextWord = $('#nextWord'); 
    var currWordPool = wordpool.animals;
    var optionsArray=[];
    var $answerOptions = $('#answerOptions');

    (function onStart(){
        $answerOptions.show();   
        $('#wikipedia').hide(); 
        $('#translations').hide();
        $('#directions').show();  
    })();  

    // window.speechSynthesis.voice = 



    $nextWord.on('click', function(){
        
        (function reset(){
            optionsArray=[];
            $answerOptions.show();
            $('#translations').hide();
            $('#wikipedia').hide();
            $('#option1').removeClass('incorrect');
            $('#option2').removeClass('incorrect');
            $('#option3').removeClass('incorrect');
            $('#wikipediaArticle').empty();
            $('#directions').hide();
        })();

        // Select current Word
        currentWord = currWordPool[Math.floor(Math.random() * currWordPool.length)];
        // console.log(currentWord);
        // Set image from current word
        $currentImg.attr('src', currentWord.image);
        //sets word to be spoken
        utterWord = new SpeechSynthesisUtterance(currentWord.word);
        utterWord.lang = "en-GB";
        utterWord.name= "Google UK English Female";
        utterWord.voiceURI = "Google UK English Female";


        // Get Wikipedia information
        (function setWikipedia(){ 
            if(currentWord.word === "turkey"|| currentWord.word === "seal" || currentWord.word === "wolf"){
                $.ajax({
                    url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&meta=&indexpageids=1&titles=${currentWord.search}&exsentences=15&exintro=1`,
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function( response ) {
                        var pageId = response.query.pageids[0]; 
                        var wordInfo = response.query.pages[pageId].extract;
                        console.log(wordInfo);
                        $('#wikipediaArticle').append(wordInfo);
                    }
                });
            }
            else{
                $.ajax({
                    url: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=&meta=&indexpageids=1&titles=${currentWord.word}&exsentences=15&exintro=1`,
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function( response ) {
                        var pageId = response.query.pageids[0]; 
                        var wordInfo = response.query.pages[pageId].extract;
                        console.log(wordInfo);
                        $('#wikipediaArticle').append(wordInfo);
                    }
                });
            }
            $.ajax({
                url: `https://en.wikipedia.org/w/api.php?action=query&format=json&indexpageids=1&prop=info&inprop=url&titles=${currentWord.word}`,
                jsonp: "callback",
                dataType: "jsonp",
                success: function( response ) {
                    var pageId = response.query.pageids[0];
                    var wordURL = response.query.pages[pageId].canonicalurl;
                    console.log(wordURL);
                    $('#wikipediaLink').attr('href', wordURL);
                }
            });
        })();

        //Translate to spanish
        (function translateSpanish(){
            $.ajax({
                url: `https://www.googleapis.com/language/translate/v2?key=AIzaSyD4G1Wqh3g-a3tnHO4340FPDqiOxqz5x-Y&q=${currentWord.word}&source=en&target=es`,
                dataType: "json",
                success: function (response){
                    var spanishWord = response.data.translations[0].translatedText;
                    $('#spanish').text(spanishWord);
                    utterSpanishWord = new SpeechSynthesisUtterance(spanishWord);
                    utterSpanishWord.lang = "es-US";
                    utterSpanishWord.name= "Google español de Estados Unidos";
                    utterSpanishWord.voiceURI = "Google español de Estados Unidos";
                }
            });
        })();

        //Translate to French
        (function translateTamil(){
            $.ajax({
                url: `https://www.googleapis.com/language/translate/v2?key=AIzaSyD4G1Wqh3g-a3tnHO4340FPDqiOxqz5x-Y&q=${currentWord.word}&source=en&target=fr`,
                dataType: "json",
                success: function (response){
                    var frenchWord = response.data.translations[0].translatedText;
                    $('#french').text(frenchWord);
                    utterFrenchWord = new SpeechSynthesisUtterance(frenchWord);
                    utterFrenchWord.lang = "fr-FR";
                    utterFrenchWord.name= "Google français";
                    utterFrenchWord.voiceURI = "Google français";
                }
            });
        })();

        //Translate to Mandarin
        (function translateMandarin(){
            $.ajax({
                url: `https://www.googleapis.com/language/translate/v2?key=AIzaSyD4G1Wqh3g-a3tnHO4340FPDqiOxqz5x-Y&q=${currentWord.word}&source=en&target=zh-CN`,
                dataType: "json",
                success: function (response){
                    var chineseWord = response.data.translations[0].translatedText;
                    $('#chinese').text(chineseWord);
                    utterChineseWord = new SpeechSynthesisUtterance(chineseWord);
                    utterChineseWord.lang = "zh-CN";
                    utterChineseWord.name= "Google 普通话（中国大陆）";
                    utterChineseWord.voiceURI = "Google 普通话（中国大陆）";
                }
            });
        })();



        // displays word with missing letter and call function
        (function wordToDisplay(){
            // randomly choose missing letter
            // missingLetter = _.sample(`${currentWord.word}`);
            //Split string at missing letter and join with underscore
            // displayWord = currentWord.word.split(missingLetter).join("__");
            //append word with missing letter to div
            var wordIndex = Math.floor(Math.random()* currentWord.word.length);
            var wordCopy = currentWord.word.slice();
            displayWord = wordCopy.slice(0,wordIndex) + "_" + wordCopy.slice(wordIndex+1);
            missingLetter = currentWord.word[wordIndex];
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
        (function populateWikipedia(){

        })();
    });

    $answerOptions.on('click', '.answer', function checkAnswer(e){
        if($(this).hasClass('answer')){
            if (this.innerText === missingLetter.toLowerCase()){
                $('#gameWord h2').text(currentWord.word);
                $('audio')[0].play();
                $answerOptions.hide();
                $('#translations').show();
                $('#wikipedia').show();
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

    $spanishcntrl.on('click', function(){
        synth.speak(utterSpanishWord);
    });

    $frenchcntrl.on('click', function(){
        synth.speak(utterFrenchWord);
    });

    $chinesecntrl.on('click', function(){
        synth.speak(utterChineseWord);
    });
});