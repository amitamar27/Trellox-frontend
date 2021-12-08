<template>
  <section class="dates-menu">
    <header>
      <header class="main-title">
        <p>Dates</p>
        <a class="icon-sm icon-close" @click="closeMenu"></a>
      </header>
    </header>
    <main class="dates-container">
    <date-picker
      :inline="true"
      v-model="time"
      :range="isRange"
      :value-type="'format'"
    >
    </date-picker>
    </main>
  </section>
</template>

<script>
import DatePicker from "vue2-datepicker";
export default {
  props: {
    task: {
      type: Object,
      required: true,
      // },
      //  board: {
      //   type: Object,
      //   required: true,
      // },
    },
  },
  data() {
    return {
      time: null,
      isRange:false
    };
  },
  components: {
    DatePicker,
  },
  methods:{
      closeMenu(){
          this.$emit('closeMenu')
      }
  }
};
</script>

<style lang="scss">
.dates-menu {
    width: 100%;
 .mx-datepicker-main {
        border: none;
    }

    .mx-btn-current-month,
    .mx-btn-current-year {
        font-family: segoe-ui-bold;
        font-size: 15px;
    }

    .mx-calendar {
        width: 100%;
    }
    th {
        font-family: segoe-ui-bold;
        font-size: 13px;
    }
}

</style>