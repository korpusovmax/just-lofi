import {data} from "@/base.js";

/////////////////////////
//UTILS
/////////////////////////
function get_source_link(id) {
    // return 'https://drive.google.com/uc?export=download&id=' + id;
    return id
}

function randomInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/////////////////////////
//AUDIO CLASSes
/////////////////////////
class Playlist {
    constructor(map) {
        this.id = -1;
        this.name = map['playlist_name'];
        this.tracklist = map['tracklist'];
    }

    shuffle_playlist() {
        for (let i = this.tracklist.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            const temp = this.tracklist[i];
            this.tracklist[i] = this.tracklist[j];
            this.tracklist[j] = temp;
        }
    }

    get_next() {
        this.id += 1;
        if (this.id % this.tracklist.length === 0) {
            console.log('playlist: ' + this.name);
            this.shuffle_playlist();
            this.id = 0;
        }

        return new AudioTrack(this.tracklist[this.id]);
    }
}

async function analyzeAudio(audioFile) {
    const context = new AudioContext();
    const response = await fetch(audioFile);
    const audioData = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(audioData);
    const analyzer = context.createAnalyser();
    analyzer.fftSize = 2048;
    const bufferLength = analyzer.frequencyBinCount;
    const duration = audioBuffer.duration;
    const sampleRate = audioBuffer.sampleRate;
    const timeStep = 0.1; //
    const audioDataArray = new Float32Array(audioBuffer.length);
    audioBuffer.copyFromChannel(audioDataArray, 0);
    analyzer.getFloatTimeDomainData(audioDataArray);

    const levels = [];

    for (let i = 0; i < duration; i += timeStep) {
        const start = i * sampleRate;
        const end = (i + timeStep) * sampleRate;
        const slice = audioDataArray.slice(start, end);
        analyzer.getFloatTimeDomainData(slice);
        const sum = slice.reduce((acc, val) => acc + Math.abs(val), 0);
        const avg = sum / slice.length;
        levels.push(avg);
    }

    return levels;
}

class AudioTrack {
    constructor(map) {
        this.is_playing = false;
        this.id = map['id'];
        this.name = map['name'];
        this.artist = map['artist'];
        this.audio = new Audio(get_source_link(this.id));
    }

    get_volume(adjust) {
        //console.log(Math.round((this.audio.currentTime)*10))
        return this.levels.then(data => data[Math.round((this.audio.currentTime-adjust)*10)])
    }

    play_or_stop() {
        if (this.is_playing) {
            this.audio.pause();
            this.is_playing = false;
        } else {
            this.audio.currentTime = 0.001;
            this.audio.play();
            this.is_playing = true;

            this.levels = analyzeAudio(get_source_link(this.id));
            this.levels.then(data => console.log(data));
        }
    }
}

class AudioPLayer {
    constructor(playlist) {
        this.playlist = playlist;
        this.next_track = this.playlist.get_next();
        this.load_next();
    }

    load_next() {
        this.current_track = this.next_track;
        this.next_track = this.playlist.get_next();
        //autoplay after playlist has been shuffled
        if (this.current_track.id === 0) {
            // this.play_or_stop();
        }

        //create update and finish events
        this.current_track.audio.addEventListener('ended', (event) => {
            //music_ended_log();
            this.next_track.play_or_stop();
            this.load_next();
        });
        this.current_track.audio.addEventListener('timeupdate', (event) => {
            // var line = document.getElementById("line_progress");
            // line.setAttribute("stroke-dasharray",
            //     "calc(100vw*" + this.current_track.audio.currentTime/this.current_track.audio.duration + ") 100vw");
        });

        //name and artist output
        console.log(this.current_track.name + ' - ' + this.current_track.artist + ' has been loaded');
    }

    check(duration_start) {
        if (this.is_playing()) {
            const duration_end = this.current_track.audio.currentTime;
            //readyState 4 - audio has been loaded
            if (duration_start === duration_end && this.current_track.audio.readyState === 4) {
                console.log('error while playing audio, sorry');
                this.load_next();
                this.play_or_stop();
            }
        }
    }

    play_or_stop() {
        this.current_track.play_or_stop();
        if (this.is_playing()) {
            //setTimeout(this.check, 450, this.current_track.audio.currentTime);
        }
    }

    is_playing() {
        return this.current_track.is_playing;
    }
}

function get_random_playlist() {
    return data[randomInt(0, 1)]
}

export { Playlist, AudioPLayer, get_random_playlist }