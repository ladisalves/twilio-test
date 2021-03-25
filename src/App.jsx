import React, {useState} from 'react';
import { connect, createLocalTracks } from 'twilio-video'
import './App.css';

const connectWithLocalTracks = async (token, roomId) => {
  return createLocalTracks({
    audio: true,
    video: { width: 640 }
  }).then(localTracks => {
    return connect(token, {
      name: roomId,
      tracks: localTracks
    });
  }).then(room => {
    console.log(room);
    return room;  
  })
  .catch(err => console.log(err));
}

function App() {
  const [token, setToken] = useState();
  const [roomId, setRoomId] = useState();
  const roomIdChange = (event) => {
    setRoomId(event.target.value);
  }
  const tokenChange = (event) => {
    setToken(event.target.value);
  }
  const connectToRoom = async () => {
    const room = await connectWithLocalTracks(
      token,
      roomId
    );
    
    room.on('participantConnected', participant => {
      console.log(`Participant "${participant.identity}" connected`);
    
      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          const track = publication.track;
          document.getElementById('other-video').appendChild(track.attach());
        }
      });
    
      participant.on('trackSubscribed', track => {
        document.getElementById('other-video').appendChild(track.attach());        
      });
    });

    room.participants.forEach(participant => {
      participant.tracks.forEach(publication => {
        if (publication.track) {
          document.getElementById('other-video').appendChild(publication.track.attach());
        }
      });

      participant.on('trackSubscribed', track => {
        document.getElementById('other-video').appendChild(track.attach());
      });
    });

    room.localParticipant.tracks.forEach(publication => {
      if (publication.track) {
        document.getElementById('my-video').appendChild(publication.track.attach());
      }
    });
  }


  return (
    <div>
      <p>twilio test - usage: call getMeeting on graphql gw, take parameters from the response</p>
      <div>
        <input type="text" name="roomId" placeholder="roomId or twilioSid" onBlur={roomIdChange} />
        <input type="text" name="token" placeholder="token" onBlur={tokenChange} />
        <button onClick={connectToRoom}>connect</button>
      </div>
      <ul>
        <li>roomId: {roomId}</li>
        <li>token: {token}</li>
        <li>debug in console</li>
      </ul>
      <div id="my-video">my video</div>
      <div id="other-video">others</div>
    </div>
  );
}

export default App;