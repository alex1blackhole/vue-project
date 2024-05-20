import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type Canceler,
  type Method
} from 'axios'

import makePromiseCancellable, { type CancellablePromise } from './makePromiseCancellable'

type Response<T> =
  | {
      status: 'ok'
      data: T
    }
  | {
      status: 'ok'
      [key: string]: any
    }
  | {
      error: string
      status: 'error'
      data: T
    }

export type RequestConfig = AxiosRequestConfig

export const { isCancel } = axios

const getRequestConfig = (
  url: string,
  method: Method,
  data?: Record<string, any>,
  optionalConfig?: RequestConfig
) => {
  const config: RequestConfig = { ...optionalConfig }
  config.data = data
  config.method = method
  config.url = url
  return config
}

class HttpClient {
  protected readonly lib: AxiosInstance

  constructor() {
    this.lib = axios
  }

  private request<T>(config: RequestConfig): CancellablePromise<T> {
    let cancelFn: Canceler | null = null

    config.cancelToken = new axios.CancelToken((cancel) => {
      cancelFn = cancel
    })

    const promise = this.lib.request<Response<T>>(config).then(
      (response) => {
        if (response.data.status === 'error') {
          return Promise.reject(response.data)
        }

        if (response.data && response.data.status === 'ok') {
          return response.data.data || response.data
        }

        return response.data as any as T
      },
      (error) => {
        if (isCancel(error) || !(error instanceof Error)) {
          return Promise.reject(error)
        }

        const axiosError = error as AxiosError

        return axiosError.response?.data
          ? Promise.reject(axiosError.response.data)
          : Promise.reject()
      }
    )

    return makePromiseCancellable(promise, () => {
      if (cancelFn) {
        cancelFn()
      }
    })
  }

  get<T>(url: string, optionalConfig?: RequestConfig): CancellablePromise<T> {
    return this.request<T>(getRequestConfig(url, 'get', undefined, optionalConfig))
  }

  post<T>(
    url: string,
    data?: Record<string, any>,
    optionalConfig?: RequestConfig
  ): CancellablePromise<T> {
    return this.request<T>(getRequestConfig(url, 'post', data, optionalConfig))
  }

  put<T>(
    url: string,
    data?: Record<string, any>,
    optionalConfig?: RequestConfig
  ): CancellablePromise<T> {
    return this.request<T>(getRequestConfig(url, 'put', data, optionalConfig))
  }

  delete<T>(
    url: string,
    data?: Record<string, any>,
    optionalConfig?: RequestConfig
  ): CancellablePromise<T> {
    return this.request<T>(getRequestConfig(url, 'delete', data, optionalConfig))
  }
}

export default abstract class Api {
  protected readonly httpClient: HttpClient

  constructor(httpClient?: HttpClient) {
    this.httpClient = httpClient || new HttpClient()
  }
}
