import { useParams } from "react-router-dom";
import Intro from "../../../components/Profile/Intro";
import NoResult from "../../../components/Profile/NoResult";
import TitleBar from "../../../components/Profile/TitleBar";
import TripOverview, { ITripOverview } from "../../../components/Trip/TripOverview";
import { apiCaller } from "../../../api";
import { tripApi } from "../../../api/trip";
import { useEffect, useState } from "react";

export default function Trips() {
  const [results, setResults] = useState<ITripOverview[] | null[]>([null])
  const params = useParams()

  const getTrips = async () => {
    const res = await apiCaller(tripApi.getTripsOfUser(params.username ?? ""))
    
    if (res !== null) {
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
        <TitleBar title="Trips"/>
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