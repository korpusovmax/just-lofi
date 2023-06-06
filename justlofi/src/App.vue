<template>
  <div class="container" id="main">
    <audio-waves :playing="is_playing"/>
    <play-button :playing="is_playing" @click="play_btn_clicked"/>
    <track-info :track="track" :artist="artist" @click="next_btn_clicked"/>
  </div>
</template>

<script>
import { Playlist, AudioPLayer, tracklist_data } from '@/player';
import PlayButton from "@/components/PlayButton.vue";
import AudioWaves from "@/components/AudioWaves.vue";
import TrackInfo from "@/components/TrackInfo.vue";

let playlist = new Playlist(tracklist_data[0]);
let player = new AudioPLayer(playlist);

export default {
  components: {TrackInfo, AudioWaves, PlayButton},
  data() {
    return {
      is_playing: false,
      track: '',
      artist: ''
    }
  },
  methods: {
    play_btn_clicked() {
      player.play_or_stop();
      this.is_playing = !this.is_playing;

      this.track = player.current_track.name;
      this.artist = player.current_track.artist;

      this.$nextTick(() => {
        player.check()
      })
    },
    next_btn_clicked() {
      if (player.is_playing()) {
        player.play_or_stop();
        this.is_playing = !this.is_playing;
      }
      player.load_next();
      this.play_btn_clicked();
    }
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
}
</style>