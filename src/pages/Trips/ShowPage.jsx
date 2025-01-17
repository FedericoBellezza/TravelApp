import { useParams } from "react-router-dom";
import { useTripContext } from "../../context/TripsContext";
import { useEffect, useState } from "react";

export default function ShowPage() {
  const { id } = useParams();
  const { trips, persons } = useTripContext();

  const [personsOnTrip, setPersonsOnTrip] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // find the trip with the id that matches the id from the URL
  const trip = trips.find((trip) => trip.id === parseInt(id));

  // find the persons that are on the trip
  useEffect(() => {
    if (!trip) return;
    setPersonsOnTrip(persons.filter((person) => person.trip_id === trip.id));
  }, [trip, persons]);

  // if the trip is not found, display a message
  if (!trip) {
    return (
      <div className="container">
        <h1>Trip not found</h1>
      </div>
    );
  }

  // modal
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

  const formChange = (e) => {
    setSearchTerm(e.target.value);
    setPersonsOnTrip(
      persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="container">
      <div className="row  m-5">
        <h1 className="col-12 col-md-6">{trip.destination}</h1>
        <form className="d-flex col-12 col-md-6" role="search">
          <input
            onChange={formChange}
            value={searchTerm}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
      <ul>
        {personsOnTrip.map((person) => (
          <button onClick={() => openModal(person)} key={person.id}>
            {person.name}
          </button>
        ))}
      </ul>
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
