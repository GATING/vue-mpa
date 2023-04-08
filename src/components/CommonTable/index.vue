<template>
  <div>
    <el-table v-bind="$attrs" v-on="$listeners" :data="data" :row-key="rowKey" size="medium">
      <el-table-column v-for="column in columns" v-bind="getProps(column)" :key="column.prop" />
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'common-table',
  props: {
    align: {
      type: String,
      default: 'left',
    },
    // 显示的数据
    data: {
      type: Array,
      default: () => [],
    },
    // 列名
    columns: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: String,
      default: 'id',
    },
  },
  methods: {
    getProps(props) {
      if (!props.align) {
        props.align = this.align
      }
      return props
    },
    renderText(text) {
      if (typeof text === 'number') {
        return text
      }
      return text || ''
    },
  },
}
</script>
