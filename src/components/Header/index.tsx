import { useEffect, useState } from "react"

import "./index.style.scss"
import { IMAGE_PATH } from "../../constants"
import { featureItems } from "./itemLists"
import DropDown from "./Dropdown"
import User from "./User"
import { SearchOutlined } from "@ant-design/icons"
import { getState } from "../../redux/Header"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const navigate = useNavigate()
  const [isTop, setIsTop] = useState<boolean>(true)
  const [headerSearch, setHeaderSearch] = useState<boolean>(false)
  const { isAtHome } = useSelector(getState)

  const handleScrollAtHome = () => {
    if (window.scrollY === 0) {
      setIsTop(true)
      setHeaderSearch(false)
    } else if (window.scrollY > 215) {
      setIsTop(false)
      setHeaderSearch(true)
    } else {
      setIsTop(false)
      setHeaderSearch(false)
    }
  }

  useEffect(() => {
    if (isAtHome) window.addEventListener("scroll", handleScrollAtHome)
    return () => {
      window.removeEventListener("scroll", handleScrollAtHome)
      setIsTop(true)
      setHeaderSearch(false)
    }
  }, [isAtHome])

  return (
    <header
      className={`h-16 flex justify-center bg-white smooth-trans ${
        isAtHome? (isTop ? "header-at-top" : "header-normal") : "header-normal"
      }`}
    >
      <div className="header-box max-w-6xl w-[72rem]">
        <nav className="header-nav">
          <div className="header-item flex w-52">
            <img
              alt="#"
              src={IMAGE_PATH.FULL_LOGO}
              className="image w-full cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div className={`flex justify-between h-[52%] p-0.5 ml-4 w-64 border-solid border-2 rounded-full border-boxBorder ${
            isAtHome ? (headerSearch ? "" : "hidden ") : ""
          }`}>
            <input
              className=" h-auto w-full p-1 pl-4 text-base border-none rounded-full focus:outline-none"
              style={{ fontFamily: "Poppins" }}
              placeholder="Where to?"
            />
            <span className="flex items-center font-semibold text-xl text-main no-underline px-3.5 py-2.5 rounded-e-full bg-white hover:bg-buttonHover1 active:bg-buttonClick1 cursor-pointer">
              <SearchOutlined/>
            </span>
          </div>
          <div className="header-item flex">
            {featureItems.map((val, index) => (
              <DropDown menuItems={val.items} name={val.name} key={index} />
            ))}
          </div>
          <div className="header-item flex justify-end w-52">
            <User />
            <span className="font-semibold text-base border-none px-5 py-2.5 rounded-full mx-px bg-transparent hover:bg-buttonHover cursor-pointer">
              USD
            </span>
          </div>
        </nav>
      </div>
    </header>
  )
}
