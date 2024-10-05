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
          :class="input"
          @input="handleGroupName"
        />
      </div>

      <div class="chooseColorDiv">
        <p class="label">Choose Color</p>
        <div class="colorCards">
          <ColorCard
            v-for="item in colors"
            :key="item.id"
            :color="item"
            :selectedColor="selectedColor"
            @selectColor="setSelectedColor"
          />
        </div>
      </div>

      <button class="closemodal" @click="handleCreateButton">
        Create
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
// import Color1 from '@/assets/SVG/svgs/Color1.vue';
// import Color2 from '@/assets/SVG/svgs/Color2.vue';
// import Color3 from '@/assets/SVG/svgs/Color3.vue';
// import Color4 from '@/assets/SVG/svgs/Color4.vue';
// import Color5 from '@/assets/SVG/svgs/Color5.vue';
// import Color6 from '@/assets/SVG/svgs/Color6.vue';

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
      props.setModal(!props.modal);
    };

    const handleGroupName = (event) => {
      groupName.value = event.target.value;
    };

    // const colors = [
    //   { id: 1, card: <></>, color: "#B38BFA" },
    //   { id: 2, card: <></>, color: "#FF79F2" },
    //   { id: 3, card: <></>, color: "#43E6FC" },
    //   { id: 4, card: <></>, color: "#F19576" },
    //   { id: 5, card: <></>, color: "#0047FF" },
    //   { id: 6, card: <></>, color: "#6691FF" },
    // ];

    const generateRandom4DigitID = () => {
      return Math.floor(Math.random() * 9000) + 1000;
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
          initialLetters = words.slice(0, 2).map((word) => word[0].toUpperCase());
        }
        return initialLetters.join("");
      }
    };

    const handleCreateButton = () => {
      const randomID = generateRandom4DigitID();
      const initialLetters = getInitialLetters();
      const res = localStorage.getItem("PocketNotes");
      const data = JSON.parse(res);
      const groupId = initialLetters + randomID;

      const val = {
        id: groupId,
        initialLetters: initialLetters,
        title: groupName.value,
        color: selectedColor.value,
        notes: [],
      };

      if (selectedColor.value && groupName.value) {
        const tempArray = [...data.data, val];
        localStorage.setItem('PocketNotes', JSON.stringify({ data: tempArray }));
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
    //   colors,
      toggleModal,
      handleGroupName,
      handleCreateButton,
    };
  },
};

const ColorCard = {
  props: {
    color: {
      type: Object,
      required: true,
    },
    selectedColor: {
      type: String,
      required: true,
    },
  },
  template: `
    <div @click="selectColor" :class="selectedColor === color.color ? styles.colorCardDiv : styles.colorCardDiv1">
      <component :is="color.card" />
    </div>
  `,
  methods: {
    selectColor() {
      this.$emit('selectColor', this.color.color);
    },
  },
};
</script>

<style scoped>
    @import "~/assets/css/modal.css";
</style>