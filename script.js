const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';


function toggleButton(){
    button.disabled = !button.disabled;
}


async function jokeOut(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        const joke1 = data.setup;
        const joke2 = data.delivery;
        return {
            "setup": joke1,
            "punch": joke2
        };
    }catch(error){
        console.log('joke not found',error);
    }
}



const button = document.getElementById('button');
var synth = window.speechSynthesis;
button.addEventListener('click',()=>{
    toggleButton();
    jokeOut(jokeApiUrl).then(x => { 
        const joke1 = x.setup;
        const joke2 = x.punch;
        var utterThis1 = new SpeechSynthesisUtterance(`${joke1}.......${joke2}`);
        utterThis1.addEventListener('end', function(event) {
            toggleButton();
          });
        synth.speak(utterThis1);
    });
});




