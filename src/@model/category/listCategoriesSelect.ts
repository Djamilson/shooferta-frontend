export default interface IListCategoriesSelect {
  categories: [
    {
      value: string
      label: string
    }
  ]
  stateInfo: {
    page: number
    pages: number
    total: number
    limit: number
  }
}
