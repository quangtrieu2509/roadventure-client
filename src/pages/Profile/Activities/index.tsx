import { useParams } from "react-router-dom";
import Intro from "../../../components/Profile/Intro";
import NoResult from "../../../components/Profile/NoResult";
import TitleBar from "../../../components/Profile/TitleBar";
import Trip from "../../../components/Trip/Trip";
import { apiCaller } from "../../../api";
import { tripApi } from "../../../api/trip";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../utils/Auth";

export default function Activities() {
  const [results, setResults] = useState<any[] | null[]>([null])
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const params = useParams()

  const getTrips = async () => {
    const res = await apiCaller(tripApi.getTripsOfUser(params.username ?? ""))
    
    if (res !== null) {
      const storage = getLocalStorage("id")
      const resData = res.data
      console.log(resData)
      resData.length !== 0 && resData[0].owner.id === storage.id
      ? setIsOwner(true)
      : setIsOwner(false) 
      setResults(resData)
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
                <Trip key={index} trip={value} isOwner={isOwner}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}