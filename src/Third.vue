<template>
  <div class="time">
    {{xiaogou}}
    <Button>1333323</Button>
  </div>
</template>

<script>
import _ from 'lodash'
import { Button } from 'element-ui'

export default {
  components: {
    Button
  },
  computed: {
    xiaogou() {
      return _.cloneDeep([1, 2, 3])
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  color: yellow;
}
</style>


