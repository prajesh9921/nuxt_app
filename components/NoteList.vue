<template>
  <div class="leftMain" :style="displayStyle">
    <div class="titleHolder">
      <p class="pocketNote">Pocket Notes</p>
    </div>

    <div class="renderListDiv">
      <NameCard
        v-for="(item, index) in listData"
        :key="item._id"
        :data="item"
        :id="index"
        :activeNote="activeNote"
        :setActiveNote="setActiveNote"
        :setNotesData="setNotesData"
        :setShouldBeVisible="setShouldBeVisible"
      />
    </div>

    <div class="fab" @click="showModel">
      <p class="fabText">+</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import NameCard from "~/components/NameCard.vue";

export default {
  components: {
    NameCard,
  },
  props: {
    setModal: Function,
    setNotesData: Function,
    modal: Boolean,
    shouldBeVisible: String,
    setShouldBeVisible: Function,
  },
  setup(props) {
    const activeNote = ref();
    const listData = ref([]);
    const screenWidth = ref(window?.innerWidth);

    const showModel = () => {
      props.setModal(true);
    };

    const fetchData = async () => {
      try {
        const response = await $fetch('/api/groups');
        console.log(response.data);
        listData.value = response?.data;
        console.log('List Data:', listData.value); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    const displayStyle = computed(() => {
      return screenWidth.value <= 480
        ? { display: props.shouldBeVisible === "right" ? "none" : "flex" }
        : null;
    });

    const setActiveNote = (note) => {
      activeNote.value = note;
    };

    return {
      activeNote,
      listData,
      displayStyle,
      showModel,
      setActiveNote,
    };
  },
};
</script>

<style scoped>
    @import "~/assets/css/noteList.css"; /* Import your styles */
</style>
