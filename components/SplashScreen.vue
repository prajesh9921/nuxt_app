<template>
  <div class="coverContainer">
    <div class="coverImageDiv">
      <img :src="bgImage" alt="Background Cover" class="image" />
      <p class="title">Pocket Notes</p>
      <p class="subText">
        Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </p>
    </div>

    <p class="footerText">
      <Lock /> end-to-end encrypted
    </p>
  </div>
</template>

<script>
import BgImage from '~/assets/images/bg-image.png';
// import Lock from '@/assets/SVG/lock.vue';

export default {
  data() {
    return {
      bgImage: BgImage,
    };
  }
};
</script>

<style scoped>
  @import "~/assets/css/splashScreen.css";
</style>
