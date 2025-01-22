export enum OSS_SIZE {
  SMALL = 96,
  NORMAL = 120,
  LARGE = 300,
  X_LARGE = 500,
}

const ossResize = (url: string, size: OSS_SIZE) => {
  if (url) {
    if (url.indexOf('?') >= 0) {
      return url
    }
    return url + '?x-oss-process=image/resize,l_' + size
  }
  return ''
}

export const $filters = {
  ossResize,
}
