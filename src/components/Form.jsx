import { useState } from "react";
import { useTripContext } from "../context/TripsContext";

export default function Form({ value, id }) {
  console.log(id);

  const { trips, persons } = useTripContext();

  const { personsOnTrip, setPersonsOnTrip, trip } = value;

  //   create new person
  const [personName, setPersonName] = useState("");
  const [personSurname, setPersonSurname] = useState("");
  const [personCodiceFiscale, setPersonCodiceFiscale] = useState("");

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
      codiceFiscale: personCodiceFiscale,
      destinazione: trip.destinazione,
    };

    // add person logic
    persons.push(newPerson);
    setPersonsOnTrip([...personsOnTrip, newPerson]);

    // Reset i campi del form
    setPersonName("");
    setPersonSurname("");
    setPersonCodiceFiscale("");
  };

  return (
    <>
      {/* add person form */}
      <form onSubmit={handleAddPerson}>
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
        <button type="submit">Aggiungi Persona</button>
      </form>
    </>
  );
}
