console.log("Lets go js")
let currentSong = new Audio()
function secondsToMinutesSeconds(seconds)
{
    if(isNaN(seconds)|| seconds<0)
    {
        return "Invalid input";
    }
    const minutes=Math.floor(seconds/60)
    const sec=Math.floor(seconds%60)
    const format_min=String(minutes).padStart(2,'0')
    const format_sec=String(sec).padStart(2,'0')
    return `${format_min}:${format_sec}`
}
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
const playMusic = (track) => {
    currentSong.src = "/songs/" + track + ".mp3"
    play.src = "Resource/pause.svg"
    currentSong.play()
    document.querySelector(".songinfo").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00/00:00"

}


async function main() {

    let songs = await getSongs()

    let song_ul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        song_ul.innerHTML = song_ul.innerHTML + `<li>
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
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    })
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "Resource/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "Resource/play.svg"
        }
    })
    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%"
    })
    document.querySelector(".seekbar").addEventListener("click",(e)=>
    {
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
         document.querySelector(".circle").style.left=percent+"%";
        currentSong.currentTime=((currentSong.duration * percent)/100);

    })
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0%";
    
    })
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%";
    })

}
main()