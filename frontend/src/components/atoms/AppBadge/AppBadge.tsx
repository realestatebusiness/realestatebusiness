interface AppBadgeProps {
  platform: "android" | "ios";
}
const AppBadge: React.FC<AppBadgeProps> = ({ platform }) => {
  const isAndroid = platform === "android";
  return (
    <a href="#" className="inline-block">
      <img
        src={isAndroid ? "/icons/google-play.svg" : "/icons/app-store.svg"}
        alt={isAndroid ? "Get it on Google Play" : "Download on the App Store"}
        className="h-10"
      />
    </a>
  );
};
export default AppBadge;
