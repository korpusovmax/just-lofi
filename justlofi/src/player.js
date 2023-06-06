/////////////////////////
//TRACKLIST DATA
/////////////////////////
const tracklist_data = [
    {
        'playlist_name': 'Focus flow',
        'tracklist': [
            // {'name': 'Cavern', 'artist': 'Lil Joke', 'id': '1gRdpx42bXFOulki1Aniu6o4r7l_9TWcX'},
            // {'name': 'City Glow', 'artist': 'ELEWAKA', 'id': '1C6DKi-IL-WDYDW6KgOLLg30EcKHzjgKx'},
            // {'name': 'Come With A Sparkle', 'artist': 'Namaskar Blunt', 'id': '1ommAot3R3EnKUWRnhJUDaAL26AfucAUz'},
            // {'name': 'Lantana', 'artist': 'Rooey', 'id': '16FHa6blBFStZbmDnIXardRa1cQkpIas8'},
            // {'name': 'Lepricorn Ride', 'artist': 'Sebastian Flecci', 'id': '1EFWr6Zhywrl79si96J1Cs2w3TC1essCH'},
            // {'name': 'Neomatter', 'artist': 'O k O', 'id': '1R375eoEmYL_dCR56JGGIBhyWLIp7rHje'},
            {'name': 'Neon', 'artist': 'Dusty Decks', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Dusty_Decks_-_Neon_(BiffHard.click).mp3'},
            // {'name': 'Plant Based', 'artist': 'Lé Mon', 'id': '1jKtaFt2QSfY5lAOhntkBLqlSgkSt6DIr'},
            // {'name': 'Purple Dye', 'artist': 'Calle de phnk', 'id': '1OMQltoVBTNMrZzfloGCj1tMXV2DKAGLZ'},
            {'name': 'Sunset', 'artist': 'Clifford, and Louk', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/Clifford,%20Louk%20-%20Sunset.mp3'},
            // {'name': 'We Are Love', 'artist': 'Lucavietski', 'id': '1V4odBQmLYtwR76pgQBibcf_hpAbEep21'},
            // {'name': 'Backdrop', 'artist': 'Konteks', 'id': '1nL9bYu9HGjhPxduktjdct3gpDVAV4zVd'},
            // {'name': 'Down the Mews', 'artist': 'Louk, Clifford, faff', 'id': '1QJCNUI3CWp1JMOwbkdeP2o2xTUobELUe'},
            {'name': 'Oyoyoy', 'artist': 'Bito bitox', 'id': 'https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/bito_bitox_-_oyoyoy_(BiffHard.click).mp3'},
            // {'name': 'Love Me Right', 'artist': 'Loe Brezy', 'id': '1Dfx44PF7Xqhp9BxwbfnpCfmFLzu7xgvM'},
            // {'name': 'Flavor', 'artist': 'Summerfields', 'id': '1Y0BPh9OQdMFcJwOAiRurK8BYx6JDhBqS'},
            // {'name': '', 'artist': '', 'id': ''},
        ]
    },
    {
        'playlist_name': 'Instrumental',
        'tracklist': [
            {'name': 'Selflessly', 'artist': 'Toby Tranter', 'id': '1LIo8MPbPIcbWCv9P2LGH9HvqJg4Bj5zc'},
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

export { Playlist, AudioPLayer, tracklist_data }