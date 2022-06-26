import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleAdoptPet(id){
    const p = pets.map(pet => pet.id === id ? {...pet, isAdopted: true} : pet);
    setPets(p);

    fetch(`http://localhost:3001/pets/${id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"isAdopted": true})
    })
    .catch(error => console.log(error));
  }

  function handleTypeFilter(filter){
      setFilters({type: filter});
  }

  function handleFindPetsClick(){
    let fetchFor = "";
    filters.type === "all" ? fetchFor = "pets" : fetchFor = `pets?type=${filters.type}`;

    fetch(`http://localhost:3001/${fetchFor}`)
    .then(r => r.json())
    .then(pets=> setPets(pets))
    .catch(error => console.log(error))
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleTypeFilter} onFindPetsClick={handleFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
