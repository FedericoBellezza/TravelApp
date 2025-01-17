import { useContext } from "react";
import { useTripContext } from "../../context/TripsContext";
import { Link } from "react-router-dom";

export default function TripsPage() {
  const { trips } = useTripContext();
  console.log(trips);

  return (
    <div className="container">
      <h1>Trips Page</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <Link to={`/trips/${trip.id}`}>{trip.destination}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
