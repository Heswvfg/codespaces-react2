import { useState } from 'react';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [input, setInput] = useState({title:'',artist:''});
  const [edit, setEdit] = useState({id:null,title:'',artist:''});

  const add = (e) => {
    e.preventDefault();
    if(input.title && input.artist){
      setSongs([...songs,{id:Date.now(),...input}]);
      setInput({title:'',artist:''});
    }
  };

  const startEdit = (song) => {
    setEdit({id:song.id,title:song.title,artist:song.artist});
  };

  const saveEdit = () => {
    setSongs(songs.map(s=>s.id===edit.id?{...s,...edit}:s));
    setEdit({id:null,title:'',artist:''});
  };

  const remove = (id) => {
    setSongs(songs.filter(s=>s.id!==id));
  };

  return (
    <div className="app">
      <h1>Песни ({songs.length})</h1>
      
      <form onSubmit={add} className="form">
        <input placeholder="Название" value={input.title}
          onChange={e=>setInput({...input,title:e.target.value})}/>
        <input placeholder="Исполнитель" value={input.artist}
          onChange={e=>setInput({...input,artist:e.target.value})}/>
        <button type="submit">+</button>
      </form>

      {songs.map(song=>(
        <div key={song.id} className="song">
          {edit.id===song.id?(
            <div className="edit">
              <input value={edit.title} onChange={e=>setEdit({...edit,title:e.target.value})}/>
              <input value={edit.artist} onChange={e=>setEdit({...edit,artist:e.target.value})}/>
              <button onClick={saveEdit}>✓</button>
              <button onClick={()=>setEdit({id:null,title:'',artist:''})}>✗</button>
            </div>
          ):(
            <>
              <div>
                <div className="title">{song.title}</div>
                <div className="artist">{song.artist}</div>
              </div>
              <div className="buttons">
                <button onClick={()=>startEdit(song)}>Изм</button>
                <button onClick={()=>remove(song.id)}>X</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;