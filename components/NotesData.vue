<template>
  <div class="rightMain" :style="displayStyle">

    <template v-if="!notesData || notesData?.length === 0">
      <SplashScreen  />
    </template>

    <template v-else>
      <!-- Header Section -->
      <div class="header">
        <div class="backBtn" @click="goBack">
          <Icon name="mdi:arrow-left" size="30" style="color: white"/>
        </div>
        <div :style="{ backgroundColor: notesData.selectedColor }" class="initialDiv">
          <p class="initialsText">{{ notesData.initialLetters }}</p>
        </div>
        <p class="title">{{ notesData.grpName }}</p>
      </div>

      <!-- Notes Section -->
      <div class="notesDiv">
        <NoteCard
          v-for="(item, index) in notesList"
          :key="index"
          :data="item"
        />
      </div>

      <!-- Input Box -->
      <div class="inputMain">
        <div style="position: relative">
          <textarea
            name="notes"
            rows="8"
            placeholder="Enter your text here........."
            class="textarea"
            :input="handleInput"
            v-model="userInput"
          ></textarea>
          <Icon class="sendarrow" name="mdi:send-variant" v-if="userInput" size="50" style="color: grey" @click="handleSendArrowButton"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import NoteCard from '@/components/NoteCard.vue';
import SpalshScreen from '@/components/SplashScreen.vue';

export default {
  props: {
    notesData: {
      type: Array,
      required: true
    },
    shouldBeVisible: {
      type: String,
      required: true
    },
    setShouldBeVisible: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const notesList = ref(props.notesData.notes);
    const userInput = ref('');
    const screenWidth = ref(window?.innerWidth);

    // Handle input change
    const handleInput = (event) => {
      userInput.value = event.target.value;
    };

    // Handle sending the note
    const handleSendArrowButton = async () => {
      const val = { value: userInput.value };

      notesList.value.push(val);
      await $fetch("/api/addnote", {
        method: "POST",
        body: {id: props.notesData._id, note: val}
      })
      userInput.value = '';
    };

    // Go back to the previous view
    const goBack = () => {
      props.setShouldBeVisible('left');
    };

    // Watch for changes in notesData prop
    watch(() => props.notesData, (newVal) => {
      notesList.value = newVal.notes;
    });

    // Dynamic style for display based on screen size
    const displayStyle = computed(() => {
      return screenWidth <= 480 && props.shouldBeVisible === 'left'
        ? { display: 'none' }
        : null;
    });

    return {
      notesList,
      userInput,
      handleInput,
      handleSendArrowButton,
      goBack,
      displayStyle
    };
  }
};
</script>

<style scoped>
  @import "~/assets/css/noteData.css";
</style>
