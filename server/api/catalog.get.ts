export default defineEventHandler(async (event) => {

  const {apiProductCatalogUrl, apiProductCatalogIdKey} = useRuntimeConfig(event)
  const query = getQuery(event)

  if (query.id) {
    try {
      const result = await $fetch(`${apiProductCatalogUrl}?${apiProductCatalogIdKey}=${query.id}`)
      return result
    } catch (e: any) {
      if (e.data) {
        return e.data
      }
      return e
    }
  }
  return {
    code: 400,
    message: 'Parameter id Required'
  }
})