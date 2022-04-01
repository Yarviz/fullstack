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

export default Filter;