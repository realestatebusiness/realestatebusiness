// src/components/organisms/Navigation/Navigation.tsx
import React from 'react';

interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

const Navigation: React.FC = () => {
  const navItems: NavItem[] = [
    {
      title: 'My99acres',
      href: '/my99acres/homepage',
      items: []
    },
    {
      title: 'Manage Listings',
      href: '#',
      items: [
        { title: 'All Products', href: '/my99acres/all_listings/' },
        { title: 'Ad Campaigns', href: '#' },
        { title: 'E-Mailers', href: '#' },
        { title: 'Banners', href: '#' },
        { title: 'All Listings', href: '#' },
        { title: 'Plain Listings', href: '#' },
        { title: 'Basic Listings', href: '#' },
        { title: 'Platinum Listings', href: '#' },
        { title: 'Premium Listings', href: '#' },
      ]
    },
    {
      title: 'Manage Responses',
      href: '#',
      items: [
        { title: 'All Products', href: '#' },
        { title: 'E-Mailers', href: '#' },
        { title: 'All Listings', href: '#' },
        { title: 'Basic Listings', href: '#' },
        { title: 'Plain Listings', href: '#' },
        { title: 'Platinum Listings', href: '#' },
        { title: 'Premium Listings', href: '#' },
        { title: 'All Leads', href: '#' },
      ]
    }
  ];

  const otherLinks = [
    { title: 'Get Leads', href: '#' },
    { title: 'Subscription Status', href: '#' },
    { title: 'Manage Payments', href: '#' },
    { title: 'Credit Usage History', href: '#' },
    { title: 'Upgrade History', href: '#' },
    { title: 'FSL Booking', href: '#' },
    { title: 'Omni Ads Performance', href: '#' },
    { title: 'Shortlist', href: '#' },
  ];

  const settingsLinks = [
    { title: 'My Leads', href: '#' },
    { title: 'Opt out Dealer Response', href: '#' },
    { title: 'Change Password', href: '#' },
  ];

  return (
    <nav className="space-y-6 text-sm">
      {/* Main Nav Items */}
      {navItems.map((section, index) => (
        <div key={index}>
          {section.items && section.items.length > 0 ? (
            <>
              <h5 className="text-gray-700 font-bold text-sm mb-2">
                {section.title}
              </h5>
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className="block hover:text-blue-600"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <a
              href={section.href}
              className="block text-blue-700 font-semibold hover:underline"
            >
              {section.title}
            </a>
          )}
        </div>
      ))}

      {/* Other Main Links */}
      <div>
        <ul className="space-y-1">
          {otherLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="block hover:text-blue-600">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Settings */}
      <div>
        <h5 className="text-gray-700 font-bold mb-2">Settings</h5>
        <ul className="space-y-1">
          {settingsLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="block hover:text-blue-600">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
