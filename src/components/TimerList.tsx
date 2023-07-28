import type { Timer } from './Timer'

interface TimerList{
  items : Timer[],
  deleteItem : React.MouseEventHandler<HTMLElement>,
  green : Date;
 }

const TimerList = ( props : TimerList ) => {
  const list = props.items;
  const listView = list.map((item, key) => {
    const time = new Date(props.green.getTime() + item.offset*60000*60)
    return (
      <div className='timer' key={key}>
        <span className='timer-title'>{item.title}</span>
        <span className='timer-time'>{time.toLocaleTimeString()}</span>
        <span className='timer-delete' onClick={props.deleteItem} data-id={key}>&#65794;</span>
      </div>
    )
  });
  
  return(
    <div className='timers-list'>{listView}</div>
  )
}

export default TimerList