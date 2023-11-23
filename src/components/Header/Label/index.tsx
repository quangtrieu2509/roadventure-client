import { Link } from 'react-router-dom';

interface LabelProps {
  url: string;
  title: string;
}
export default function Label({ url, title }: LabelProps) {
  return (
    <Link to={url}>
      <div className="w-50">
        <p className="m-0 text-base font-medium mb-2">{title}</p>
      </div>
    </Link>
  );
}
