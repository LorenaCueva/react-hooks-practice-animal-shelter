import React from "react";

function Pet({pet, onAdoptPet}) {

  function handleAdoptPet(id){
    onAdoptPet(pet.id);
  }

  const {name, gender, age, weight, isAdopted, type} = pet;
  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {/*'♀' OR '♂' */}
          {gender === "female" ? "♀" : "♂"}
        </span>
        <div className="meta">
          <span className="date">{type}</span>
        </div>
        <div className="description">
          <p>Name: {name}</p>
          <p>Age: {age} years</p>
          <p>Weight: {weight} lb</p>
        </div>
      </div>
      <div className="extra content">
        {isAdopted ? 
           <button className="ui disabled button">Already adopted</button>
          : <button className="ui primary button" onClick={handleAdoptPet}>Adopt pet</button>} 
      </div>
    </div>
  );
}

export default Pet;
