import React from "react";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  bgColor: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, bgColor }) => {
  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden min-w-[180px] max-w-[220px] ${bgColor}`}
    >
      <img src={imageUrl} alt={title} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
