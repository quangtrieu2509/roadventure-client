import Intro from "../../../components/Profile/Intro";
import TitleBar from "../../../components/Profile/TitleBar";

export default function Trips() {
  return (
    <div className="profile-subpage flex mb-4">
      <Intro/>
      <div className="profile-content w-full">
        <TitleBar title="Trips"/>
      </div>
    </div>
  )
}