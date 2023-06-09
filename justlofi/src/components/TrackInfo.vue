<template>
  <div class="container">
    <div>
      <p class="container__track">{{track}}</p>
      <p class="container__artist">{{artist}}</p>
    </div>
    <img v-if="track" class="container__icon" src="https://kxmwptxemvajkckbummx.supabase.co/storage/v1/object/public/music/assets/next_btn.png" alt="next"/>
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
  justify-content: space-between;
  //flex-wrap: wrap;
  align-items: center;

  @media (max-width: 580px) {
    & {
      justify-content: start;
      flex-direction: row-reverse;
    }
  }

  position: fixed;
  bottom: 36px;
  left: 36px;
  padding-right: 36+8px;
  margin-bottom: 8px;

  font-family: 'Inter', sans-serif;

  &__track {
    font-size: 48px;
    white-space: nowrap;

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
    font-size: 36px;
    line-break: strict;

    color: rgba(255, 255, 255, 0.7);

    @media (max-width: 580px) {
      & {
        font-size: 24px;
        line-height: 29px;
      }
    }
  }
  &__icon {
    cursor: pointer;

    width: 115.03px;
    height: 108.48px;

    @media (max-width: 580px) {
      & {
        width: 0.7*115.03px;
        height: 0.7*108.48px;
      }
    }
  }
}
</style>