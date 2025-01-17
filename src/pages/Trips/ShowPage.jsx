import { useParams } from "react-router-dom";
import { useTripContext } from "../../context/TripsContext";
import { useEffect, useState } from "react";
import Form from "../../components/Form";

export default function ShowPage() {
  const { id } = useParams();
  const { trips, persons } = useTripContext();

  const [personsOnTrip, setPersonsOnTrip] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // find the trip with the id that matches the id from the URL
  const trip = trips.find((trip) => trip.id === parseInt(id));

  useEffect(() => {
    if (trip) {
      const filtered = persons.filter((person) => person.trip_id === trip.id);
      setPersonsOnTrip(filtered);
    }
  }, [trip, persons]);

  const filteredPersons = personsOnTrip.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if trip is not found
  if (!trip) {
    return (
      <div className="container">
        <h1>Trip not found</h1>
      </div>
    );
  }

  // modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const openModal = (person) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };
  const closeModal = (person) => {
    setSelectedPerson(null);
    setIsModalOpen(false);
  };

  // rendering trip details
  return (
    <div className="container">
      <div className="row  m-5">
        {/* title */}
        <h1 className="col-12 col-md-6">{trip.destination}</h1>

        {/* searchbar */}
        <form className="d-flex col-12 col-md-6" role="search">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a person..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <Form id={"person"} value={{ personsOnTrip, setPersonsOnTrip, trip }} />

      {/* persons list */}
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.id}>
            <button onClick={() => openModal(person)} className="btn btn-link">
              {person.name}
            </button>
          </li>
        ))}
      </ul>

      {/* modal */}
      {isModalOpen && (
        <div>
          <h2>{selectedPerson.name}</h2>
          <p>{selectedPerson.email}</p>
          <p>{selectedPerson.tel}</p>
          <p>{selectedPerson.fiscal_code}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
}
