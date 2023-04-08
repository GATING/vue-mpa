<template>
  <el-card class="main-container">
    <el-form :model="form" :rules="rules" ref="loginFormRef" label-width="4em">
      <el-form-item label="账号" prop="user">
        <el-input v-model.number="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { getUrlQuery, mergeQuery } from '@/utils'
import { validateRequired } from '@/utils/validate'
import { fetchLogin } from '@/api/user'

const data = reactive({
  form: {
    user: 'gating',
    pass: '123456',
  },
  rules: {
    user: [validateRequired('请输入账号')],
    pass: [validateRequired('请输入密码')],
  },
  redirectUrl: '',
})

const loginFormRef = ref()
const { form, rules, redirectUrl } = toRefs(data)

async function login() {
  await loginFormRef.value.validate()
  await fetchLogin(form.value)
  location.href = redirectUrl.value
}
function reset() {
  loginFormRef.value.resetFields()
}

onMounted(() => {
  const { redirect, ...otherQuery } = getUrlQuery(location.href)
  redirectUrl.value = mergeQuery(decodeURIComponent(redirect || '/'), otherQuery)
})
</script>

<style scoped>
.main-container {
  width: 1200px;
  margin: 60px auto;
}
</style>
