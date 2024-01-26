import { MinusCircleOutlined } from "@ant-design/icons";
import NoResult from "../../Profile/NoResult";
import { useDispatch, useSelector } from "react-redux";
import { getState, setCreateDestinations } from "../../../redux/Trip";
import { Destination } from "../Destinations";

interface ItineraryItem {
  destination: Destination
  description: string
}

export default function Itinerary() {
  // const [searchList, setSearchList] = useState<any>([])
  const destinations = useSelector(getState)
                        .create.destinations as Destination[]
  const itineraryItems = useSelector(getState)
                        .create.itinerary as ItineraryItem[]
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

      {
        itineraryItems.length === 0
        ? <div className="min-h-[24rem]"><NoResult/></div>
        : <div className="min-h-[24rem]">
          {
            itineraryItems.map((item, index) => {
              return (
                <div key={index}>
                  <div className="destination-item flex justify-between pt-4 pb-4">
                    <div className=" mr-4 flex flex-col justify-around">
                      <div className=" font-semibold text-base">{item.destination.text}</div>
                      <div>{item.destination.placeName}</div>
                    </div>
                    
                    <div 
                      className="flex items-center text-xl px-2 mx-1 my-2 rounded cursor-pointer hover:text-red-700 hover:bg-buttonHover smooth-trans"
                      onClick={() => handleRemove(index)}
                    >
                      <MinusCircleOutlined/>
                    </div>
                  </div>
                  <div className={`h-[1px] w-full bg-dividerFill ${index === (itineraryItems.length - 1) ? "hidden" : ""}`}/>
                </div>
              )
            })
          }
        </div>
      }    
    </div>
  )
}