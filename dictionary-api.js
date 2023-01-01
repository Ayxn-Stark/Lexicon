let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let sound = document.getElementById("sound");
let result = document.getElementById("result");
let Search_Button = document.getElementById("searchbtn");
let input_enter = document.getElementById("inputword")

input_enter.addEventListener("keypress", function (e) {
  if(e.key === "Enter"){
    FetchWm()
  }
});

Search_Button.addEventListener("click", FetchWm);

function Word_Sound() {
  sound.play();
}

function FetchWm(){
  let Input_Word = document.getElementById("inputword").value;
  fetch(`${url}${Input_Word}`)
    .then((response) => response.json())
    .then(function (data) {
      // console.log(data);
      result.innerHTML = `
      <div class="word">
          <h3>${Input_Word}</h3>
          <button onclick="Word_Sound()">
            <i class="fas fa-volume-up soundbtn"> </i>
          </button>
        </div>

        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>${data[0].phonetic}</p>
        </div>

        <p class="word-meaning">
        ${data[0].meanings[0].definitions[0].definition}
        </p>

        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>

        <div class="syn">
        <p class="syn_head">Synonym: </p> 
        <p class="synonym_antonyms">
          ${data[0].meanings[0].synonyms[0]}
        </p>
        </div>

        <div class="ant">
          <p class="syn_head">Antonyms: </p> 
          <p class="synonym_antonyms">
            ${data[0].meanings[0].antonyms[0]}
          </p>
        </div>`;

      sound.setAttribute("src", `${data[0].phonetics[1].audio}`); // data[0].phonetics[0].audio -> Link to audio inside object file
    })
    .catch(function () {
      result.innerHTML = `<h3 class='error'>Couldn't Find Word</h3>`;
    });
}