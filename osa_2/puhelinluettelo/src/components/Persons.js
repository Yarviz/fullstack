const Persons = ({persons, cb}) => {
    const list_persons = persons.map(person =>
      <div key={person.name}>
        {person.name} {person.number}
        {' '}<button onClick={() => cb(person)}>delete</button>
      </div>
    )
    return(
      <div>{list_persons}</div>
    )
}

export default Persons;