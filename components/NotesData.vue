<template>
  <div class="rightMain" :style="displayStyle">
    <!-- Check if there are no notes -->
    <template v-if="!notesData || notesData.length === 0">
      <SpalshScreen />
    </template>

    <template v-else>
      <!-- Header Section -->
      <div class="header">
        <div class="backBtn" @click="goBack">
          <BackArrow />
        </div>
        <div :style="{ backgroundColor: notesData.color }" class="initialDiv">
          <p class="initialsText">{{ notesData.initialLetters }}</p>
        </div>
        <p class="title">{{ notesData.title }}</p>
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
// import SendArrow from '@/assets/SVG/sendArrow.vue';
import NoteCard from '@/components/NoteCard.vue';
import SpalshScreen from '@/components/SplashScreen.vue';
// import BackArrow from '@/assets/SVG/backArrow.vue';

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
    // const screenWidth = window.innerWidth;

    // Handle input change
    const handleInput = (event) => {
      userInput.value = event.target.value;
    };

    // Get current date and time
    const getCurrentDateAndTime = () => {
      const currentDate = new Date();
      return currentDate.toISOString();
    };

    // Handle sending the note
    const handleSendArrowButton = () => {
      const res = localStorage.getItem('PocketNotes');
      const allData = JSON.parse(res);
      const timeStamp = getCurrentDateAndTime();
      const val = { value: userInput.value, timeStamp: timeStamp };

      notesList.value.push(val);

      allData.data.forEach((item) => {
        if (item.id === props.notesData.id) {
          item.notes = [...notesList.value, val];
        }
      });

      localStorage.setItem('PocketNotes', JSON.stringify(allData));
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
    // const displayStyle = computed(() => {
    //   return screenWidth <= 480 && props.shouldBeVisible === 'left'
    //     ? { display: 'none' }
    //     : null;
    // });

    return {
      notesList,
      userInput,
      handleInput,
      handleSendArrowButton,
      goBack,
      // displayStyle
    };
  }
};
</script>

<style scoped>
@import "~/assets/css/noteData.css";
</style>
