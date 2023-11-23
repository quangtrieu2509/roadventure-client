import { Link } from "react-router-dom";
import { IMAGE_PATH, ROUTES } from "../../constants";
import { menuItems } from "./menuItems";
import { PUBLIC_URL, REACT_APP_BASE_URL } from "../../configs";
import './index.style.scss';
import DropDown from "./Dropdown";
import { useState } from "react";

export default function Header() {
  const [isTop, setIsTop] = useState<boolean>(true)

  window.addEventListener('scroll', function() {
    if(window.scrollY === 0) {
      setIsTop(true)
    } else {
      setIsTop(false)
    }
  })

  return (
    <header className={`h-16 flex justify-center bg-white ${isTop ? 'mt-2' : 'border-solid border-0 border-b border-dividerFill'}`}>
      <div className="header-box max-w-6xl w-[72rem]">
        <nav className="header-nav">
          <div className="header-item flex w-52">
            <img
              id="img"
              alt="#"
              src={IMAGE_PATH.FULL_LOGO}
              className="image"
            />
          </div>
          <div className="header-item flex">
            {menuItems.map((val, index) => (
              <DropDown
                menuItems={val.items}
                name={val.name}
                key={index}
              />
            ))}
          </div>
          <div className="header-item flex justify-end w-52">
            <button className='font-semibold text-base border-2 px-5 py-2 rounded-lg mx-1 bg-transparent hover:bg-buttonHover cursor-pointer'>
              Sign in
            </button>
            <button className='font-semibold text-base border-none px-5 py-2.5 rounded-full mx-px bg-transparent hover:bg-buttonHover cursor-pointer'>
              USD
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
}