<template>
    <div class="time">
        <div @click="toSecond">to second</div>
        <div @click="toThird">to third</div>
        <!-- <div @click="toFourth">to fourth</div> -->
    </div>
</template>

<script>
export default {
  methods: {
    toSecond() {
      this.$router.push('/second')
    },
    toThird() {
      this.$router.push('/third')
    },
    // toFourth() {
    //   this.$router.push('/fourth')
    // }
  }
}
</script>

<style lang="scss" scoped>
.time {
  color: rgb(209, 104, 104);
}
</style>


