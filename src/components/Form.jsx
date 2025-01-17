import { useState } from "react";
import { useTripContext } from "../context/TripsContext";

export default function Form({ value, id }) {
  // display form
  const [showForm, setShowForm] = useState(false);

  if (id == "person") {
    const { trips, persons } = useTripContext();

    const { personsOnTrip, setPersonsOnTrip, trip } = value;

    //   create new person
    const [personName, setPersonName] = useState("");
    const [personSurname, setPersonSurname] = useState("");
    const [personCodiceFiscale, setPersonCodiceFiscale] = useState("");
    const [personTel, setPersonTel] = useState("");
    const [personMail, setPersonMail] = useState("");

    const handleAddPerson = (e) => {
      e.preventDefault();
      if (
        !personName ||
        !personSurname ||
        !personCodiceFiscale ||
        !personTel ||
        !personMail
      ) {
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
        email: personMail,
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
      setPersonMail("");
    };

    return (
      <>
        {/* add person form */}
        <form
          className={showForm ? "d-flex gap-3 mt-5" : "d-none"}
          onSubmit={handleAddPerson}
        >
          <div className="row g-3 row-cols-1 row-cols-md-2">
            {/* nome */}
            <div>
              <input
                className="form-control"
                placeholder="Nome"
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                required
              />
            </div>
            {/* cognome */}
            <div>
              <input
                className="form-control"
                placeholder="Cognome"
                type="text"
                value={personSurname}
                onChange={(e) => setPersonSurname(e.target.value)}
                required
              />
            </div>
            {/* codice fiscale */}
            <div>
              <input
                className="form-control"
                placeholder="Codice Fiscale"
                type="text"
                value={personCodiceFiscale}
                onChange={(e) => setPersonCodiceFiscale(e.target.value)}
                required
              />
            </div>
            {/* telefono */}
            <div>
              <input
                className="form-control"
                placeholder="Telefono"
                type="text"
                value={personTel}
                onChange={(e) => setPersonTel(e.target.value)}
                required
              />
            </div>
            {/* email */}
            <div>
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={personMail}
                onChange={(e) => setPersonMail(e.target.value)}
                required
              />
            </div>
            {/* Bottone */}
            <button className="btn btn-primary" type="submit">
              Aggiungi partecipante
            </button>
          </div>
        </form>
        <div className="container-fluid ">
          <button
            onClick={() => setShowForm(true)}
            className={
              !showForm ? "btn btn-primary w-100 row mt-3   g-3" : "d-none"
            }
            type="submit"
          >
            Aggiungi partecipante
          </button>
        </div>
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
    const [tripImage, setTripImage] = useState("");

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
        img: tripImage,
      };

      // add person logic
      trips.push(newTrip);
      setDinamicTrips([...trips]);

      // Reset i campi del form
      setTripDestination("");
      setTripDuration("");
      setTripPrice("");
      setTripImage("");
    };

    return (
      <>
        {/* add person form */}
        <form
          className={showForm ? " row  g-3" : "d-none"}
          onSubmit={handleAddTrip}
        >
          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <input
              className="form-control"
              placeholder="Destinazione"
              type="text"
              value={tripDestination}
              onChange={(e) => setTripDestination(e.target.value)}
              required
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <input
              className="form-control"
              placeholder="Durata in giorni"
              type="number"
              value={tripDuration}
              onChange={(e) => setTripDuration(e.target.value)}
              required
            />
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <input
              className="form-control"
              placeholder="Prezzo"
              type="number"
              value={tripPrice}
              onChange={(e) => setTripPrice(e.target.value)}
              required
            />
          </div>
          <div className="col-12 col-md-6 col-lg-12 col-xl-3 ">
            <input
              className="form-control"
              placeholder="Immagine"
              type="text"
              value={tripImage}
              onChange={(e) => setTripImage(e.target.value)}
              required
            />
          </div>
          <div className="col-12 w-100">
            <button className="btn btn-primary w-100" type="submit">
              Aggiungi viaggio
            </button>
          </div>
        </form>
        <button
          onClick={() => setShowForm(true)}
          className={!showForm ? "btn btn-primary w-100 row  g-3" : "d-none"}
          type="submit"
        >
          Aggiungi viaggio
        </button>
      </>
    );
  }
}
