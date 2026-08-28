console.log("Lets go js")
let currentSong=new Audio()

async function getSongs() {
    let a = (await fetch("http://127.0.0.1:3000/Songs/"))
    console.log(a)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    console.log(as)
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/%5CSongs%5C")[1])
        }
    }
    console.log(songs)
    return songs
   
}
const playMusic=(track)=>{
    currentSong.src="/songs/"+track+".mp3"
    play.src="Resource/pause.svg"
    currentSong.play()
}


async function main()
{
   
    let songs=await getSongs()
    let song_ul=document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        song_ul.innerHTML=song_ul.innerHTML+`<li>
                            <img src="Resource/music.svg" alt="" class="invert">
                            <div class="info">
                                <div>${song.split(".mp3")[0]}</div>
                                <div>Manesh</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                 <img src="Resource/play.svg" alt="" class="invert">
                            </div>
                           
                        </li>`
    }
    console.log("Play music")
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
         e.addEventListener("click",element=>{
         console.log(e.querySelector(".info").firstElementChild.innerHTML)
         playMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    })
    play.addEventListener("click",()=>{
        if(currentSong.paused)
        {
            currentSong.play()
            play.src="Resource/pause.svg"
        }
        else{
            currentSong.pause()
            play.src="Resource/play.svg"
        }
    })
 
}
main()