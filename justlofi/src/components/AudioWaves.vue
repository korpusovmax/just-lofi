<template>
  <div class="waves" v-if="playing">
    <div v-if="playing" class="wave"></div>
    <div v-if="playing" class="wave"></div>
    <div v-if="playing" class="wave"></div>
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
.waves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);

  animation: start-scaling 2s ease-in-out, scaling 2s 2s infinite ease-in-out alternate;
}
.wave {
  width: 512px;
  height: 591px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);


  background-image: url("../assets/star.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  animation-duration: 12s;
  animation-name: rotating;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  //animation-direction: alternate;
}

.wave:first-child {
  animation-delay: 2.5s;
}
.wave:nth-child(3) {
  animation: rotating 10s 1.5s infinite, scaling-w 2s ease-in-out infinite alternate;
}


@keyframes rotating {
  from {
    transform: translateY(-50%) translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) translateX(-50%) rotate(360deg);
  }
}

@keyframes rotating-scaling {
  from {
    transform: translateY(-50%) translateX(-50%) rotate(0deg) scale(1);
  }
  to {
    transform: translateY(-50%) translateX(-50%) rotate(360deg) scale(1.3);
  }
}

@keyframes scaling-w {
  from {
    width: 0.65*512px;
    height: 0.65*591px;
  }
  to {
    width: 0.95*512px;
    height: 0.95*591px;
  }
}

@keyframes scaling {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.3);
  }
}

@keyframes start-scaling {
  from {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
}


</style>