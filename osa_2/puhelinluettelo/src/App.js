import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123123' }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', phone: '' })

  const nameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value});
  }

  const phoneChange = (event) => {
    setNewPerson({...newPerson, phone: event.target.value});
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            value={newPerson.name}
            onChange={nameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newPerson.phone}
            onChange={phoneChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <list>
        {persons.map(person =>
          <li>{person.name} {person.phone}</li>
        )}
      </list>
    </div>
  )

}

export default App
