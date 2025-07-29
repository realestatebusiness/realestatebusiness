import { Info } from "react-feather";
import { Button } from "../../atoms/Button";
import { LocalityItem } from "../../molecules/LocalityItem";
import { Icon } from "../../atoms/Icon";

const DemandSection = () => {
  const localities = {
    apartment: [
      { name: 'Kukatpally', percentage: '4%' },
      { name: 'Old Mumbai Highway', percentage: '4%' },
      { name: 'Narsingi', percentage: '4%' },
      { name: 'Miyapur', percentage: '3%' },
      { name: 'Gachibowli', percentage: '3%' }
    ],
    plots: [
      { name: 'Hayathnagar', percentage: '3%' },
      { name: 'Narsingi', percentage: '3%' },
      { name: 'Outer ring road', percentage: '2%' },
      { name: 'Shankarpally', percentage: '1%' },
      { name: 'Patancheru', percentage: '1%' }
    ],
    builderFloor: [
      { name: 'Narsingi', percentage: '3%' },
      { name: 'Kukatpally', percentage: '2%' },
      { name: 'Old Mumbai Highway', percentage: '2%' },
      { name: 'Kondapur', percentage: '1%' },
      { name: 'Miyapur', percentage: '1%' }
    ]
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mb-8">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Demand in Hyderabad</h2>
        <Icon icon={Info} size={20} className="text-gray-400" />
      </div>
      <p className="text-gray-600 mb-6">Where are buyers searching in Hyderabad</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(localities).map(([type, data]) => (
          <div key={type} className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {type === 'apartment' ? 'Apartment' : type === 'plots' ? 'Plots' : 'Builder Floor'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Most searched localities for {type === 'apartment' ? 'Flat/Apartment' : type === 'plots' ? 'Plots' : 'Builder Floor'}
            </p>
            
            <div className="space-y-3">
              {data.map((locality, index) => (
                <LocalityItem
                  key={index}
                  rank={index + 1}
                  name={locality.name}
                  percentage={locality.percentage}
                />
              ))}
            </div>
            
            <Button className="mt-4 p-0">
              View all 5 Localities
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DemandSection;