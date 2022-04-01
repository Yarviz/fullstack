import '../styles.css'

const Message = ({message}) => {
  if (!message) return(<></>);
  const style = message.is_error ? 'error' : 'ok';
  return(
    <div className={style}>
      {message.msg}
    </div>
  )
}

export default Message;