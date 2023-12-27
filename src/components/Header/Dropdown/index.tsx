import { MenuProps } from "antd"
import { Dropdown } from "antd"

interface DropDownProps {
  menuItems: MenuProps["items"]
  name: string
  hoverText?: JSX.Element | string
  path?: string
  route?: string | undefined
}

function DropDown({ menuItems, name }: DropDownProps) {
  return (
    <div>
      <Dropdown
        menu={{ items: menuItems }}
        trigger={["click"]}
        //onOpenChange={() => {}}
        className="header-dropdown"
        autoAdjustOverflow={false}
      >
        <span
          className="font-semibold text-base border-none px-4 py-2.5 rounded-full mx-px bg-transparent hover:bg-buttonHover cursor-pointer"
          onClick={(e) => e.preventDefault()}
        >
          {name}
        </span>
      </Dropdown>
    </div>
  )
}

export default DropDown
