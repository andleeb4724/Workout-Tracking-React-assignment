import React, { useState, useEffect } from "react";

export default function ViewWorkout() {
    const [workouts, setWorkout] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/workouts")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setWorkout(data);
            })
    }, [])
    const deleteWorkouts = (id) => {
        let fileteredWorkouts = workouts.filter((workout) => workout.id != id);
        fetch("http://localhost:4000/workouts/" + id, {
            method: "DELETE",
        })
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setWorkout(fileteredWorkouts);
            })
    }

    const startTime = (id) => {
        fetch("http://localhost:4000/workouts/" + id, {
            method: "PATCH",

            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify({ startTime: new Date() }),
        })
    }

    const endTime = (id, startTime, CBPM) => {
        let endTime = new Date();

        let TotalCBurn = getDifferenceInMinutes(new Date(startTime), endTime, CBPM);

        console.log(TotalCBurn);

        fetch("http://localhost:4000/workouts/" + id, {
            method: 'PATCH',

            headers: {
                "Content-type": "application/json",
            },

            body: JSON.stringify({ endTime, TotalCalories: TotalCBurn }),
        })
    }

    function getDifferenceInMinutes(startTime, endTime, CBPM) {
        const diffInMs = Math.abs((endTime - startTime) * CBPM);

        return diffInMs / (1000 * 60);
    }

    let workoutList = workouts.map((workout) => {
        return (
            <tr key={workout.id}>
                <th scope="row">{workout.id}</th>
                <td>{workout.workout}</td>
                <td>{workout.CBPM}</td>
                <td>{workout.desc}</td>
              

                <td>
                    <button
                        onClick={() => deleteWorkouts(workout.id)}
                        className="btn btn-danger"
                        deleteWorkout
                    >
                        {" "}
                        X{" "}
                    </button>
                </td>

                <td>
                    <button
                        onClick={() => startTime(workout.id)}
                        className="btn btn-primary"
                    >
                        Start
                    </button>
                </td>

                <td>
                    <button
                        onClick={() => endTime(workout.id, workout.startTime, workout.CBPM)}
                        className="btn btn-warning"
                    >
                        Stop
                    </button>
                </td>
                <td>{workout.TotalCalories}</td>
            </tr>
        )
    })

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">WorkOut</th>
                    <th scope="col">CBPM</th>
                    <th scope="col">desc</th>
                    
                    <th scope="col">Action</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Total Calories</th>
                </tr>
            </thead>
            <tbody>{workoutList}</tbody>
        </table>
    );
}
