import ISubCategory from './subcategory'
import ISubCategoryInfo from './subcategoryInfo'

export default interface IListSubCategories {
    data: {
        subCategories?: ISubCategory[]
        subCategoryInfo: ISubCategoryInfo
    }
}
