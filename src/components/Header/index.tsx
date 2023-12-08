import { useState } from "react";

import './index.style.scss';
import { IMAGE_PATH } from "../../constants";
import { featureItems } from "./menuItems";
import DropDown from "./Dropdown";
import User from "./User";

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
              alt="#"
              src={IMAGE_PATH.FULL_LOGO}
              className="image w-full cursor-pointer"
            />
          </div>
          <div className="header-item flex">
            {featureItems.map((val, index) => (
              <DropDown
                menuItems={val.items}
                name={val.name}
                key={index}
              />
            ))}
          </div>
          <div className="header-item flex justify-end w-52">
            <User/>
            <span className='font-semibold text-base border-none px-5 py-2.5 rounded-full mx-px bg-transparent hover:bg-buttonHover cursor-pointer'>
              USD
            </span>
          </div>

        </nav>
      </div>
    </header>
  );
}