import React, { useState } from "react";

export default function Addworkout() {
  const [workout, setworkout] = useState("");
  const [message, setMessage] = useState("");
  const [CBPM, setCBPM] = useState();
  const [desc, setdesc] = useState();
  
  const handleworkoutChange = (e) => {
    console.log("Change event.. ", e.target.value);

    setworkout(e.target.value);
  };

  const Addworkout = () => {
    console.log("Add Workout.. ", workout, CBPM, desc);

    //http post

    fetch("http://localhost:4000/workouts", {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({ workout, CBPM, desc }),
    }).then((res) => {
      console.log(res);
      if (res.status == 201) {
        setMessage("Workout added successfully!");
      }
    });
  };
  return (
    <div>
      {message && (
        <div class="alert alert-success" role="alert">
          {message}
        </div>
      )}

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          workout
        </span>
        <input
          type="text"
          value={workout}
          onChange={handleworkoutChange}
          className="form-control"
          placeholder="Enter workout"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Calories Burn
        </span>

        <input
          type="number"
          value={CBPM}
          onChange={(e) => setCBPM(e.target.value)}
          className="form-control"
          placeholder="Enter calory burn"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Description
        </span>

        <input
          type="text"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
          className="form-control"
          placeholder="Enter description"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mb-3">
        <button onClick={Addworkout} className="btn btn-primary">
          Add Workout
        </button>
      </div>
    </div>
  );
}
