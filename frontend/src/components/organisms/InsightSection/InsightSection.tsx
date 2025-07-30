import { InsightCard } from "../../molecules/InsightCard";
import { MapPin, Star, TrendingUp } from "react-feather";
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/Icon";

const InsightsSection = () => (
  <div className="bg-blue-50 rounded-xl shadow-md p-6 max-w-7xl mx-auto mb-8">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 rounded-lg p-2">
          <Icon icon={TrendingUp} size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Insights & Tools</h2>
          <p className="text-gray-600">Go from browsing to buying</p>
        </div>
      </div>
      <Button variant="secondary">View all Insights</Button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <InsightCard
        title="Hyderabad Overview"
        description="Know what's great & upcoming developments"
        icon={MapPin}
      />
      <InsightCard
        title="Property Rates in Hyderabad"
        description="Check property rates and prices"
        icon={TrendingUp}
      />
      <InsightCard
        title="Genuine reviews of Hyderabad"
        description="Know what residents are saying"
        icon={Star}
      />
      <InsightCard
        title="Traffic in Hyderabad"
        description="Check real-time traffic updates"
        icon={MapPin}
      />
    </div>
  </div>
);
export default InsightsSection;