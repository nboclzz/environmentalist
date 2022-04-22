import React, {useState, useEffect} from "react";
import axios from "axios";

const dummy_player = {
  username: "user",
  password: "pass",
  health: 100,
  experience: 0,
  gold: 100,
};

const dummy_task = [
  {
    name: "Use reusable grocery bags",
    exp: 50,
    gold: 10,
  },
  {
    name: "Donate unwanted clothes, household items, furniture or appliances",
    exp: 100,
    gold: 20,
  },
];

export default function Main() {
  const [fetching, setFetching] = useState(false);
  const [player, setPlayer] = useState(dummy_player);
  const [tasks, setTasks] = useState([]);
  const increment = (exp, gold) => {
    setPlayer({
      ...player,
      experience: player.experience + exp,
      gold: player.gold + gold,
    });
  };
  useEffect(() => {
    console.log("in");
    async function fetchPlayer() {
      try {
        const res = await axios.get("http://localhost:3000/player");
        setPlayer(res.data);
      } catch (e) {
        console.log(e);
        setPlayer(dummy_player);
      }
      setFetching(false);
    }
    async function fetchTasks() {
      try {
        const res = await axios.get("http://localhost:3000/tasks");
        setTasks(res.data);
      } catch (e) {
        console.log(e);
        setTasks(dummy_task);
      }
      setFetching(false);
    }
    fetchPlayer();
    fetchTasks();
  }, [fetching]);
  return (
    <>
      <h1>Username: {player.username}</h1>
      <h1>Health: {player.health}</h1>
      <h1>Experience: {player.experience}</h1>
      <h1>Gold: {player.gold}</h1>
      {tasks.map((task) => (
        <div>
          <h3>{task.name}</h3>
          <h4>Exp: {task.exp}</h4>
          <h4>Gold: {task.gold}</h4>
          <button
            onClick={() => {
              increment(task.exp, task.gold);
            }}
          >
            Complete
          </button>
        </div>
      ))}
    </>
  );
}
