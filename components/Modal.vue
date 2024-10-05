<template>
  <div v-if="modal" class="modal">
    <div @click="toggleModal" class="overlay"></div>
    <div class="modalcontent">
      <h2>Create New group</h2>
      <div class="groupNameDiv">
        <p class="label">Group Name</p>
        <input
          type="text"
          placeholder="Enter group name"
          class="input"
          @input="handleGroupName"
        />
      </div>

      <div class="chooseColorDiv">
        <p class="label">Choose Color</p>
        <div class="colorCards">
          <ColorCard
            v-for="item in colors"
            :key="item.id"
            :color="item.color"
            :selectedColor="selectedColor"
            :selectColor="setSelectedColor"
          />
        </div>
      </div>

      <button class="closemodal" @click="handleCreateButton">Create</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    modal: {
      type: Boolean,
      required: true,
    },
    setModal: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const selectedColor = ref("");
    const groupName = ref("");

    const toggleModal = () => {
      props.setModal(false);
    };

    const handleGroupName = (event) => {
      groupName.value = event.target.value;
    };

    const colors = [
      { id: 1, color: "#B38BFA" },
      { id: 2, color: "#FF79F2" },
      { id: 3, color: "#43E6FC" },
      { id: 4, color: "#F19576" },
      { id: 5, color: "#0047FF" },
      { id: 6, color: "#6691FF" },
    ];

    const setSelectedColor = (color) => {
      selectedColor.value = color;
    };

    const getInitialLetters = () => {
      if (groupName.value) {
        const words = groupName.value.split(" ");
        let initialLetters;

        if (words.length === 1) {
          initialLetters = [
            words[0][0].toUpperCase(),
            words[0][words[0].length - 1].toUpperCase(),
          ];
        } else {
          initialLetters = words
            .slice(0, 2)
            .map((word) => word[0].toUpperCase());
        }
        return initialLetters.join("");
      }
    };

    const handleCreateButton = async () => {
      const initialLetters = getInitialLetters();

      const val = {
        initialLetters: initialLetters,
        grpName: groupName.value,
        selectedColor: selectedColor.value,
        notes: [],
      };

      if (selectedColor.value && groupName.value) {
        try {
          await $fetch("/api/addgroup", {
            method: "POST",
            body: val,
          });
          window.location.reload()
        } catch (error) {
          console.log("Error in adding group", error);
        }
        selectedColor.value = "";
        groupName.value = "";
        toggleModal();
      } else {
        toggleModal();
        alert("Please enter group name and select color");
      }
    };

    return {
      selectedColor,
      groupName,
      colors,
      toggleModal,
      handleGroupName,
      handleCreateButton,
      setSelectedColor,
    };
  },
};
</script>

<style scoped>
@import "~/assets/css/modal.css";
</style>
