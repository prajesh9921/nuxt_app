<template>
  <div :style="bgStyles" class="container" @click="handleClick">
    <div :style="{ backgroundColor: data.selectedColor }" class="initialDiv">
      <p class="initialsText">{{ data.initialLetters }}</p>
    </div>
    <p class="title">{{ data.grpName }}</p>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    id: {
      type: Number,
      required: false
    },
    activeNote: {
      type: Number,
      required: false
    },
    setActiveNote: {
      type: Function,
      required: false
    },
    data: {
      type: Object,
      required: false
    },
    setNotesData: {
      type: Function,
      required: false
    },
    setShouldBeVisible: {
      type: Function,
      required: false
    }
  },
  setup(props) {
    const screenWidth = ref(window?.innerWidth);

    // Handle click event for the card
    const handleClick = () => {
      props.setNotesData(props.data);
      props.setActiveNote(props.id);
      if (screenWidth <= 480) {
        props.setShouldBeVisible('right');
      }
    };

    // Dynamically set background style based on active note
    const bgStyles = computed(() => {
      return {
        backgroundColor: props.activeNote === props.id ? '#2F2F2F2B' : 'transparent'
      };
    });

    return {
      handleClick,
      bgStyles
    };
  }
};
</script>

<style scoped>
@import "~/assets/css/nameCard.css";
</style>
