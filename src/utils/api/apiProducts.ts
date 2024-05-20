import { URL } from '@/constants/api'
import REST from './api'
import makePromiseCancellable, { type CancellablePromise } from './makePromiseCancellable'

export interface IProduct {
  id: number
  image: string
  name: string
  price: string
  text: string
}

// перетащить структуру папок
export default class apiProducts extends REST {
  getProducts(): CancellablePromise<Array<IProduct>> {
    const promise = this.httpClient.get<Array<IProduct>>(URL.PRODUCTS)

    return makePromiseCancellable(
      promise.then((data) => {
        return data
      }),
      promise.cancel
    )
  }
}
