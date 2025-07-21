import { Input } from "../../atoms/Input";

const SearchSection = ({ placeholder = "Search by Property Code" }) => {
  return (
    <div className="mt-6">
      <Input placeholder={placeholder} />
    </div>
  );
};

export default SearchSection;