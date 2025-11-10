import React, { useState, useRef, useEffect } from 'react'

function App() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  // Música cristiana y de piano - URLs reales de audio
  const musicLibrary = [
    {
      id: 1,
      title: "Alabanza de Paz",
      artist: "Música Cristiana Relajante",
      image: "https://images.unsplash.com/photo-1511376961623-97e78789e81c?w=400&h=400&fit=crop",
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      duration: "3:45"
    },
    {
      id: 2,
      title: "Piano en la Montaña",
      artist: "Instrumental Cristiano",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      duration: "4:20"
    },
    {
      id: 3,
      title: "Canto de Alabanza",
      artist: "Coros Celestiales",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop",
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      duration: "5:15"
    },
    {
      id: 4,
      title: "Meditación con Piano",
      artist: "Música para Orar",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      duration: "6:30"
    },
    {
      id: 5,
      title: "Himnos de Fe",
      artist: "Alabanza Tradicional",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      duration: "4:05"
    },
    {
      id: 6,
      title: "Piano en el Atardecer",
      artist: "Momentos de Paz",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      audio: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      duration: "3:55"
    }
  ]

  const playTrack = (index) => {
    setCurrentTrack(index)
    setIsPlaying(true)
    // En un proyecto real, aquí cargarías el audio real
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
      }
    }, 100)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % musicLibrary.length)
    setIsPlaying(true)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + musicLibrary.length) % musicLibrary.length)
    setIsPlaying(true)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100 || 0)
      }
      
      audio.addEventListener('timeupdate', updateProgress)
      return () => audio.removeEventListener('timeupdate', updateProgress)
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="spotify-app">
      {/* Audio Element - Oculto pero funcional */}
      <audio
        ref={audioRef}
        src={musicLibrary[currentTrack]?.audio}
        onEnded={nextTrack}
      />
      
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <i className="fab fa-spotify"></i>
          <span>Alabanzas</span>
        </div>
        
        <div className="nav-links">
          <a href="#" className="nav-link active">
            <i className="fas fa-home"></i>
            <span>Inicio</span>
          </a>
          <a href="#" className="nav-link">
            <i className="fas fa-search"></i>
            <span>Buscar</span>
          </a>
          <a href="#" className="nav-link">
            <i className="fas fa-book"></i>
            <span>Tu Biblioteca</span>
          </a>
        </div>

        <div className="playlist-section">
          <h3>Playlists</h3>
          <a href="#" className="playlist-item">Alabanzas Matutinas</a>
          <a href="#" className="playlist-item">Piano para Orar</a>
          <a href="#" className="playlist-item">Himnos Clásicos</a>
          <a href="#" className="playlist-item">Música de Meditación</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="top-bar">
          <div className="navigation-buttons">
            <button className="nav-button">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="nav-button">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div className="user-menu">
            <div className="user-avatar"></div>
            <span>Usuario</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>

        <div className="hero">
          <div className="hero-badge">PLAYLIST</div>
          <h1 className="hero-title">Alabanzas Cristianas</h1>
          <p className="hero-description">
            Una colección de música cristiana relajante y alabanzas para tu momento de paz y conexión espiritual. Perfecta para meditar, orar y encontrar tranquilidad.
          </p>
        </div>

        {/* Music Grid */}
        <div className="music-grid">
          {musicLibrary.map((song, index) => (
            <div key={song.id} className="music-card" onClick={() => playTrack(index)}>
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${song.image})`, backgroundSize: 'cover' }}
              ></div>
              <div className="card-title">{song.title}</div>
              <div className="card-description">{song.artist}</div>
              <button className="play-button">
                <i className="fas fa-play"></i>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Player Controls */}
      <div className="player-controls">
        <div className="now-playing">
          <div 
            className="track-image"
            style={{ 
              backgroundImage: `url(${musicLibrary[currentTrack]?.image})`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className="track-info">
            <div className="track-name">{musicLibrary[currentTrack]?.title}</div>
            <div className="track-artist">{musicLibrary[currentTrack]?.artist}</div>
          </div>
          <button className="control-button">
            <i className="far fa-heart"></i>
          </button>
        </div>

        <div className="player-center">
          <div className="control-buttons">
            <button className="control-button" onClick={prevTrack}>
              <i className="fas fa-step-backward"></i>
            </button>
            <button className="control-button play-pause" onClick={togglePlay}>
              <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
            </button>
            <button className="control-button" onClick={nextTrack}>
              <i className="fas fa-step-forward"></i>
            </button>
          </div>
          
          <div className="progress-bar">
            <span className="time">0:00</span>
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="time">{musicLibrary[currentTrack]?.duration}</span>
          </div>
        </div>

        <div className="player-right">
          <div className="volume-control">
            <button className="control-button">
              <i className="fas fa-volume-up"></i>
            </button>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
