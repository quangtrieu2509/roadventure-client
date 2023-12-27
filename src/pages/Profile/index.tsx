// import "./index.style.scss"

import { useSelector } from "react-redux"
import { getState } from "../../redux/Header"

export default function Profile() {
  const { headerSearch } = useSelector(getState)
  console.log("headersearch in profile", headerSearch)
  return (
    <div className="home w-full flex justify-center pt-20">
      <div className="max-w-6xl">
        <h1 className="text-[3.5rem] mb-0 text-center">Where to?</h1>
        <div className="search-box-main flex justify-between h-fit m-6 p-1 w-[40em] border-solid border-2 rounded-full border-boxBorder">
          <input
            className="h-8 w-full p-2 pl-6 text-base border-none rounded-full focus:outline-none"
            style={{ fontFamily: "Poppins" }}
            placeholder="Places you want to go..."
          ></input>
          <span className="flex items-center font-semibold text-base border-solid border border-main text-main no-underline px-5 py-2.5 rounded-full bg-white hover:bg-buttonHover1 active:bg-buttonClick1 cursor-pointer">
            Search
          </span>
        </div>

        <div className="hero-content"></div>
      </div>
    </div>
  )
}
