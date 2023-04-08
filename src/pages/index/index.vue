<template>
  <base-layout>
    <el-card>
      <template v-if="userInfo">
        <div class="flex-between mb-30">
          <div class="align-center mb-20">
            <span class="mr-20">{{ userInfo.name }}</span>
            <el-avatar size="large" :src="userInfo.avatar" />
          </div>
          <el-button type="danger" @click="logout">退出登录</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div ref="lineRef" class="wp-100 chart"></div>
          </el-col>
          <el-col :span="12">
            <div ref="pieRef" class="wp-100 chart"></div>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-result icon="error" title="您还没登陆哦~" subTitle="请点击下方按钮进行登录">
          <template slot="extra">
            <el-button type="success" size="medium">去登陆</el-button>
          </template>
        </el-result>
      </template>
    </el-card>
  </base-layout>
</template>

<script setup>
import { ref } from 'vue'
import { fetchLogout } from '@/api/user'
import { useEcharts } from '@/composable/echarts'
import { getStorage } from '@/utils/auth'

const userInfo = getStorage('userInfo')
async function logout() {
  await fetchLogout()
  location.href = `/login.html?redirect=${encodeURIComponent(location.href)}`
}

// 图标相关
const lineOptions = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['收入', '支出'],
  },
  title: {
    text: '折线图',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: [
        '06:00',
        '08:00',
        '10:00',
        '12:00',
        '14:00',
        '16:00',
        '18:00',
        '20:00',
        '22:00',
        '24:00',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      color: '#85dbbe',
      name: '收入',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#85dbbe',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: {
        focus: 'series',
      },
      data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311],
    },
    {
      color: '#f78d94',
      name: '支出',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#f78d94',
            },
            {
              offset: 1,
              color: '#fff',
            },
          ],
        },
      },
      emphasis: {
        focus: 'series',
      },
      data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678],
    },
  ],
})
const { domRef: lineRef } = useEcharts(lineOptions)

const pieOptions = ref({
  tooltip: {
    trigger: 'item',
  },
  title: {
    text: '折线图',
  },
  legend: {
    bottom: '1%',
    left: 'center',
    itemStyle: {
      borderWidth: 0,
    },
  },
  series: [
    {
      color: ['#85dbbe', '#f78d94', '#f1cf50', '#4787f0'],
      name: '时间安排',
      type: 'pie',
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '12',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 20, name: '学习' },
        { value: 30, name: '工作' },
        { value: 40, name: '休息' },
        { value: 10, name: '娱乐' },
      ],
    },
  ],
})
const { domRef: pieRef } = useEcharts(pieOptions)
</script>

<style scope>
.chart {
  height: 400px;
}
</style>
