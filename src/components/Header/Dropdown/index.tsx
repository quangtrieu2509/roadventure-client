/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { MenuProps } from 'antd';
import { Dropdown } from 'antd';
// import './index.style.scss';
// import { useLocation } from 'react-router-dom';

interface DropDownProps {
  menuItems: MenuProps['items'];
  name: string;
  hoverText?: JSX.Element | string;
  path?: string;
  route?: string | undefined;
}

function DropDown({
  menuItems,
  name
}: DropDownProps) {

  return (
    <div>
      <Dropdown
        menu={{ items: menuItems }}
        // className={'mx-6 font-medium'}
        trigger={['click']}
        onOpenChange={() => {
        
        }}
        className='header-dropdown'
      >
      <button className='font-semibold text-base border-none px-5 py-2.5 rounded-full mx-px bg-transparent hover:bg-buttonHover cursor-pointer'
        onClick={(e) => e.preventDefault()} 
      >
        {name}
      </button>
      </Dropdown>
    </div>
  );
}

export default DropDown;
