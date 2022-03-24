import { useState } from 'react'

const ShowAnecdote = ({anecdotes, points, index}) => {
  return(
    <div>
      {anecdotes[index]}<br/>
      has {points[index]} votes<br/>
    </div>
  );
}

const Button = ({text, cb}) => {
  return (
    <button onClick={cb}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([...Array(anecdotes.length)].fill(0))
  const next_anecdote = () => {
    let new_val;
    do {
      new_val = Math.floor(Math.random() * anecdotes.length);
    } while(new_val === selected || anecdotes.length === 1);
    setSelected(new_val);
  }
  const vote = () => {
    let point_cp = [...points];
    point_cp[selected] += 1;
    setPoints(point_cp);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <ShowAnecdote anecdotes={anecdotes} points={points} index={selected} />
      <Button text="vote" cb={vote} />
      <Button text="next anecdote" cb={next_anecdote} />
      <h1>Anecdote with most votes</h1>
      <ShowAnecdote anecdotes={anecdotes} points={points} index={points.indexOf(Math.max(...points))} />
    </div>
  )
}

export default App
