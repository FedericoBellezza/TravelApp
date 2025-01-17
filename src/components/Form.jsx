import { useState } from "react";
import { useTripContext } from "../context/TripsContext";

export default function Form({ value, id }) {
  if (id == "person") {
    const { trips, persons } = useTripContext();

    const { personsOnTrip, setPersonsOnTrip, trip } = value;

    //   create new person
    const [personName, setPersonName] = useState("");
    const [personSurname, setPersonSurname] = useState("");
    const [personCodiceFiscale, setPersonCodiceFiscale] = useState("");
    const [personTel, setPersonTel] = useState("");

    const handleAddPerson = (e) => {
      e.preventDefault();
      if (!personName || !personSurname || !personCodiceFiscale) {
        alert("Tutti i campi devono essere compilati");
        return;
      }
      const newPerson = {
        id: persons.length + 1,
        trip_id: trip.id,
        name: personName,
        surname: personSurname,
        fiscal_code: personCodiceFiscale,
        destinazione: trip.destinazione,
        tel: personTel,
      };

      // add person logic
      persons.push(newPerson);
      setPersonsOnTrip([...personsOnTrip, newPerson]);

      // Reset i campi del form
      setPersonName("");
      setPersonSurname("");
      setPersonCodiceFiscale("");
      setPersonTel("");
    };

    return (
      <>
        {/* add person form */}
        <form className="d-flex gap-3 mb-3" onSubmit={handleAddPerson}>
          <div>
            <label>Nome: </label>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Cognome: </label>
            <input
              type="text"
              value={personSurname}
              onChange={(e) => setPersonSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Codice Fiscale: </label>
            <input
              type="text"
              value={personCodiceFiscale}
              onChange={(e) => setPersonCodiceFiscale(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Telefono: </label>
            <input
              type="text"
              value={personTel}
              onChange={(e) => setPersonTel(e.target.value)}
              required
            />
          </div>
          <button type="submit">Aggiungi Persona</button>
        </form>
      </>
    );
  }
  if (id == "trip") {
    const { trips } = useTripContext();
    const { dinamicTrips, setDinamicTrips } = value;

    //   create new trip
    const [tripDestination, setTripDestination] = useState("");
    const [tripDuration, setTripDuration] = useState("");
    const [tripPrice, setTripPrice] = useState("");

    const handleAddTrip = (e) => {
      e.preventDefault();
      if (!tripDestination || !tripDuration || !tripPrice) {
        alert("Tutti i campi devono essere compilati");
        return;
      }
      const newTrip = {
        id: trips.length + 1,
        destination: tripDestination,
        duration: tripDuration,
        price: tripPrice,
      };

      // add person logic
      trips.push(newTrip);
      setDinamicTrips([...trips, newTrip]);

      // Reset i campi del form
      setTripDestination("");
      setTripDuration("");
      setTripPrice("");
    };

    return (
      <>
        {/* add person form */}
        <form className="d-flex gap-3" onSubmit={handleAddTrip}>
          <div>
            <label>Destinazione: </label>
            <input
              type="text"
              value={tripDestination}
              onChange={(e) => setTripDestination(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Durata: </label>
            <input
              type="text"
              value={tripDuration}
              onChange={(e) => setTripDuration(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Prezzo: </label>
            <input
              type="number"
              value={tripPrice}
              onChange={(e) => setTripPrice(e.target.value)}
              required
            />
          </div>
          <button type="submit">Aggiungi viaggio</button>
        </form>
      </>
    );
  }
}
