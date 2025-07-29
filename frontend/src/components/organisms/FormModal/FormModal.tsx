import { useState, useEffect } from "react";
import { Button } from "../../atoms/Button";
import { RadioGroup } from "../../molecules/RadioGroup";
import { InputGroup } from "../../molecules/InputGroup";

const FormModal = ({ onClose, onSuccess }) => {
    const [city, setCity] = useState('');
    const [userType, setUserType] = useState('Owner');
    const [isOpen, setIsOpen] = useState(true);

    const handleSubmit = () => {
        console.log('City:', city, 'User Type:', userType);
        if (onSuccess) {
            onSuccess({ adminCity: city, adminRole: userType });
        }
        setIsOpen(false);
        if (onClose) onClose();
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 z-50">
            <div className="bg-white w-[420px] rounded-lg shadow-lg p-6 relative">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Enter details to continue
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                    </label>
                    <InputGroup
                        name="city"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <h3 className="text-md font-medium text-gray-700 mb-2">You are</h3>
                <div className="flex gap-2 mb-6">
                    <RadioGroup
                        options={['Owner', 'Broker', 'Builder']}
                        selectedValue={userType}
                        onChange={(value) => setUserType(value)}
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    text="Submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                />
            </div>
        </div>
    );
};

export default FormModal;
