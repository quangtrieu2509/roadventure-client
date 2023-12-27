import { useNavigate } from "react-router-dom"

interface LabelProps {
  url?: string
  title: string
  event?: () => void
}
export default function Label({
  url = undefined,
  title,
  event = undefined,
}: LabelProps) {

  const navigate = useNavigate()

  const handleNavigate = () => {
    if (url !== undefined) {
      navigate(url)
    }
  }

  return (
    <div onClick={handleNavigate}>
      <div onClick={event}>
        <p className="m-0 text-base font-medium my-1">{title}</p>
      </div>
    </div>
  )
}
