import { useDispatch } from "react-redux"
import "./index.style.scss"
import { setIsAtHome } from "../../redux/Header"
import { useEffect } from "react"
import { ArrowRightOutlined } from "@ant-design/icons"

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsAtHome(true))
    console.log("set")

    return () => {
      dispatch(setIsAtHome(false))
      console.log("remove")
    }
  }, [])

  return (
    <div className="rv-page">
      <div className="rv-wrapper flex flex-col items-center">
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
        <div>
          <span className=" text-extraText">Not sure where to go? </span>
          <span className=" text-main font-semibold cursor-pointer rcm-element">
              Check out some fantastic trips
              <span className=" text-lg align-middle smooth-trans ml-1">
                <ArrowRightOutlined/>
              </span>
            </span>
        </div>

        <div className="hero-content">
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
        </div>
      </div>
    </div>
  )
}
