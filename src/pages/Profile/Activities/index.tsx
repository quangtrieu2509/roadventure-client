import { useParams } from "react-router-dom";
import Intro from "../../../components/Profile/Intro";
import NoResult from "../../../components/Profile/NoResult";
import TitleBar from "../../../components/Profile/TitleBar";
import TripOverview from "../../../components/Trip/TripOverview";
import { apiCaller } from "../../../api";
import { tripApi } from "../../../api/trip";
import { useEffect, useState } from "react";

export default function Activities() {
  const [results, setResults] = useState<any[] | null[]>([null])
  const params = useParams()

  const getTrips = async () => {
    const res = await apiCaller(tripApi.getTripsOfUser(params.username ?? ""))
    
    if (res !== null) {
      console.log(res.data)
      setResults(res.data)
    }
  }

  useEffect(() => {
    getTrips()
  }, [params])

  return (
    <div className="profile-subpage flex mb-4">
      <div className="w-fit"><Intro/></div>
      <div className="profile-content w-full">
        <TitleBar title="Activities"/>
        <div>
          {
            results.length === 0
            ? <NoResult/>
            : results.map((value, index) => {
              return (
                <TripOverview key={index} trip={value}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}