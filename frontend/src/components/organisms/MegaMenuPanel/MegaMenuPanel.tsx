import React, { useEffect, useRef } from "react";
import type { MegaMenuDefinition } from "../../../data/MegaMenuDefinition";
import { HeaderBadge } from "../../atoms/HeaderBadge";

interface MegaMenuPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: MegaMenuDefinition;
  alignCenter?: boolean;
}

const MegaMenuPanel: React.FC<MegaMenuPanelProps> = ({
  isOpen,
  onClose,
  data,
  alignCenter = true,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const wrapperClasses = alignCenter
    ? "absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[min(90vw,1100px)]"
    : "absolute left-0 right-0 top-full mt-2 w-full";

  return (
    <div
      ref={menuRef}
      className={`${wrapperClasses} bg-white shadow-2xl z-[60] p-6 flex rounded-lg`}
      role="menu"
      aria-label={`${data.id} menu`}
    >
      <div className="w-1/4 pr-6 border-r">
        <ul className="space-y-4 text-gray-800 font-semibold text-sm">
          {data.sideCategories.map((cat) => (
            <li
              key={cat.label}
              className="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
            >
              <a href={cat.href || "#"}>{cat.label}</a>
              {cat.badge && <HeaderBadge color="blue">{cat.badge}</HeaderBadge>}
            </li>
          ))}
        </ul>
        {data.contact && (
          <div className="mt-6 text-sm text-gray-600 leading-snug">
            contact us toll free on <br />
            <span className="text-lg font-bold text-blue-600">{data.contact.phone}</span>
            <br />
            {data.contact.hours}
          </div>
        )}
      </div>

      <div className="w-1/2 px-6 flex gap-8">
        {data.columns.map((col) => (
          <div key={col.heading} className="w-1/2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              {col.heading}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {col.items.map((it) => (
                <li key={it.label} className="hover:text-blue-600 cursor-pointer">
                  <a href={it.href || "#"}>{it.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {data.promo && (
        <div className="w-1/4 bg-blue-50 p-4 rounded-lg">
          <div className="text-xs text-blue-700 font-bold mb-2 uppercase tracking-wide">
            {data.promo.title}
          </div>
          <a href={data.promo.href || "#"} className="block">
            <h4 className="text-lg font-bold text-blue-900 mb-3">{data.promo.heading}</h4>
          </a>
          <ul className="text-sm text-gray-700 space-y-2">
            {data.promo.points.map((pt) => (
              <li key={pt} className="flex items-start gap-1">
                <span>✔</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default MegaMenuPanel;