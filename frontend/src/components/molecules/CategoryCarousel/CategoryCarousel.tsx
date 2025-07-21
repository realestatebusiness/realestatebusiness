import React from "react";
import { CategoryCard } from "../../atoms/CategoryCard";

const categories = [
  {
    title: "Corner Plots",
    imageUrl: "../corner.jpg",
    bgColor: "bg-amber-50",
  },
  {
    title: "Plots in Gated Society",
    imageUrl: "../gated.jpg",
    bgColor: "bg-blue-50",
  },
  {
    title: "East facing plots",
    imageUrl: "../east.jpg",
    bgColor: "bg-green-50",
  },
  {
    title: "Plots with boundary wall",
    imageUrl: "../boundary.jpg",
    bgColor: "bg-green-50",
  },
];

const CategoryCarousel: React.FC = () => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {categories.map((cat, index) => (
        <CategoryCard key={index} {...cat} />
      ))}
    </div>
  );
};

export default CategoryCarousel;
