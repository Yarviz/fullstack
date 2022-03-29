import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, cb}) => {
  return (
    <div>
      filter person:
        <input
          value={value}
          onChange={cb}
        />
    </div>
  )
}

const DataForm = ({data, onSubmit}) => {
  return (
    <form onSubmit={onSubmit}>
      {data.map(item => {
        return(
          <div key={item.text}>
            {item.text}
            <input
              value={item.value}
              onChange={item.cb}
            />
          </div>
        )
      })}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons}) => {
  const list_persons = persons.map(person =>
    <div key={person.name}>{person.name} {person.phone}</div>
  )
  return(
    <div>{list_persons}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', phone: '' });
  const [filter, setFilter] = useState('');

  const nameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value});
  }

  const phoneChange = (event) => {
    setNewPerson({...newPerson, phone: event.target.value});
  }

  const filterChange = (event) => {
    setFilter(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newPerson.name)) {
      alert(`name ${newPerson.name} already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newPerson));
    setNewPerson({ name: '', phone: '' });
  }

  const filtered_persons = persons.filter(
    person => person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  const person_data = [
    {text: "name:", value: newPerson.name, cb: nameChange},
    {text: "phone:", value: newPerson.phone, cb: phoneChange},
  ]

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log("loaded persons.json");
      setPersons(response.data);
    })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter values={filter} cb={filterChange}/>
      <DataForm data={person_data} onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={filtered_persons}/>
    </div>
  )
}

export default App
