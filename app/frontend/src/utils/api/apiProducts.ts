import { URL } from '../../constants/url'
import REST from './api'
import makePromiseCancellable, { type CancellablePromise } from './makePromiseCancellable'

export interface IProduct {
  id: number
  image: string
  name: string
  price: string
  text: string
}

export default class apiProducts extends REST {
  getProducts(params: string): CancellablePromise<Array<IProduct>> {
    const promise = this.httpClient.get<Array<IProduct>>(URL.PRODUCTS + '/?' +  params)

    return makePromiseCancellable(
      promise.then((data) => {
        return data
      }),
      promise.cancel
    )
  }
}
