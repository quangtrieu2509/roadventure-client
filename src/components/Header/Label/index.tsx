import { Link } from 'react-router-dom';

interface LabelProps {
  url: string;
  title: string;
  event?: ()=>void;
}
export default function Label({ url, title, event = undefined }: LabelProps) {
  return (
    <Link to={url} onClick={event}>
      <div className="w-50" >
        <p className="m-0 text-base font-medium my-1">{title}</p>
      </div>
    </Link>
  );
}
