import { CustomImage } from "../../atoms/CustomImage";
import { DownloadInfo } from "../../molecules/DownloadInfo";


const DownloadAppSection: React.FC = () => (
  <section className="bg-orange-50 rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
    <DownloadInfo />

    <div className="relative">
      <CustomImage
        src="../download_app.jpg"
        alt="Mobile App Preview"
        className="w-[300px] md:w-[350px]"
      />
      <div className="absolute bottom-6 left-4 bg-white text-blue-700 text-sm font-semibold px-3 py-1 rounded-full shadow">
        📥 5M+ Downloads
      </div>
    </div>
  </section>
);

export default DownloadAppSection;
