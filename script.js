const img = document.querySelector("img");
const artistName = document.getElementById("artist");
const title = document.getElementById("title");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeOnUi = document.getElementById("current-time");
const durationOnUi = document.getElementById("duration");

let songs = [
  {
    name: "Jacinto-1",
    artist: "Jacinto Design",
    displayName: "Electric Chill Machine",
  },
  {
    name: "Jacinto-2",
    artist: "Jacinto Design",
    displayName: "Seven Nation Army",
  },
  {
    name: "Jacinto-3",
    artist: "Arijit Singh",
    displayName: "Good-night, Disco Queen",
  },
  {
    name: "metric-1",
    artist: "Jacinto Design",
    displayName: "Spread your Wings",
  },
];

let songCount = 0;

// check if the music is playing
let isPlaying = false;

function loadSong(song) {
  artistName.textContent = song.artist;
  title.textContent = song.displayName;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
  //updateProgressBar();
}

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "pause");
  music.pause();
}



function prevSong(){
    if(songCount > 0){
        songCount--;
        loadSong(songs[songCount]);
        playSong();
    }
    else{
       prevBtn.disabled = true;
    }
}

function nextSong(){
    if(songCount < songs.length -1){
        songCount++;
        loadSong(songs[songCount]);
        playSong();
    }

}

function updateProgressBar(e) {
    console.log(e);
    if(isPlaying){
        const {currentTime , duration} = e.srcElement;
        currentTimeOnUi.textContent = currentTime;
        const durationInMinutes = Math.floor(duration/ 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        durationOnUi.textContent = `${durationInMinutes}:${durationSeconds}`
        const progressPercent = (currentTime/ duration) * 100;
        console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;
        
    }
}


// Event Listener
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

music.addEventListener('timeupdate', updateProgressBar);


