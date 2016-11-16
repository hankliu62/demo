<template>
  <footer class="footer">
    <!-- active todos count -->
    <span class="todo-count">
      <template v-if="activeCount === 0">
        <span>No items left</span>
      </template>
      <template v-else>
        <span>{{ activeCount }}</span>
        <span>{{ ' items'.replace(activeCount === 1 ? 's' : '', '') }}</span>
        <span>left</span>
      </template>
    </span>
    <!-- filter list -->
    <ul class="filters">
      <li v-for="(key, value) in filtersStatus" track-by="$index">
        <a :class="{ cp: true, selected: value === filter }" @click="onClickFilter(value)">{{ value }}</a>
      </li>
    </ul>
    <!-- clear completed todo button -->
    <button class="clear-completed" @click="onClickClear">Clear Completed</button>
  </foote>
</template>

<script>
import { FILTER_STATUSES } from '../../../../constants/Constants'
export default {
  props: {
    activeCount: {
      type: Number,
      required: true
    },
    completedCount: {
      type: Number,
      required: true
    },
    filter: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      filtersStatus: FILTER_STATUSES
    }
  },
  methods: {
    onClickFilter: function (filter) {
      this.$emit('filter', filter)
    },
    onClickClear: function () {
      this.$emit('clear')
    }
  }
}
</script>
<style lang="less">
@import './Footer.less';
</style>