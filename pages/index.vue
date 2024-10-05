<template>
  <div class="main">
    <NoteList
      :shouldBeVisible="shouldBeVisible"
      :setShouldBeVisible="setShouldBeVisible"
      :setModal="setModal"
      :modal="modal"
      :setNotesData="setNotesData"
    />
    <!-- NotesData Component -->
    <NotesData
      :shouldBeVisible="shouldBeVisible"
      :setShouldBeVisible="setShouldBeVisible"
      :notesData="notesData"
    />
    <!-- Modal Component -->
    <Modal :modal="modal" :setModal="setModal" />
  </div>
</template>

<script>
// Import necessary components
import { ref, onMounted } from "vue";
import NoteList from "~/components/NoteList.vue";
import NoteData from "~/components/NotesData.vue";
import Modal from "~/components/Modal.vue";

export default {
  components: {
    NoteList,
    NoteData,
    Modal,
  },
  setup() {
    const modal = ref(false);
    const notesData = ref([]);
    const shouldBeVisible = ref("left");

    onMounted(() => {});

    const setModal = (value) => {
      modal.value = value;
    };

    const setNotesData = (data) => {
      notesData.value = data;
    };

    const setShouldBeVisible = (position) => {
      shouldBeVisible.value = position;
    };

    return {
      modal,
      notesData,
      shouldBeVisible,
      setModal,
      setNotesData,
      setShouldBeVisible,
    };
  },
};
</script>

<style scoped>
@import "~/assets/css/home.css";
</style>
