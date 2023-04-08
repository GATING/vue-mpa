<template>
  <base-layout>
    <el-card>
      <el-form inline :model="params" ref="searchFormRef">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="params.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <common-table v-loading="!isFinished" align="center" :data="data.list" :columns="columns" />
      <div class="flex-center mt-30">
        <el-pagination
          :total="data && data.total"
          :page-size="size"
          :current-page="current"
          :page-sizes="[10, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </base-layout>
</template>

<script setup lang="jsx">
import { reactive, ref, toRefs } from 'vue'
import CommonTable from '@comp/CommonTable/index.vue'
import { useAxiosPost } from '@/hooks/useAxiosPost'

const params = reactive({
  name: '',
  current: 1,
  size: 20,
})

const searchFormRef = ref()
const { size, current } = toRefs(params)

const { data, isFinished, execute } = useAxiosPost('/article/list', params)
const handleSizeChange = num => {
  params.size = num
  execute()
}
const handleCurrentChange = num => {
  params.current = num
  execute()
}

const search = () => {
  handleCurrentChange(1)
}

const reset = () => {
  searchFormRef.value.resetFields()
  handleCurrentChange(1)
}
const columns = [
  {
    type: 'selection',
  },
  {
    label: '序号',
    type: 'index',
  },
  {
    label: 'ID',
    prop: 'id',
  },
  {
    label: '姓名',
    prop: 'name',
    width: 200,
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    // renderHeader自带render，所以不需要箭头函数
    renderHeader() {
      return <span class="text-primary">性别</span>
    },
    // 一定要箭头函数才有render
    formatter: row => <span class="text-success">{row.sex}</span>,
  },
]
</script>

<style lang="scss" scoped></style>
