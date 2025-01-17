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
    <div className="container py-5 ">
      <h1>Viaggi</h1>
      <div className="my-5">
        <Form id={"trip"} value={{ setDinamicTrips, dinamicTrips }} />
      </div>

      <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
        {dinamicTrips.map((trip) => (
          <Link to={`/trips/${trip.id}`} key={trip.id}>
            <div class="card">
              <img
                src={trip.img}
                class="card-img-top "
                alt={trip.destination}
              />
              <div class="card-body ">
                <h5 class="card-title fs-5">{trip.destination}</h5>
                <p class="card-text">
                  <strong>{trip.duration} giorni</strong> a {trip.price}€
                </p>
                {/* <Link to={`/trips/${trip.id}`} class="btn btn-primary">
                  Go somewhere
                </Link> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
