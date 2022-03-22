import { useState } from 'react'

const Button = ({value}) => {
  const {text, item, cb} = value
  return (
    <button onClick={() => cb(item + 1)}>{text}</button>
  );
}

const StatisticLine = ({text, value}) => <>{text} {value}<br/></>

const Statistics = ({values}) => {
  const { good, neutral, bad } = values;
  const total = good.item + neutral.item + bad.item;
  if (!total) {
    return (
      <>
        <h1>statistics</h1>
        No feedback given
      </>
    )
  }
  const stat_values = good.item * good.value + neutral.item + neutral.value + bad.item * bad.value;
  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text={good.text} value={good.item}/>
      <StatisticLine text={neutral.text} value={neutral.item}/>
      <StatisticLine text={bad.text} value={bad.item}/>
      <StatisticLine text='all' value={total}/>
      <StatisticLine text='average' value={stat_values / total}/>
      <StatisticLine text='positive' value={good.item / total * 100}/>
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const statistics = {
    good: { text: 'good', item: good, cb: setGood, value: 1 },
    neutral: { text: 'neutral', item: neutral, cb: setNeutral, value: 0 },
    bad: { text: 'bad', item: bad, cb: setBad, value: -1 }
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button value={statistics.good}/>
      <Button value={statistics.neutral}/>
      <Button value={statistics.bad}/>
      <Statistics values={statistics}/>
    </div>
  )
}

export default App
