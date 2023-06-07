/////////////////////////
//TRACKLIST DATA
/////////////////////////
const tracklist_data = [
    {
        'playlist_name': 'Focus flow',
        'tracklist': [
            {'name': 'Neon', 'artist': 'Dusty Decks', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Dusty_Decks_-_Neon_(BiffHard.click).mp3'},
            {'name': 'Sunset', 'artist': 'Clifford, and Louk', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Clifford,%20Louk%20-%20Sunset.mp3'},
            {'name': 'We Are Love', 'artist': 'Lucavietski', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Lucavietski%20-%20We%20Are%20Love_(Mp3Bullet.ru).mp3'},
            {'name': 'Backdrop', 'artist': 'Konteks', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Konteks%20-%20Backdrop_(Mp3Bullet.ru).mp3'},
            {'name': 'Down the Mews', 'artist': 'Louk, Clifford, faff', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Louk,%20Clifford,%20faff%20-%20Down%20the%20Mews.mp3'},
            {'name': 'Oyoyoy', 'artist': 'Bito bitox', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/bito_bitox_-_oyoyoy_(BiffHard.click).mp3'},
            {'name': 'Love Me Right', 'artist': 'Loe Brezy', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Loe%20Brezy%20-%20Love%20Me%20Right_(Mp3Bullet.ru).mp3'},
            {'name': 'Flavor', 'artist': 'Summerfields', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Summerfields%20-%20Flavor_(Mp3Bullet.ru).mp3'},
            // {'name': '', 'artist': '', 'id': ''},
        ]
    },
    {
        'playlist_name': 'Aesthetic',
        'tracklist': [
            {'name': 'Mrs Magic', 'artist': 'Strawberry Guy', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/aesthetic/spotifydown.com%20-%20Mrs%20Magic.mp3'},
            {'name': 'Flaming Hot Cheetos', 'artist': 'Clairo', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/aesthetic/spotifydown.com%20-%20Flaming%20Hot%20Cheetos.mp3'},
            {'name': 'like i need u', 'artist': 'keshi', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/aesthetic/SpotifyMate.com%20-%20like%20i%20need%20u%20-%20keshi.mp3'},
            // {'name': '', 'artist': '', 'id': ''},
            // {'name': '', 'artist': '', 'id': ''},
            // {'name': '', 'artist': '', 'id': ''},
        ]
    },
];

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

class AudioTrack {
    constructor(map) {
        this.is_playing = false;
        this.id = map['id'];
        this.name = map['name'];
        this.artist = map['artist'];
        this.audio = new Audio(get_source_link(this.id));

        // Создание AudioContext
        this.audioContext = new AudioContext();

        // Загрузка аудио файла
        let audioSource = this.audioContext.createBufferSource();
        audioSource.connect(this.audioContext.destination);
        fetch(get_source_link(this.id))
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => this.audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                audioSource.buffer = audioBuffer;
            });

        // Создание AnalyserNode
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        audioSource.connect(this.analyser);

        // Получение уровня громкости аудио данных
        let bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(this.dataArray);
        let volume = this.dataArray.reduce(function(a, b) { return a + b; }) / bufferLength;
    }

    get_volume() {
        let sampleRate = this.audioContext.sampleRate;
        console.log(sampleRate, this.artist)
        let sampleIndex = Math.floor(this.audio.currentTime);
        console.log(sampleIndex)
        this.analyser.getByteFrequencyData(this.dataArray);
        console.log(this.dataArray)
        return this.dataArray[sampleIndex];
    }

    play_or_stop() {
        if (this.is_playing) {
            this.audio.pause();
            this.is_playing = false;
        } else {
            this.audio.play();
            this.is_playing = true;
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
        // document.getElementById('name').innerHTML = this.current_track.name;
        // document.getElementById('artist').innerHTML = this.current_track.artist;
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
    return tracklist_data[randomInt(0, 1)]
}

export { Playlist, AudioPLayer, get_random_playlist }