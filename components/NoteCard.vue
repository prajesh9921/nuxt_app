<template>
  <div class="container">
    <p class="noteText">{{ data.value }}</p>
    <p class="dateTime">
      {{ formattedDate }} -
      {{ formattedTime }}
    </p>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      return moment(this.data.timeStamp).format('DD MMM YYYY');
    },
    formattedTime() {
      return moment(this.data.timeStamp).format('hh:mm a');
    }
  }
};
</script>

<style scoped>
@import "~/assets/css/noteCard.css";
</style>
