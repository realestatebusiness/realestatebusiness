import { AppBadge } from "../../atoms/AppBadge";
import { CheckItem } from "../../atoms/CheckItem";
import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";

const DownloadInfo: React.FC = () => (
  <div className="flex flex-col gap-4 max-w-md">
    <Heading>Download 99acres Mobile App</Heading>
    <Paragraph className="text-blue-600 text-sm -mt-2">
      and never miss out any update
    </Paragraph>

    <div className="space-y-2">
      <CheckItem>Get to know about newly posted properties as soon as they are posted</CheckItem>
      <CheckItem>Manage your properties with ease and get instant alerts about responses</CheckItem>
    </div>

    <div className="flex gap-3 mt-2">
      <AppBadge platform="android" />
      <AppBadge platform="ios" />
    </div>
  </div>
);
export default DownloadInfo;
