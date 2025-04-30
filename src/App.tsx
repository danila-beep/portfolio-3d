import Spline, { SplineEvent } from '@splinetool/react-spline'
import './App.css'
import { useEffect, useState } from 'react';
import { Application } from '@splinetool/runtime';

function App() {
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [inputSceneValue, setInputSceneValue] = useState('Value: ');

  function handleLoad(spline: Application) {
    console.log(spline)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('Key pressed:', event.key, 'isInputClicked:', isInputClicked);
      if (isInputClicked) {
        console.log("Processing input event:", event);
        if (event.key === 'Backspace') {
          setInputSceneValue(prev => {
            console.log('Backspace pressed, new value will be:', prev.slice(0, -1));
            return prev.slice(0, -1);
          });
        } else if (event.key === 'Enter') {
          console.log('Enter pressed, deactivating input');
          setIsInputClicked(false);
        } else if (event.key.length === 1) {
          setInputSceneValue(prev => {
            console.log('Adding character, new value will be:', prev + event.key);
            return prev + event.key;
          });
        }
      }
    };

    // Добавляем глобальный слушатель событий клавиатуры
    window.addEventListener('keydown', handleKeyDown);

    // Очищаем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInputClicked]); // Зависимость от isInputClicked

  function handleClick(event: SplineEvent) {
    if (event.target.name === 'Input') {
      console.log('Input clicked, setting isInputClicked to true');
      setIsInputClicked(true);
      console.log('Current inputSceneValue:', inputSceneValue);
    } else {
      console.log('Clicked outside Input, setting isInputClicked to false');
      setIsInputClicked(false);
    }
  }

  useEffect(() => {
    console.log('isInputClicked changed to:', isInputClicked);
  }, [isInputClicked]);

  useEffect(() => {
    console.log('Input value:', inputSceneValue);
  }, [inputSceneValue]);

  // 0e2a8223-c8a1-4e76-9621-73de1efa4da7

  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: "50px",
          right: "50px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "white",
          zIndex: 1000,
          backgroundColor: "black",
          padding: "10px",
          borderRadius: "5px",
        }}
      >{inputSceneValue}</div>
      <Spline
        style={{ minHeight: '100vh' }}
        scene="scene.splinecode"
        onLoad={handleLoad}
        onSplineMouseDown={handleClick}
      />
    </>
  )
}

export default App
