import { ref } from 'vue'
import { merge } from 'loadsh'
import axios from 'axios'
import { post } from '@util/request'

// 基础班
export function useAxiosPost(url, params, options) {
  const isFinished = ref(false)
  const isLoading = ref(false)
  const isAborted = ref(false)
  const data = ref({})
  const cancelTokenSource = axios.CancelToken.source

  let cancelToken = cancelTokenSource()
  const abort = message => {
    if (isFinished.value || !isLoading.value) return
    cancelToken.cancel(message)
    cancelToken = cancelTokenSource()
    isAborted.value = true
    isLoading.value = false
    isFinished.value = false
  }
  const loading = loading => {
    isLoading.value = loading
    isFinished.value = !loading
  }
  const execute = (_params, config) => {
    abort()
    loading(true)
    return post(
      url,
      merge(params, _params),
      merge(
        {
          loading: false,
        },
        config
      )
    )
      .then(resp => {
        data.value = resp
        options?.onSuccess?.(resp)
      })
      .catch(error => options?.onError?.(error))
      .finally(() => {
        loading(false)
        options?.onFinish?.()
      })
  }
  if (!options?.immediate) {
    execute()
  }
  return {
    abort,
    data,
    isFinished,
    isLoading,
    isAborted,
    execute,
  }
}
