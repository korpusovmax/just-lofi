<template>
  <div class="icon" :class="{'icon--playing': playing}">

  </div>
</template>

<script>
export default {
  props: {
    playing: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  cursor: pointer;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 118.48px;
  height: 114.32px;

  background-image: url('https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/assets/play_btn.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  
  
  &--playing {
    width: 225px;
    height: 225px;

    background-image: url('https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/assets/pause_btn.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    animation: start-scaling 1s;
  }
}

@keyframes start-scaling {
  from {
    width: 0.7*225px;
    height: 0.7*225px;
  }
  to {
    width: 225px;
    height: 225px;
  }
}
</style>