const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>{part} {exercise}</p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part part={part.name} exercise={part.exercises}/>
      )}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((prev, part) => prev + part.exercises, 0);
  return (
    <b>Total of {total} exercises</b>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App
