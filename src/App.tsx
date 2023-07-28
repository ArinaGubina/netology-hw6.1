import { useState } from 'react'
import './App.css'
import TimerList from './components/TimerList';
import type { Timer } from './components/Timer'

function App() {

  const [time, setTime] = useState((new Date()).toLocaleTimeString());

  setInterval((): void => {
    setTime((new Date()).toLocaleTimeString());
  }, 1000);

  const x = new Date();
  const currentTimeZoneOffsetInMitutes = x.getTimezoneOffset();
  const green = new Date(x.getTime() + currentTimeZoneOffsetInMitutes*60000)

  const [title, setTitle] = useState("")
  const [offset, setOffset] = useState("")
  const [items, setItems] = useState<Timer[]>([]);

  const checkOffset = (event : React.ChangeEvent<HTMLInputElement>) => {
    setOffset(event.target.value.replace(/[^+-\d]+/g,"").replace( /^([^.]*\.)|\./g, '$1' ));
  }

  const setValue = (event : React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const submitForm = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const offsetNum = Number(offset);

    if (typeof(offsetNum) == "number" && title !== "") {
      const newItem = {title : title, offset : offsetNum} as Timer
      items.push(newItem);
      setItems(items);
    } else {
      console.log("Что-то пошло не так: " + offsetNum + " " + title);
    }
  }

  const deleteItem = (event : React.MouseEvent<HTMLElement>) => {
    const element = event.target;
    if (element instanceof Element) { 
      const index = Number(element.getAttribute("data-id"));
      setItems(current => current.filter((item, key) => key != index))    
    }
  }
  
  return (
    <div className='app'>
      <div className='current-time'>Местное время: {time}</div>
      <div className='green-time'>Время по Гринвичу: {green.toLocaleTimeString()}</div>
      <form className='form_new_item' onSubmit={submitForm}>
        <label className='inp_label' >Название <input type="text" className='inp' value={title} onChange={setValue}/></label>
        <label className='inp_label' >Временная зона <input type="text" className='inp' value={offset} onChange={checkOffset}/></label>
        <button className='submit-btn' type='submit'>Добавить</button>
      </form>
      <TimerList items={items} deleteItem={deleteItem} green={green}/>
    </div>
  )
}

export default App
