const Course = ({course}) => {
    return(
        <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )
}

const Header = ({name}) => {
    return (
        <h2>{name}</h2>
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

const Part = ({part, exercise}) => {
    return (
        <p>{part} {exercise}</p>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((prev, part) => prev + part.exercises, 0);
    return (
        <b>Total of {total} exercises</b>
    )
}

export default Course