#Spelling Game App

This spelling game was built HTML5, CSS, Twitter Bootstrap, jQuery, AJAX, the Web Speech API, the Google Translate API, and the MediaWiki API. The game was designed for use on a dekstop. 

**Opening Screen**
![Opening Screen](https://github.com/uthrakrishnan/spelling_game/blob/master/images/Opening%20Screen.png)

**Sample Word**
![Sample Word](https://github.com/uthrakrishnan/spelling_game/blob/master/images/Missing_Letter.png)
The game is set to randomize the missing letter such that you may get the word "snake" again but this time with another letter missing. On the left hand side, you can hear the pronounciation of the word in English. For this, I used the WebSpeech API 

**Incorrect Response**
![Incorrect Response](https://github.com/uthrakrishnan/spelling_game/blob/master/images/Wrong_Letter.png)
If you select an incorrect response, a red X appears over the incorrect letter. However, you are still able to try again and choose from the remaining two letters.

**Correct Response**
![Correct Response](https://github.com/uthrakrishnan/spelling_game/blob/master/images/Correct_Letter.png)
When the correct letter is chosen, the word is shown completed. The app translates the word using the Google Translate API and displays audio recordings of the Spanish, French, and Mandarin translations which are spoken using the WebSpeech API formatted to speak with the proper accents. On the right hand side, the introductory portion of the Wikipedia page is displayed using the MediaWiki API. Clicking the Learn More button takes the user directly to the Wikipedia page.

**Wikipedia Page**
![Wikipedia](https://github.com/uthrakrishnan/spelling_game/blob/master/images/Wikipedia.png)

