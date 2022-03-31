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

export default DataForm;