import React from "react";
import { MenuListItem } from "../../molecules/MenuListItem";
import { Divider } from "../../atoms/Divider";

const MenuSection = ({ items }) => {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.type === 'divider' ? (
            <Divider />
          ) : (
            <MenuListItem
              hasChevron={item.hasChevron}
              badge={item.badge}
              onClick={item.onClick}
            >
              {item.label}
            </MenuListItem>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};
export default MenuSection;