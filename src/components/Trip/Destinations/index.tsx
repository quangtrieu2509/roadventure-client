import { MinusCircleOutlined } from "@ant-design/icons";
import NoResult from "../../Profile/NoResult";
import { useDispatch, useSelector } from "react-redux";
import { getState, setCreateDestinations } from "../../../redux/Trip";

export interface Destination {
  text: string
  placeName: string
  coordinates: number[]
}

export default function Destinations() {
  // const [searchList, setSearchList] = useState<any>([])
  const destinations = useSelector(getState)
                        .create.destinations as Destination[]
  const dispatch = useDispatch()

  // const handleChange = (newValue: string) => {
  //   setSearchValue(newValue);
  // };

  // const handleSearch = (newValue: string) => {
  //   setSearchList([...searchList, { value: newValue, text: newValue }])
  // };

  const handleRemove = (index: number) => {
    dispatch(setCreateDestinations(
        [
          ...destinations.slice(0, index), 
          ...destinations.slice(index + 1)
        ]
      )
    )
  }


  return (
    <div className="font-normal w-full">
      {/* <Space.Compact size="middle" className="w-full mb-4">
        <span className="px-3 rounded-md rounded-e-none border border-solid border-[#d9d9d9] border-e-0 flex items-center bg-[#00000005]">
          <SearchOutlined />
        </span>
        <Select
          allowClear
          showSearch
          // value={searchValue}
          placeholder="Search for destinations..."
          defaultActiveFirstOption={true}
          suffixIcon={false}
          filterOption={false}
          onSearch={handleSearch}
          // onChange={handleChange}
          onSelect={(value) => console.log(value)}
          notFoundContent={null}
          options={(searchList || []).map((d: { value: any; text: any; }) => ({
            value: d.value,
            label: d.text,
          }))}
          className="w-full"
        />
      </Space.Compact> */}

      {
        destinations.length === 0
        ? <div className="min-h-[24rem]"><NoResult/></div>
        : <div className="min-h-[24rem]">
          {
            destinations.map((des, index) => {
              return (
                <div key={index}>
                  <div className="destination-item flex justify-between pt-4 pb-4">
                    <div className=" mr-4 flex flex-col justify-around">
                      <div className=" font-semibold text-base">{des.text}</div>
                      <div>{des.placeName}</div>
                    </div>
                    
                    <div 
                      className="flex items-center text-xl px-2 mx-1 my-2 rounded cursor-pointer hover:text-red-700 hover:bg-buttonHover smooth-trans"
                      onClick={() => handleRemove(index)}
                    >
                      <MinusCircleOutlined/>
                    </div>
                  </div>
                  <div className={`h-[1px] w-full bg-dividerFill ${index === (destinations.length - 1) ? "hidden" : ""}`}/>
                </div>
              )
            })
          }
        </div>
      }    
    </div>
  )
}