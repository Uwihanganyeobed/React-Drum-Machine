// App.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid yellow;
  background-color: #b3b3b3;
  padding: 20px;
`;

const Logo = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: 20px;
`;

const DrumPad = styled.div`
  position: relative;
`;

const Button = styled.div`
  width: 80px;
  height: 80px;
  color: black;
  font-weight: bold;
  text-align: center;
  line-height: 80px;
  background-color: ${(props) => (props.active ? '#ce9613' : 'grey')};
  box-shadow: ${(props) =>
    props.active ? '0 0 10px #ce9613' : '0 4px 8px rgba(0, 0, 0, 0.2)'};
  border-radius: 3px;
  cursor: pointer;
`;

const ControlContainer = styled.div`
  margin-top: 20px;
`;

const PowerButton = styled.button`
  background-color: ${(props) => (props.active ? '#3498db' : '#dd1ec7')};
  color: black;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const VolumeControl = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;

const BankButton = styled.button`
  background-color: ${(props) => (props.active ? '#2ecc71' : '#95a5a6')};
  color: white;
  padding: 10px;
  cursor: pointer;
`;

const Paragraph = styled.p`
  margin-top: 10px;
`;

const defaultButtonText = 'Closed HH';

const audioClips = {
  Q: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    description: 'Crash Cymbal',
  },
  W: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    description: 'Hi-Hat',
  },
  E: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    description: 'Snare Drum',
  },
  A: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    description: 'Bass Drum',
  },
  S: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    description: 'Tom 1',
  },
  D: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    description: 'Tom 2',
  },
  Z: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    description: 'Tom 3',
  },
  X: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    description: 'Ride Cymbal',
  },
  C: {
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    description: 'Crash Cymbal 2',
  },
};

const App = () => {
  const [powerActive, setPowerActive] = useState(false);
  const [bankActive, setBankActive] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();
      if (audioClips[key]) {
        triggerAudio(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handlePowerButtonClick = () => {
    setPowerActive(!powerActive);
    if (!powerActive) {
      stopAllAudio();
    }
  };

  const handleBankButtonClick = () => {
    setBankActive(!bankActive);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    updateAllAudioVolume(event.target.value / 100);
  };
  const triggerAudio = (key) => {
    const audioElement = document.getElementById(key);
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play();
      setActiveButton(key);
      setTimeout(() => setActiveButton(null), 100);
    }
  };

  const stopAllAudio = () => {
    Object.keys(audioClips).forEach((key) => {
      const audioElement = document.getElementById(key);
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    });
  };

  const updateAllAudioVolume = (volume) => {
    Object.keys(audioClips).forEach((key) => {
      const audioElement = document.getElementById(key);
      if (audioElement) {
        audioElement.volume = volume;
      }
    });
  };

  return (
    <MainContainer>
      <Logo>FCC@</Logo>
      <ButtonContainer>
        {Object.keys(audioClips).map((key) => (
          <DrumPad key={key}>
            <Button active={activeButton === key} onClick={() => triggerAudio(key)}>
              {key}
              <audio id={key} className="clip" src={audioClips[key].src}></audio>
            </Button>
          </DrumPad>
        ))}
      </ButtonContainer>
      <ControlContainer>
        <PowerButton active={powerActive} onClick={handlePowerButtonClick}>
          Power
        </PowerButton>
        <VolumeControl
          type="range"
          value={volume}
          onChange={handleVolumeChange}
        />
        <BankButton active={bankActive} onClick={handleBankButtonClick}>
          Bank
        </BankButton>
        <Paragraph>{activeButton ? `Updated: ${audioClips[activeButton].description}` : defaultButtonText}</Paragraph>
      </ControlContainer>
    </MainContainer>
  );
};

export default App;
