import { URL } from '../../constants/url'
import REST from './api'
import makePromiseCancellable, { type CancellablePromise } from './makePromiseCancellable'

export interface IProduct {
  id: number
  productId: number
  image: string
  name: string
  price: number
  text: string
  isFavorite: boolean
}

export interface IProductApi {
  id: number
  productId: number
  image: string
  name: string
  price: number
  text: string
}

export interface IFavorites {
  id: number
  productId: number
}

function parseProducts(data: Array<IProductApi>): Array<IProduct> {
  return data.map((item) => {
    return {
      id: item.id,
      productId: item.productId,
      image: item.image,
      name: item.name,
      price: item.price,
      text: item.text,
      isFavorite: false
    }
  })
}

export default class apiProducts extends REST {
  getProducts(params: string): CancellablePromise<Array<IProduct>> {
    const promise = this.httpClient.get<Array<IProductApi>>(URL.PRODUCTS + '/?' + params)

    return makePromiseCancellable(
      promise.then((data) => {
        return parseProducts(data)
      }),
      promise.cancel
    )
  }

  getFavorites(): CancellablePromise<Array<IFavorites>> {
    const promise = this.httpClient.get<Array<IFavorites>>(URL.FAVORITES)

    return makePromiseCancellable(
      promise.then((data) => {
        return data
      }),
      promise.cancel
    )
  }

  addToFavorites(product: { productId: number }): CancellablePromise<IFavorites> {
    const promise = this.httpClient.post<IFavorites>(URL.FAVORITES, product)

    return makePromiseCancellable(
      promise.then((data) => {
        return data
      }),
      promise.cancel
    )
  }

  deleteFromFavorites(product: { productId: number }) {
    const promise = this.httpClient.delete(URL.FAVORITES + '/' +product.productId.toString())

    return makePromiseCancellable(
      promise.then((data) => {
        return data
      }),
      promise.cancel
    )
  }

}
