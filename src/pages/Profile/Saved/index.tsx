import { useEffect, useState } from "react";
import TitleBar from "../../../components/Profile/TitleBar";
import NoResult from "../../../components/Profile/NoResult";
import SavedTrip from "../../../components/Trip/SavedTrip";
import { apiCaller } from "../../../api";
import { tripApi } from "../../../api/trip";
import { interactTypes } from "../../../constants";

const saved = {
  TRIP: "trip",
  POST: "post"
}

export default function Saved() {
  const [category, setCategory] = useState<string>(saved.TRIP)
  const [results, setResults] = useState<any[] | null[]>([null])

  const getSavedTrips = async () => {
    const res = await apiCaller(tripApi.getSavedTrips())
    
    if (res !== null) {
      setResults(res.data)
    }
  }

  const handleUnsave = async (value: string, index: number) => {
    await apiCaller(
      tripApi.interactTrip(
        value,
        interactTypes.SAVE,
        false,
      )
    )
    
    setResults([...results.slice(0, index), ...results.slice(index + 1)])
  }

  useEffect(() => {
    if (category === saved.TRIP) getSavedTrips()
    // add else for POST
  }, [category])

  return (
    <div className="profile-subpage flex mb-4">
      <div className="saved-category w-40 min-w-[10rem] bg-white rounded-lg px-6 py-3.5 mr-4 h-fit">
        <div className="font-semibold text-lg mb-3">Saved</div>
        <div 
          className={`mb-1 text-base hover:bg-buttonHover px-4 py-2 rounded-md cursor-pointer smooth-trans ${category === saved.TRIP ? "bg-buttonHover" : ""}`}
          onClick={() => setCategory(saved.TRIP)}
        >
          <span >Trips</span>
        </div>
        <div 
          className={`mb-1 text-base hover:bg-buttonHover px-4 py-2 rounded-md cursor-pointer smooth-trans ${category === saved.POST ? "bg-buttonHover" : ""}`}
          onClick={() => setCategory(saved.POST)}
        >
          <span >Posts</span>
        </div>
      </div>
      <div className="profile-content w-full">
        <TitleBar 
          title={
            category === saved.TRIP 
            ? `Trips (${results[0] == null ? "0" : results.length})` 
            : `Posts (${results[0] == null ? "0" : results.length})`
          }
        />
        <div>
          {
            results.length === 0
            ? <NoResult/>
            : results.map((value, index) => {
              return (
                <SavedTrip 
                  key={index}
                  trip={value} 
                  onHandleUnsave={() => handleUnsave(value.id, index)}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}