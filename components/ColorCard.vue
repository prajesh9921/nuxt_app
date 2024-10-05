<template>
  <div
    @click="HandleChange"
    :class="selectedColor === color ? 'colorCardDiv' : 'colorCardDiv1'"
  >
    <div class="colordiv" :style="{ backgroundColor: color }"></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    selectedColor: {
      type: String,
      required: true,
    },
    selectColor: {
      type: Function,
      required: true,
    },
  },

  setup(props) {
    const HandleChange = () => {
      props.selectColor(props.color);
    };

    return {
      HandleChange,
    };
  },
};
</script>

<style scoped>
@import "~/assets/css/colorCard.css";

.colorCardDiv {
  padding: 5px;
  border: #000 1px solid;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.colorCardDiv1 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
