<template>
    <div class="time">
        {{time}}
    </div>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    time() {
      return moment().toString()
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
    color: blue;
}
</style>


