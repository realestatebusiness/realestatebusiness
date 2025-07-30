import { Home } from "react-feather";
import { Badge } from "../../atoms/Badge";
import { Button } from "../../atoms/Button";
import { StatItem } from "../../molecules/StatItem";
import { Icon } from "../../atoms/Icon";

const PostPropertySection = () => (
  <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mb-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <p className="text-blue-600 text-sm font-medium mb-2">SELL OR RENT YOUR PROPERTY</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Register to post your property for{' '}
          <Badge variant="success">FREE</Badge>
        </h2>
        <p className="text-gray-600 mb-6">Post your residential / commercial property</p>
        
        <div className="flex gap-8 mb-6">
          <StatItem value="10L+" label="Property Listings" />
          <StatItem value="45L+" label="Monthly Searches" />
          <StatItem value="2L+" label="Owners advertise monthly" />
        </div>
        
        <Button className="inline-block rounded-md bg-orange-600 px-6 py-3 text-white
             hover:bg-orange-700 transition-colors"><a href="/createProperty" >Post your property for FREE</a></Button>
      </div>
      
      <div className="bg-gray-100 rounded-xl p-8 text-center">
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Icon icon={Home} size={48} className="text-gray-400" />
        </div>
        <p className="text-gray-600">Property owner image placeholder</p>
      </div>
    </div>
  </div>
);

export default PostPropertySection;