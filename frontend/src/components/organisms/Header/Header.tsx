// src/components/organisms/Header/Header.tsx
import React from 'react';

interface HeaderProps {
  lastVisited?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  lastVisited = '02:30 PM | 20 Jul, 2025',
  className = '',
}) => {
  const headerLinks = [
    { title: 'LEAD SEARCH', href: 'https://www.99acres.com/lmsSearch' },
    { title: 'BUY OUR SERVICES', href: 'https://www.99acres.com/do/buyourservices/?source=my99StickHeader' },
    { title: 'POST A PROPERTY', href: '/postproperty/', target: '_blank' },
    { title: 'CUSTOMER SERVICE', href: '/faq/', target: '_blank' },
  ];

  return (
    <div className={`flex items-center justify-between px-4 py-2 bg-white shadow sticky top-0 z-10 ${className}`}>
      <div className="text-sm text-gray-600">
        <span>
          Last Visited: <b className="text-black">{lastVisited}</b>
        </span>
      </div>
      
      <ol className="flex items-center space-x-2 text-sm text-gray-700">
        <li>
          <a
            href="/my99acres/homepage"
            className="hover:underline text-blue-600"
          >
            Home
          </a>
        </li>
        <li>
          <span className="mx-1 text-gray-500">&gt;</span>
        </li>
        <li>
          <span className="text-gray-500 pointer-events-none">
            Modify Profile
          </span>
        </li>
      </ol>
      
      <div className="flex items-center space-x-4 text-sm font-medium">
        {headerLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.target}
            className="text-blue-600 hover:underline"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;