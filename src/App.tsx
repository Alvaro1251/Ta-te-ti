import { useState } from 'react'
import Swal from 'sweetalert2'


const GRID = Array.from(Array(9).keys());
const WINNER_COMPS = [
  // Filas
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columnas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonales
  [0, 4, 8],
  [2, 4, 6]
];

function App() {
  const [player, setPlayer] = useState<'X' | 'O'>('X');

  function handleClick(cell: number){
    if (plays[cell]) return;

    const draft = {...plays, [cell]: player};

    const winner = WINNER_COMPS.find(comp => comp.every(cell => draft[cell] === player))
    
    setPlays(draft);
    
    if(winner) {
      setTimeout(() => {
        Swal.fire({
          title: `Ganador: ${player}`,
          text: "Volvé a jugar!",
          icon: "success"
        });
        setPlays({});
      }, 100);

      return;
    }

    setPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  }

  const [plays, setPlays] = useState<Record<number, 'X' | 'O'>>({});
  return (
    <main>
      {GRID.map((i) => (
        <button key={i} onClick={() => handleClick(i)}>
          {plays[i]}
        </button>
      ))}
    </main>
  );
}

export default App;