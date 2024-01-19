import { ClockCircleFilled, HomeFilled } from "@ant-design/icons";

export default function Intro() {
  return (
    <div className="w-60 min-w-[15rem] bg-white rounded-lg px-6 py-3.5 mr-4">
      <div className="font-semibold text-lg mb-4">Intro</div>
      <div className="intro-item flex items-center mb-2">
        <div className=" text-subText"><HomeFilled/></div>
        <span className="ml-3">Hanoi, Vietnam</span>
      </div>
      <div className="intro-item flex items-center mb-2">
        <div className="text-subText"><ClockCircleFilled/></div>
        <span className="ml-3">Join on April 2014</span>
      </div>
    </div>
  )
}