import { useContext, useEffect, useState } from "react";
import { useTripContext } from "../../context/TripsContext";
import { Link } from "react-router-dom";
import Form from "../../components/Form";

export default function TripsPage() {
  const [dinamicTrips, setDinamicTrips] = useState([]);
  const { trips } = useTripContext();

  useEffect(() => {
    console.log(trips);
    setDinamicTrips(trips);
  }, []);

  return (
    <div className="container">
      <h1>Trips Page</h1>
      <ul>
        {dinamicTrips.map((trip) => (
          <li key={trip.id}>
            <Link to={`/trips/${trip.id}`}>{trip.destination}</Link>
          </li>
        ))}
        <Form id={"trip"} value={{ setDinamicTrips, dinamicTrips }} />
      </ul>
    </div>
  );
}
