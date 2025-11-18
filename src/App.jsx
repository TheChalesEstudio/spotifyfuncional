import React, { useState, useRef, useEffect } from 'react'

function App() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  // Música cristiana real - URLs funcionales
  const musicLibrary = [
    {
      id: 1,
      title: "Piano Cristiano Relajante",
      artist: "Música para Orar",
      image: "https://images.unsplash.com/photo-1511376961623-97e78789e81c?w=400&h=400&fit=crop",
      audio: "https://assets.mixkit.co/music/preview/mixkit-pray-132.mp3",
      duration: "2:15"
    },
    {
      id: 2,
      title: "Alabanza Suave",
      artist: "Adoración Instrumental",
      image: "https://images.unsplash.com/photo-1511379938547-1c1f69419868?w=400&h=400&fit=crop",
      audio: "https://assets.mixkit.co/music/preview/mixkit-spiritual-choir-03-114.mp3",
      duration: "1:54"
    },
    {
      id: 3,
      title: "Coro Celestial",
      artist: "Voces Angelicales",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop",
      audio: "https://assets.mixkit.co/music/preview/mixkit-choir-02-115.mp3",
      duration: "2:17"
    },
    {
      id: 4,
      title: "Meditación Cristiana",
      artist: "Piano de Paz",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
      audio: "https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3",
      duration: "2:30"
    },
    {
      id: 5,
      title: "Himno Tradicional",
      artist: "Órgano Clásico",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
      audio: "https://assets.mixkit.co/music/preview/mixkit-church-organ-115.mp3",
      duration: "2:05"
    },
    {
      id: 6,
      title: "Alabanza Contemporánea",
      artist: "Adoración Moderna",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      audio: "https://assets.mixkit.co/music/preview/mixkit-choir-03-116.mp3",
      duration: "1:48"
    },
    {
      id: 7,
      title: "Piano de Adoración",
      artist: "Momentos con Dios",
      image: "https://images.unsplash.com/photo-1571974599782-87624638275f?w=400&h=400&fit=crop",
      audio: "https://assets.mixkit.co/music/preview/mixkit-piano-01-443.mp3",
      duration: "2:22"
    },
    {
      id: 8,
      title: "Cántico Espiritual",
      artist: "Voces de Fe",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop",
      audio: "https://assets.mixkit.co/music/preview/mixkit-choir-04-117.mp3",
      duration: "2:10"
    }
  ]

  const playTrack = (index) => {
    setCurrentTrack(index)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => {
          console.log("Error al reproducir:", error)
        })
      }
    }
  }

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % musicLibrary.length
    setCurrentTrack(nextIndex)
    setIsPlaying(true)
  }

  const prevTrack = () => {
    const prevIndex = (currentTrack - 1 + musicLibrary.length) % musicLibrary.length
    setCurrentTrack(prevIndex)
    setIsPlaying(true)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.play().catch(error => {
          console.log("Error al reproducir automáticamente:", error)
          setIsPlaying(false)
        })
      } else {
        audio.pause()
      }
    }
  }, [currentTrack, isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100)
        }
      }
      
      const handleEnded = () => {
        nextTrack()
      }
      
      audio.addEventListener('timeupdate', updateProgress)
      audio.addEventListener('ended', handleEnded)
      
      return () => {
        audio.removeEventListener('timeupdate', updateProgress)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="spotify-app">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={musicLibrary[currentTrack]?.audio}
        preload="metadata"
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
          <div className="hero-stats">
            <span>8 canciones • Música para el alma</span>
          </div>
        </div>

        {/* Play Controls */}
        <div className="play-controls">
          <button className="play-large" onClick={togglePlay}>
            <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
          </button>
          <button className="shuffle-button">
            <i className="fas fa-random"></i>
          </button>
        </div>

        {/* Music Grid */}
        <div className="music-grid">
          {musicLibrary.map((song, index) => (
            <div 
              key={song.id} 
              className={`music-card ${currentTrack === index ? 'active' : ''}`} 
              onClick={() => playTrack(index)}
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${song.image})` }}
              >
                <div className="card-overlay">
                  <i className={`fas ${currentTrack === index && isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </div>
              </div>
              <div className="card-content">
                <div className="card-title">{song.title}</div>
                <div className="card-artist">{song.artist}</div>
                <div className="card-duration">{song.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Controls */}
      <div className="player-controls">
        <div className="now-playing">
          <div 
            className="track-image"
            style={{ backgroundImage: `url(${musicLibrary[currentTrack]?.image})` }}
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
            <span className="time">
              {audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}
            </span>
            <div 
              className="progress-track"
              onClick={(e) => {
                if (audioRef.current) {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const percent = (e.clientX - rect.left) / rect.width
                  audioRef.current.currentTime = percent * audioRef.current.duration
                }
              }}
            >
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="time">
              {audioRef.current && !isNaN(audioRef.current.duration) 
                ? formatTime(audioRef.current.duration) 
                : musicLibrary[currentTrack]?.duration}
            </span>
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
