const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 px-4 sticky">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <ul className="space-y-2">
            <li>Our Services</li>
            <li>Price Trends</li>
            <li>Post your Property</li>
            <li>Real Estate Investments</li>
            <li>Builders in India</li>
            <li>Area Converter</li>
            <li>Articles</li>
            <li>Rent Receipt</li>
            <li>Customer Service</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div>
          <ul className="space-y-2">
            <li>Contact us</li>
            <li>Careers with us</li>
            <li>Terms & Conditions</li>
            <li>Request Info</li>
            <li>Feedback</li>
            <li>Report a problem</li>
            <li>Testimonials</li>
            <li>Privacy Policy</li>
            <li>Summons/Notices</li>
            <li>Grievances</li>
            <li>Safety Guide</li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2">
            <li>Naukrigulf.com - Jobs in middle east</li>
            <li>Jeevansathi.com - Matrimonials</li>
            <li>Brijj.com - Professional Networking</li>
            <li>Shiksha.com - Education Career Info</li>
            <li>Policybazaar.com - Insurance India</li>
            <li>PaisaBazaar.com</li>
            <li>AmbitionBox.com</li>
            <li>FirstNaukri.com - A jobsite for campus hiring</li>
            <li>Jobhai.com – Find Jobs Near You</li>
            <li>Techminis.com – Tech news on the go</li>
          </ul>
        </div>
        <div className="space-y-4">
          <p className="text-sm">9:30 AM to 6:30 PM (Mon-Sun)</p>
          <p className="text-sm">Email - <span className="text-blue-400">feedback@99acres.com</span></p>

          <div>
            <p className="font-semibold mb-2">Connect with us</p>
            <div className="flex space-x-4 text-lg">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Download the App</p>
            <div className="flex space-x-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-screen-xl mx-auto border-t border-gray-700 pt-4 text-xs text-gray-400 px-4">
        <p>
          Usage of 99acres.com to upload content showing area in non standard units or which enables targeting by religion/community/caste/race is prohibited.
          Please report inappropriate content by writing to us at <span className="text-blue-400">report abuse</span>
        </p>
        <p className="mt-2">All trademarks are the property of their respective owners.</p>
        <p>All rights reserved - Info Edge (India) Ltd. A naukri.com group venture</p>
      </div>
    </footer>
  );
};

export default Footer;
