import { Link } from "../../atoms/Link";

type ContactInfoProps = {
  phoneNumber: string;
  linkText: string;
  linkHref: string;
};

const ContactInfo: React.FC<ContactInfoProps> = ({ phoneNumber, linkText, linkHref }) => {
  return (
    <p className="text-xs text-gray-500">
      Toll Free Number: {phoneNumber}. <br />
      For international numbers <Link href={linkHref}>{linkText}</Link>
    </p>
  );
};

export default ContactInfo;
