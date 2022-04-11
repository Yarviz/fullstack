import { useState, useEffect } from 'react'
import server from './services/persons'
import DataForm from './components/DataForm'
import Persons from './components/Persons'
import Message from './components/Message'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  const nameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value});
  }

  const numberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value});
  }

  const filterChange = (event) => {
    setFilter(event.target.value);
  }

  const setMsg = (msg, is_error) => {
    console.log(msg)
    setMessage({msg, is_error});
    setTimeout(() => setMessage(null), 2000);
  }

  const errorHandler = (error) => {
    console.log(error.response.data)
    setMsg(error.response.data.error, true)
  }

  const addPerson = (event) => {
    event.preventDefault();
    for(const person of persons) {
      if (person.name === newPerson.name) {
        const res = window.confirm(
          `name ${newPerson.name} already added to numberbook, replace the old number with new one?`
        );
        if (!res) return;
        server.update(person.id, newPerson).then(data => {
          const updated = { ...newPerson, id: person.id };
          const new_list = [...persons];
          const index = new_list.map(item => item.id).indexOf(person.id);
          new_list[index] = updated;
          setPersons(new_list);
          setMsg(`${newPerson.name} updated`, false);
          setNewPerson({ name: '', number: '' });
        }).catch(errorHandler);
        return;
      }
    }
    server.create(newPerson).then(data => {
      setPersons(persons.concat(data));
      setMsg(`Added ${newPerson.name} to phonebook`, false);
      setNewPerson({ name: '', number: '' });
      console.log(data);
    }).catch(errorHandler);
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      server.remove(person.id).then(() => {
        setMsg(`${person.name} removed`, false);
        const new_list = [...persons];
        const index = new_list.map(item => item.name).indexOf(person.name);
        new_list.splice(index, 1);
        setPersons(new_list)
      }).catch(() => setMsg(`${person.name} already deleted from server`, true));
    }
  }

  const filtered_persons = persons.filter(
    person => person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  const person_data = [
    {text: "name:", value: newPerson.name, cb: nameChange},
    {text: "number:", value: newPerson.number, cb: numberChange},
  ]

  useEffect(() => {
    server.getAll().then(data => {
      console.log("loaded persons.json");
      console.log(data)
      setPersons(data);
    }).catch(reason => alert(reason));
  }, [])

  return (
    <div>
      <h2>Numberbook</h2>
      <Message message={message}/>
      <Filter values={filter} cb={filterChange}/>
      <DataForm data={person_data} onSubmit={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={filtered_persons} cb={deletePerson}/>
    </div>
  )
}

export default App
