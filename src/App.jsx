import React, {useState} from 'react';
import { connect, createLocalTracks } from 'twilio-video'
import './App.css';

const connectWithLocalTracks = (token, roomId, callback) => {
  return createLocalTracks({
    audio: true,
    video: { width: 640 }
  }).then(localTracks => {
    return connect(token, {
      name: roomId,
      tracks: localTracks
    });
  }).then(room => callback(room))
  .catch(err => callback(undefined, err));
}

function App() {
  const [token, setToken] = useState();
  const [roomId, setRoomId] = useState();
  const [result, setResult] = useState();
  const [debug, setDebug] = useState();
  const roomIdChange = (event) => {
    setRoomId(event.target.value);
  }
  const tokenChange = (event) => {
    setToken(event.target.value);
  }
  const connectToRoom = () => {
    connectWithLocalTracks(
      token,
      roomId,
      (room, error) => {
        setResult(room);
        setDebug(err);
      }
    );
  }


  return (
    <div>
      <p>twilio test</p>
      <div>
        <input type="text" name="roomId" placeholder="roomId" onBlur={roomIdChange} />
        <input type="text" name="token" placeholder="token" onBlur={tokenChange} />
        <button onClick={connectToRoom}>connect</button>
      </div>
      <ul>
        <li>roomId: {roomId}</li>
        <li>token: {token}</li>
        <li>result: {result && result}</li>
        <li>debug: {debug && debug}</li>
      </ul>
    </div>
  );
}

export default App;