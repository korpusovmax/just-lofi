<template>
  <div class="container" id="main">
    <audio-waves :playing="is_playing" :scale1="volume1*0.3+1" :scale2="1+volume2*0.3"/>
    <play-button :playing="is_playing" @click="play_btn_clicked"/>
    <track-info :track="track" :artist="artist" @click="next_btn_clicked"/>
  </div>
</template>

<script>
import { Playlist, AudioPLayer, get_random_playlist } from '@/player';
import PlayButton from "@/components/PlayButton.vue";
import AudioWaves from "@/components/AudioWaves.vue";
import TrackInfo from "@/components/TrackInfo.vue";

let playlist = new Playlist(get_random_playlist());
let player;

export default {
  components: {TrackInfo, AudioWaves, PlayButton},
  data() {
    return {
      is_playing: false,
      track: '',
      artist: '',
      volume1: 0,
      volume2: 0
    }
  },
  methods: {
    play_btn_clicked() {
      player.play_or_stop();
      this.is_playing = !this.is_playing;

      this.track = player.current_track.name;
      this.artist = player.current_track.artist;

      this.$nextTick(() => {
        player.check();
        player.current_track.audio.addEventListener('timeupdate', (event) => {
          this.update_volume();
          //console.log(this.volume1, this.volume2)
        });
      })
    },
    next_btn_clicked() {
      if (player.is_playing()) {
        player.play_or_stop();
        this.is_playing = !this.is_playing;
      }
      player.load_next();
      this.play_btn_clicked();
    },
    update_volume() {
      player.current_track.get_volume(0.4).then(data => {
        this.volume1 = data;
      });
      player.current_track.get_volume(1).then(data => {
        this.volume2 = data;
      });
    },
  },
  mounted() {
    player = new AudioPLayer(playlist);
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
}

#main {
  background: #151515;
  overflow: hidden;
}
</style>