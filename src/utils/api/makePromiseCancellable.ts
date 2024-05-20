export type CancellablePromise<T> = Promise<T> & {
  cancel(): void
}

const makePromiseCancellable = <T>(
  promise: Promise<T>,
  cancelCallback: () => void
): CancellablePromise<T> => {
  const cancellablePromise: Promise<T> & { cancel?(): void } = promise

  cancellablePromise.cancel = () => {
    cancelCallback()
  }

  return cancellablePromise as CancellablePromise<T>
}

export default makePromiseCancellable
