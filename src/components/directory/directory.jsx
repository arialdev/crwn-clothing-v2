import CategoryItem from "../category-item/category-item";
import './directory.scss';

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => <CategoryItem key={category.id} category={category}></CategoryItem>)}
    </div>
  )
}

export default Directory;