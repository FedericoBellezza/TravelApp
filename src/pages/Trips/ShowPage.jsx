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

  const filteredPersons = personsOnTrip.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.surname.toLowerCase().includes(searchTerm.toLowerCase())
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
    console.log(person);

    setSelectedPerson(person);
    setIsModalOpen(true);
  };
  const closeModal = (person) => {
    setSelectedPerson(null);
    setIsModalOpen(false);
  };

  // rendering trip details
  return (
    <>
      {/* hero */}
      <div className="hero" style={{ backgroundImage: `url(${trip.img})` }}>
        <div className="container-fluid hero">
          {/* title */}
          <h1 className="col-12 col-md-6">{trip.destination}</h1>

          {/* searchbar */}
          <form className="d-flex col-12 col-md-6" role="search">
            <input
              type="text"
              className="form-control"
              placeholder="Cerca per persona.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* main section */}
      <main className="container">
        <div className="row my-3">
          <Form
            id={"person"}
            value={{ personsOnTrip, setPersonsOnTrip, trip }}
          />
        </div>

        {/* persons list */}
        <table class="table table-hover my-5">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Cognome</th>
              <th scope="col">Telefono</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filteredPersons.map((person) => (
              <tr onClick={() => openModal(person)} key={person.id}>
                <td>{person.name}</td>
                <td>{person.surname}</td>
                <td>{person.tel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && selectedPerson && (
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Dettagli partecipante</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Nome:</strong> {selectedPerson.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedPerson.email}
                  </p>
                  <p>
                    <strong>Telefono:</strong> {selectedPerson.tel}
                  </p>
                  <p>
                    <strong>Codice Fiscale:</strong>{" "}
                    {selectedPerson.fiscal_code}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
