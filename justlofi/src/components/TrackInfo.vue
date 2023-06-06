<template>
  <div class="container">
    <div>
      <p class="container__track">{{track}}</p>
      <p class="container__artist">{{artist}}</p>
    </div>
    <img v-if="track" class="container__icon" src="@/assets/next_btn.png" alt="next"/>
  </div>
</template>

<script>
export default {
  props: {
    artist: {
      type: String,
    },
    track: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-height: 100px;
  display: flex;
  align-items: center;

  position: absolute;
  bottom: 56px;
  left: 52px;

  font-family: 'Inter', sans-serif;

  &__track {
    font-size: 52px;
    line-height: 63px;

    color: rgba(255, 255, 255, 0.9);

    @media (max-width: 580px) {
      & {
        font-size: 36px;
        line-height: 44px;
      }
    }
  }
  &__artist {
    margin-top: -4px;
    font-size: 42px;

    color: rgba(255, 255, 255, 0.7);

    @media (max-width: 580px) {
      & {
        font-size: 24px;
        line-height: 29px;
      }
    }
  }
  &__icon {
    width: 115.03px;
    height: 108.48px;

    @media (max-width: 580px) {
      & {
        width: 0.8*115.03px;
        height: 0.8*108.48px;
      }
    }
  }
}
</style>