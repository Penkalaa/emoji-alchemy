// Game data from the provided levels
const GAME_DATA = {
   levels: [
      {
         level: 1,
         inputs: ["🔥", "💧"],
         result: "💨",
         names: {a: "fire", b: "water", result: "steam"},
      },
      {
         level: 2,
         inputs: ["🌞", "🌧️"],
         result: "🌈",
         names: {a: "sun", b: "rain cloud", result: "rainbow"},
      },
      {
         level: 3,
         inputs: ["❄️", "💧"],
         result: "🧊",
         names: {a: "snow", b: "water", result: "ice"},
      },
      {
         level: 4,
         inputs: ["🌱", "🌞"],
         result: "🌻",
         names: {a: "seedling", b: "sun", result: "sunflower"},
      },
      {
         level: 5,
         inputs: ["🌱", "💧"],
         result: "🌿",
         names: {a: "seedling", b: "water", result: "herb"},
      },
      {
         level: 6,
         inputs: ["🪨", "🔥"],
         result: "🌋",
         names: {a: "rock", b: "fire", result: "volcano"},
      },
      {
         level: 7,
         inputs: ["🌽", "🔥"],
         result: "🍿",
         names: {a: "corn", b: "fire", result: "popcorn"},
      },
      {
         level: 8,
         inputs: ["🥚", "🔥"],
         result: "🍳",
         names: {a: "egg", b: "fire", result: "fried egg"},
      },
      {
         level: 9,
         inputs: ["🫘", "🔥"],
         result: "☕️",
         names: {a: "beans", b: "fire", result: "coffee"},
      },
      {
         level: 10,
         inputs: ["🌾", "🔥"],
         result: "🍞",
         names: {a: "grain", b: "fire", result: "bread"},
      },
      {
         level: 11,
         inputs: ["🔥", "💧", "🌬️"],
         result: "🌪️",
         names: {a: "fire", b: "water", c: "wind", result: "tornado"},
      },
      {
         level: 12,
         inputs: ["🌞", "💧", "🌱"],
         result: "🌴",
         names: {a: "sun", b: "water", c: "seedling", result: "tree"},
      },
      {
         level: 13,
         inputs: ["🪨", "🔥", "💧"],
         result: "🌍",
         names: {a: "rock", b: "fire", c: "water", result: "earth/planet"},
      },
      {
         level: 14,
         inputs: ["🍇", "⏳", "🍶"],
         result: "🍷",
         names: {a: "grapes", b: "time", c: "jar", result: "wine"},
      },
      {
         level: 15,
         inputs: ["🥔", "🔥", "🧂"],
         result: "🍟",
         names: {a: "potato", b: "fire", c: "salt", result: "french fries"},
      },
      {
         level: 16,
         inputs: ["🍫", "🥛", "❄️"],
         result: "🍦",
         names: {a: "chocolate", b: "milk", c: "snow", result: "ice cream"},
      },
      {
         level: 17,
         inputs: ["🥩", "🔥", "🍞"],
         result: "🍔",
         names: {a: "meat", b: "fire", c: "bread", result: "burger"},
      },
      {
         level: 18,
         inputs: ["🍅", "🧄", "🍝"],
         result: "🍲",
         names: {a: "tomato", b: "garlic", c: "pasta", result: "pasta dish"},
      },
      {
         level: 19,
         inputs: ["🪵", "🔥", "🏕️"],
         result: "🔥🔥",
         names: {a: "wood", b: "fire", c: "camp", result: "campfire"},
      },
      {
         level: 20,
         inputs: ["🚗", "⛽", "🛣️"],
         result: "🏎️",
         names: {a: "car", b: "fuel", c: "road", result: "race car"},
      },
      // New levels 21-50
      {
         level: 21,
         inputs: ["🌙", "⭐"],
         result: "🌌",
         names: {a: "moon", b: "star", result: "milky way"},
      },
      {
         level: 22,
         inputs: ["🐝", "🌸"],
         result: "🍯",
         names: {a: "bee", b: "flower", result: "honey"},
      },
      {
         level: 23,
         inputs: ["🧊", "🥤"],
         result: "🥶",
         names: {a: "ice", b: "drink", result: "cold face"},
      },
      {
         level: 24,
         inputs: ["🎵", "👂"],
         result: "🎧",
         names: {a: "music", b: "ear", result: "headphones"},
      },
      {
         level: 25,
         inputs: ["🌊", "🏄"],
         result: "🏖️",
         names: {a: "wave", b: "surfer", result: "beach"},
      },
      {
         level: 26,
         inputs: ["🔋", "📱"],
         result: "🔌",
         names: {a: "battery", b: "phone", result: "charger"},
      },
      {
         level: 27,
         inputs: ["🎨", "🖌️"],
         result: "🖼️",
         names: {a: "palette", b: "brush", result: "painting"},
      },
      {
         level: 28,
         inputs: ["🌡️", "🔥"],
         result: "🥵",
         names: {a: "thermometer", b: "fire", result: "hot face"},
      },
      {
         level: 29,
         inputs: ["🍇", "🍞"],
         result: "🥪",
         names: {a: "grapes", b: "bread", result: "sandwich"},
      },
      {
         level: 30,
         inputs: ["⚡", "🌩️"],
         result: "⛈️",
         names: {a: "lightning", b: "storm", result: "thunderstorm"},
      },
      {
         level: 31,
         inputs: ["🎯", "🏹"],
         result: "🎪",
         names: {a: "target", b: "bow", result: "circus"},
      },
      {
         level: 32,
         inputs: ["🌰", "🐿️"],
         result: "🌳",
         names: {a: "nut", b: "squirrel", result: "tree"},
      },
      {
         level: 33,
         inputs: ["🔍", "🕵️"],
         result: "🔎",
         names: {a: "magnifying glass", b: "detective", result: "search"},
      },
      {
         level: 34,
         inputs: ["🎪", "🤡"],
         result: "🎭",
         names: {a: "circus", b: "clown", result: "theater"},
      },
      {
         level: 35,
         inputs: ["🌮", "🌶️"],
         result: "🔥",
         names: {a: "taco", b: "pepper", result: "fire"},
      },
      {
         level: 36,
         inputs: ["🧲", "🔩"],
         result: "⚙️",
         names: {a: "magnet", b: "bolt", result: "gear"},
      },
      {
         level: 37,
         inputs: ["🎸", "🎤"],
         result: "🎵",
         names: {a: "guitar", b: "microphone", result: "music"},
      },
      {
         level: 38,
         inputs: ["🌙", "🌟", "☁️"],
         result: "🌃",
         names: {a: "moon", b: "star", c: "cloud", result: "night city"},
      },
      {
         level: 39,
         inputs: ["🏔️", "❄️"],
         result: "⛷️",
         names: {a: "mountain", b: "snow", result: "skiing"},
      },
      {
         level: 40,
         inputs: ["🐟", "🎣"],
         result: "🍣",
         names: {a: "fish", b: "fishing", result: "sushi"},
      },
      {
         level: 41,
         inputs: ["💎", "💍"],
         result: "👑",
         names: {a: "diamond", b: "ring", result: "crown"},
      },
      {
         level: 42,
         inputs: ["🌺", "🦋"],
         result: "🌷",
         names: {a: "hibiscus", b: "butterfly", result: "tulip"},
      },
      {
         level: 43,
         inputs: ["🎲", "🃏"],
         result: "🎰",
         names: {a: "dice", b: "joker", result: "slot machine"},
      },
      {
         level: 44,
         inputs: ["🚀", "🌌"],
         result: "👨‍🚀",
         names: {a: "rocket", b: "galaxy", result: "astronaut"},
      },
      {
         level: 45,
         inputs: ["🍄", "🧚"],
         result: "🏰",
         names: {a: "mushroom", b: "fairy", result: "castle"},
      },
      {
         level: 46,
         inputs: ["⚽", "🥅"],
         result: "🏆",
         names: {a: "soccer ball", b: "goal", result: "trophy"},
      },
      {
         level: 47,
         inputs: ["🌊", "🐚"],
         result: "🧜‍♀️",
         names: {a: "wave", b: "shell", result: "mermaid"},
      },
      {
         level: 48,
         inputs: ["🔮", "🎭", "✨"],
         result: "🧙‍♂️",
         names: {a: "crystal ball", b: "theater", c: "sparkles", result: "wizard"},
      },
      {
         level: 49,
         inputs: ["🌈", "🦄"],
         result: "✨",
         names: {a: "rainbow", b: "unicorn", result: "sparkles"},
      },
      {
         level: 50,
         inputs: ["👑", "🏰", "🗡️"],
         result: "🛡️",
         names: {a: "crown", b: "castle", c: "sword", result: "shield"},
      },
   ],
}

// Sound Manager
class SoundManager {
   constructor() {
      this.sounds = {}
      this.enabled = true
      this.volume = 0.5
   }
   
   // Create simple beep sounds using Web Audio API
   createBeep(frequency, duration, type = 'sine') {
      if (!this.enabled) return
      
      try {
         const audioContext = new (window.AudioContext || window.webkitAudioContext)()
         const oscillator = audioContext.createOscillator()
         const gainNode = audioContext.createGain()
         
         oscillator.connect(gainNode)
         gainNode.connect(audioContext.destination)
         
         oscillator.frequency.value = frequency
         oscillator.type = type
         
         gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime)
         gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
         
         oscillator.start(audioContext.currentTime)
         oscillator.stop(audioContext.currentTime + duration)
      } catch (error) {
         console.warn('Sound not supported:', error)
      }
   }
   
   playCorrect() {
      // Happy ascending notes
      this.createBeep(523, 0.1) // C5
      setTimeout(() => this.createBeep(659, 0.1), 100) // E5
      setTimeout(() => this.createBeep(784, 0.2), 200) // G5
   }
   
   playWrong() {
      // Sad descending notes
      this.createBeep(400, 0.3, 'sawtooth')
   }
   
   playClick() {
      this.createBeep(800, 0.05)
   }
   
   playLevelComplete() {
      // Victory fanfare
      const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
      notes.forEach((note, i) => {
         setTimeout(() => this.createBeep(note, 0.15), i * 100)
      })
   }
   
   setEnabled(enabled) {
      this.enabled = enabled
   }
   
   setVolume(volume) {
      this.volume = Math.max(0, Math.min(1, volume))
   }
}

// Haptic Feedback Manager
class HapticManager {
   constructor() {
      this.enabled = true
   }
   
   vibrate(pattern) {
      if (!this.enabled || !navigator.vibrate) return
      
      try {
         navigator.vibrate(pattern)
      } catch (error) {
         console.warn('Vibration not supported:', error)
      }
   }
   
   light() {
      this.vibrate(50) // Short vibration
   }
   
   medium() {
      this.vibrate(100) // Medium vibration
   }
   
   heavy() {
      this.vibrate([100, 50, 100]) // Pattern vibration
   }
   
   success() {
      this.vibrate([50, 50, 50, 50, 100]) // Success pattern
   }
   
   error() {
      this.vibrate([200, 100, 200]) // Error pattern
   }
   
   setEnabled(enabled) {
      this.enabled = enabled
   }
}

// Game Data Manager
class GameDataManager {
   static STORAGE_KEY = 'emojiAlchemy_gameData'
   
   static saveGameData(data) {
      try {
         localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data))
      } catch (error) {
         console.error('Failed to save game data:', error)
      }
   }
   
   static loadGameData() {
      try {
         const data = localStorage.getItem(this.STORAGE_KEY)
         return data ? JSON.parse(data) : null
      } catch (error) {
         console.error('Failed to load game data:', error)
         return null
      }
   }
   
   static getDefaultData() {
      return {
         currentLevel: 0,
         highScore: 0,
         totalScore: 0,
         unlockedLevels: 1,
         completedLevels: [],
         settings: {
            soundEnabled: true,
            musicEnabled: true,
            vibrationEnabled: true
         },
         statistics: {
            gamesPlayed: 0,
            totalPlayTime: 0,
            averageScore: 0
         }
      }
   }
}

class EmojiAlchemyGame {
   constructor() {
      // Load saved data or use defaults
      this.gameData = GameDataManager.loadGameData() || GameDataManager.getDefaultData()
      
      this.currentLevel = this.gameData.currentLevel
      this.score = this.gameData.totalScore
      this.app = null
      this.inputEmojis = []
      this.answerOptions = []
      this.correctAnswer = null
      this.levelCompleted = false
      
      // Initialize sound and haptic managers
      this.soundManager = new SoundManager()
      this.soundManager.setEnabled(this.gameData.settings.soundEnabled)
      
      this.hapticManager = new HapticManager()
      this.hapticManager.setEnabled(this.gameData.settings.vibrationEnabled)
      
      // Prevent duplicate setup
      this.keyboardSetup = false
      
      // Game session tracking
      this.sessionStartTime = Date.now()

      this.init()
   }

   async init() {
      try {
         // Get device pixel ratio for high-DPI screens
         const pixelRatio = window.devicePixelRatio || 1
         
         // Use fixed dimensions to prevent loops
         const gameWidth = 400
         const gameHeight = 700
         
         // Check if canvas element exists
         const canvas = document.getElementById("gameCanvas")
         if (!canvas) {
            throw new Error("Game canvas element not found")
         }
         
         // Create high-resolution canvas
         this.app = new PIXI.Application({
            width: gameWidth,
            height: gameHeight,
            backgroundColor: 0x1a1a2e,
            view: canvas,
            antialias: true,
            resolution: pixelRatio,
            autoDensity: true,
            resizeTo: canvas, // Auto-resize to canvas
         })

         // Store dimensions for positioning
         this.gameWidth = gameWidth
         this.gameHeight = gameHeight
         this.pixelRatio = pixelRatio

         this.app.stage.eventMode = "static"
         this.app.stage.hitArea = new PIXI.Rectangle(0, 0, gameWidth, gameHeight)

         // Add global click debug
         this.app.stage.on('pointerdown', (event) => {
            console.log('Global click at:', event.global.x, event.global.y)
            console.log('Local click at:', event.data.global.x, event.data.global.y)
            console.log('Canvas dimensions:', canvas.clientWidth, 'x', canvas.clientHeight)
            console.log('Canvas actual size:', canvas.width, 'x', canvas.height)
            console.log('Game dimensions:', this.gameWidth, 'x', this.gameHeight)
         })

         // Setup responsive handling
         this.setupResponsiveHandling()
         
         this.setupKeyboardShortcuts()
         this.setupGame()
         this.loadLevel(this.currentLevel)
         
         console.log("Game initialized successfully")
      } catch (error) {
         console.error("Game initialization failed:", error)
         this.showErrorMessage("Game failed to load. Please refresh the page.")
      }
   }

   setupResponsiveHandling() {
      const resizeHandler = () => {
         const canvas = this.app.view
         const container = canvas.parentElement
         
         if (!container) return
         
         // Get container dimensions
         const containerWidth = container.clientWidth
         const containerHeight = container.clientHeight
         
         // Calculate scale to fit while maintaining aspect ratio
         const scaleX = containerWidth / this.gameWidth
         const scaleY = containerHeight / this.gameHeight
         const scale = Math.min(scaleX, scaleY)
         
         // Apply scale
         const newWidth = this.gameWidth * scale
         const newHeight = this.gameHeight * scale
         
         // Update canvas style
         canvas.style.width = newWidth + 'px'
         canvas.style.height = newHeight + 'px'
         
         // Center the canvas
         canvas.style.marginLeft = ((containerWidth - newWidth) / 2) + 'px'
         canvas.style.marginTop = ((containerHeight - newHeight) / 2) + 'px'
         
         console.log(`Responsive resize: ${newWidth}x${newHeight}, scale: ${scale}`)
      }
      
      // Initial resize
      resizeHandler()
      
      // Listen for window resize
      window.addEventListener('resize', resizeHandler)
      window.addEventListener('orientationchange', () => {
         setTimeout(resizeHandler, 100) // Delay for orientation change
      })
   }

   setupKeyboardShortcuts() {
      // Prevent duplicate listeners
      if (this.keyboardSetup) return
      this.keyboardSetup = true
      
      document.addEventListener('keydown', (event) => {
         // Number keys 1-9 for levels 1-9
         if (!event.shiftKey && event.key >= '1' && event.key <= '9') {
            const targetLevel = parseInt(event.key) - 1
            if (targetLevel < GAME_DATA.levels.length) {
               this.jumpToLevel(targetLevel)
            }
         }
         // Key 0 for level 10
         else if (!event.shiftKey && event.key === '0') {
            const targetLevel = 9
            if (targetLevel < GAME_DATA.levels.length) {
               this.jumpToLevel(targetLevel)
            }
         }
         // Shift + keys for levels 11-20
         else if (event.shiftKey && event.key >= '1' && event.key <= '9') {
            const targetLevel = parseInt(event.key) + 9
            if (targetLevel < GAME_DATA.levels.length) {
               this.jumpToLevel(targetLevel)
            }
         }
         else if (event.shiftKey && event.key === '0') {
            const targetLevel = 19
            if (targetLevel < GAME_DATA.levels.length) {
               this.jumpToLevel(targetLevel)
            }
         }
         // Ctrl + keys for levels 21-30
         else if (event.ctrlKey && event.key >= '1' && event.key <= '9') {
            const targetLevel = parseInt(event.key) + 19
            if (targetLevel < GAME_DATA.levels.length) {
               this.jumpToLevel(targetLevel)
            }
         }
         else if (event.ctrlKey && event.key === '0') {
            const targetLevel = 29
            if (targetLevel < GAME_DATA.levels.length) {
               this.jumpToLevel(targetLevel)
            }
         }
         // Alt + keys for levels 31-40
         else if (event.altKey && event.key >= '1' && event.key <= '9') {
            const targetLevel = parseInt(event.key) + 29
            if (targetLevel < GAME_DATA.levels.length) {
               this.jumpToLevel(targetLevel)
            }
         }
         else if (event.altKey && event.key === '0') {
            const targetLevel = 39
            if (targetLevel < GAME_DATA.levels.length) {
               this.jumpToLevel(targetLevel)
            }
         }
         // Arrow keys
         else if (event.key === 'ArrowLeft') {
            this.previousLevel()
         }
         else if (event.key === 'ArrowRight') {
            this.nextLevel()
         }
         // R key to restart
         else if (event.key.toLowerCase() === 'r') {
            this.restartCurrentLevel()
         }
      })
   }

   jumpToLevel(levelIndex) {
      if (levelIndex >= 0 && levelIndex < GAME_DATA.levels.length) {
         this.currentLevel = levelIndex
         this.loadLevel(this.currentLevel)
         this.showQuickFeedback(`Level ${levelIndex + 1}`, 0x3498db)
      }
   }

   previousLevel() {
      if (this.currentLevel > 0) {
         this.currentLevel--
         this.loadLevel(this.currentLevel)
         this.showQuickFeedback(`Level ${this.currentLevel + 1}`, 0x9b59b6)
      }
   }

   nextLevel() {
      if (this.currentLevel < GAME_DATA.levels.length - 1) {
         this.currentLevel++
         this.loadLevel(this.currentLevel)
         this.showQuickFeedback(`Level ${this.currentLevel + 1}`, 0x9b59b6)
      }
   }

   restartCurrentLevel() {
      this.loadLevel(this.currentLevel)
      this.showQuickFeedback(`Restarted`, 0xe67e22)
   }

   showQuickFeedback(message, color) {
      try {
         if (this.quickFeedback && this.app && this.app.stage) {
            this.app.stage.removeChild(this.quickFeedback)
         }

         if (!this.app || !this.app.stage) return

         this.quickFeedback = new PIXI.Text(message, {
            fontFamily: "Arial",
            fontSize: 16,
            fill: color,
            align: "center",
         })
         this.quickFeedback.anchor.set(0.5)
         this.quickFeedback.x = this.gameWidth / 2
         this.quickFeedback.y = 20
         this.app.stage.addChild(this.quickFeedback)

         setTimeout(() => {
            if (this.quickFeedback && this.app && this.app.stage) {
               this.app.stage.removeChild(this.quickFeedback)
               this.quickFeedback = null
            }
         }, 1500)
      } catch (error) {
         console.error("Error showing quick feedback:", error)
      }
   }

   showErrorMessage(message) {
      // Show error in DOM if PIXI fails
      const errorDiv = document.createElement('div')
      errorDiv.style.cssText = `
         position: fixed;
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         background: #e74c3c;
         color: white;
         padding: 20px;
         border-radius: 10px;
         font-family: Arial, sans-serif;
         text-align: center;
         z-index: 9999;
         max-width: 300px;
      `
      errorDiv.textContent = message
      document.body.appendChild(errorDiv)
      
      setTimeout(() => {
         if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv)
         }
      }, 5000)
   }

   setupGame() {
      try {
         // Background
         const background = new PIXI.Graphics()
         background.beginFill(0x16213e)
         background.drawRoundedRect(0, 0, this.gameWidth, this.gameHeight, 20)
         background.endFill()
         this.app.stage.addChild(background)

         // Title
         const titleText = new PIXI.Text("Emoji Alchemy", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0xf1c40f,
            align: "center",
         })
         titleText.anchor.set(0.5)
         titleText.x = this.gameWidth / 2
         titleText.y = 50
         this.app.stage.addChild(titleText)

         // Score and High Score
         this.scoreText = new PIXI.Text(`Score: ${this.score}`, {
            fontFamily: "Arial",
            fontSize: 18,
            fill: 0xf1c40f,
            align: "left",
         })
         this.scoreText.x = 20
         this.scoreText.y = 80
         this.app.stage.addChild(this.scoreText)
         
         // High Score
         this.highScoreText = new PIXI.Text(`Best: ${this.gameData.highScore}`, {
            fontFamily: "Arial",
            fontSize: 16,
            fill: 0x27ae60,
            align: "right",
         })
         this.highScoreText.x = this.gameWidth - 20
         this.highScoreText.y = 80
         this.highScoreText.anchor.x = 1
         this.app.stage.addChild(this.highScoreText)
         
      } catch (error) {
         console.error('Error setting up game:', error)
         this.showErrorMessage('Failed to setup game interface')
      }
   }
   
   showLoadingState(message = "Loading...") {
      if (this.loadingContainer) {
         this.app.stage.removeChild(this.loadingContainer)
      }
      
      this.loadingContainer = new PIXI.Container()
      
      // Semi-transparent overlay
      const overlay = new PIXI.Graphics()
      overlay.beginFill(0x000000, 0.7)
      overlay.drawRect(0, 0, this.gameWidth, this.gameHeight)
      overlay.endFill()
      
      // Loading text
      const loadingText = new PIXI.Text(message, {
         fontFamily: "Arial",
         fontSize: 20,
         fill: 0xffffff,
         align: "center",
      })
      loadingText.anchor.set(0.5)
      loadingText.x = this.gameWidth / 2
      loadingText.y = this.gameHeight / 2
      
      // Spinning loader
      const loader = new PIXI.Graphics()
      loader.lineStyle(4, 0x3498db)
      loader.arc(0, 0, 20, 0, Math.PI * 1.5)
      loader.x = this.gameWidth / 2
      loader.y = this.gameHeight / 2 - 50
      
      this.loadingContainer.addChild(overlay)
      this.loadingContainer.addChild(loadingText)
      this.loadingContainer.addChild(loader)
      this.app.stage.addChild(this.loadingContainer)
      
      // Animate loader
      const animate = () => {
         if (this.loadingContainer && this.loadingContainer.parent) {
            loader.rotation += 0.1
            requestAnimationFrame(animate)
         }
      }
      animate()
   }
   
   hideLoadingState() {
      if (this.loadingContainer && this.app.stage) {
         this.app.stage.removeChild(this.loadingContainer)
         this.loadingContainer = null
      }
   }

   loadLevel(levelIndex) {
      if (levelIndex >= GAME_DATA.levels.length) {
         this.showGameComplete()
         return
      }

      const level = GAME_DATA.levels[levelIndex]
      this.levelCompleted = false
      this.correctAnswer = level.result

      // Update level display
      const levelDisplay = document.getElementById("levelDisplay")
      if (levelDisplay) {
         levelDisplay.textContent = `Level ${level.level}`
         
         // Debug: Log level display position
         const rect = levelDisplay.getBoundingClientRect()
         console.log(`Level display position: top=${rect.top}, left=${rect.left}`)
         console.log(`Viewport height: ${window.innerHeight}`)
         console.log(`Safe area inset top: ${getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)')}`)
      }

      // Clear previous elements
      this.clearLevelElements()

      // Show level content
      this.showLevelContent(level)
   }

   clearLevelElements() {
      try {
         // Clean up input emojis
         if (this.inputEmojis) {
            this.inputEmojis.forEach(sprite => {
               if (sprite && sprite.parent) {
                  sprite.parent.removeChild(sprite)
                  // Destroy PIXI objects to free memory
                  if (sprite.destroy) sprite.destroy()
               }
            })
            this.inputEmojis = []
         }
         
         // Clean up answer options
         if (this.answerOptions) {
            this.answerOptions.forEach(option => {
               if (option && option.parent) {
                  option.parent.removeChild(option)
                  if (option.destroy) option.destroy()
               }
            })
            this.answerOptions = []
         }
         
         // Clean up feedback text
         if (this.feedbackText) {
            if (this.feedbackText.parent) {
               this.feedbackText.parent.removeChild(this.feedbackText)
            }
            if (this.feedbackText.destroy) this.feedbackText.destroy()
            this.feedbackText = null
         }
         
         // Clean up next button
         if (this.nextButton) {
            if (this.nextButton.parent) {
               this.nextButton.parent.removeChild(this.nextButton)
            }
            if (this.nextButton.destroy) this.nextButton.destroy()
            this.nextButton = null
         }
         
         // Force garbage collection hint
         if (window.gc) window.gc()
         
      } catch (error) {
         console.error('Error clearing level elements:', error)
      }
   }

   showLevelContent(level) {
      // Question text
      const questionText = new PIXI.Text("Combine these:", {
         fontFamily: "Arial",
         fontSize: 20,
         fill: 0xecf0f1,
         align: "center",
      })
      questionText.anchor.set(0.5)
      questionText.x = this.gameWidth / 2
      questionText.y = 130
      this.app.stage.addChild(questionText)
      this.inputEmojis.push(questionText)

      // Show input emojis
      this.showInputEmojis(level)

      // Result question
      const resultText = new PIXI.Text("What will you get?", {
         fontFamily: "Arial",
         fontSize: 18,
         fill: 0xe74c3c,
         align: "center",
      })
      resultText.anchor.set(0.5)
      resultText.x = this.gameWidth / 2
      resultText.y = 280
      this.app.stage.addChild(resultText)
      this.inputEmojis.push(resultText)

      // Generate and show answer options
      this.generateAnswerOptions(level)
      this.showAnswerOptions()
   }

   showInputEmojis(level) {
      const emojiCount = level.inputs.length
      
      if (emojiCount === 2) {
         // 2 emoji için basit yerleşim
         const centerX = this.gameWidth / 2
         const emoji1X = centerX - 60  // Sol emoji
         const emoji2X = centerX + 60  // Sağ emoji
         const plusX = centerX         // Ortadaki plus
         
         // İlk emoji
         const emoji1 = this.createEmojiDisplay(level.inputs[0], emoji1X, 200)
         this.inputEmojis.push(emoji1)
         this.app.stage.addChild(emoji1)
         
         // Plus işareti
         const plusSign = new PIXI.Text("+", {
            fontFamily: "Arial",
            fontSize: 24,
            fill: 0x4a90e2,
            align: "center",
         })
         plusSign.anchor.set(0.5)
         plusSign.x = plusX
         plusSign.y = 200
         this.app.stage.addChild(plusSign)
         this.inputEmojis.push(plusSign)
         
         // İkinci emoji
         const emoji2 = this.createEmojiDisplay(level.inputs[1], emoji2X, 200)
         this.inputEmojis.push(emoji2)
         this.app.stage.addChild(emoji2)
         
      } else if (emojiCount === 3) {
         // 3 emoji için sıkışık yerleşim
         const centerX = this.gameWidth / 2
         const emoji1X = centerX - 80  // Sol emoji
         const emoji2X = centerX       // Orta emoji  
         const emoji3X = centerX + 80  // Sağ emoji
         const plus1X = centerX - 40   // İlk plus
         const plus2X = centerX + 40   // İkinci plus
         
         // İlk emoji
         const emoji1 = this.createEmojiDisplay(level.inputs[0], emoji1X, 200)
         this.inputEmojis.push(emoji1)
         this.app.stage.addChild(emoji1)
         
         // İlk plus
         const plus1 = new PIXI.Text("+", {
            fontFamily: "Arial",
            fontSize: 20,
            fill: 0x4a90e2,
            align: "center",
         })
         plus1.anchor.set(0.5)
         plus1.x = plus1X
         plus1.y = 200
         this.app.stage.addChild(plus1)
         this.inputEmojis.push(plus1)
         
         // İkinci emoji
         const emoji2 = this.createEmojiDisplay(level.inputs[1], emoji2X, 200)
         this.inputEmojis.push(emoji2)
         this.app.stage.addChild(emoji2)
         
         // İkinci plus
         const plus2 = new PIXI.Text("+", {
            fontFamily: "Arial",
            fontSize: 20,
            fill: 0x4a90e2,
            align: "center",
         })
         plus2.anchor.set(0.5)
         plus2.x = plus2X
         plus2.y = 200
         this.app.stage.addChild(plus2)
         this.inputEmojis.push(plus2)
         
         // Üçüncü emoji
         const emoji3 = this.createEmojiDisplay(level.inputs[2], emoji3X, 200)
         this.inputEmojis.push(emoji3)
         this.app.stage.addChild(emoji3)
      }
   }

   createEmojiDisplay(emoji, x, y) {
      const container = new PIXI.Container()

      // Background circle
      const bg = new PIXI.Graphics()
      bg.beginFill(0x34495e, 0.8)
      bg.lineStyle(2, 0x3498db)
      bg.drawCircle(0, 0, 30)
      bg.endFill()

      // Emoji text
      const emojiText = new PIXI.Text(emoji, {
         fontFamily: "Arial",
         fontSize: 32,
         align: "center",
      })
      emojiText.anchor.set(0.5)

      container.addChild(bg)
      container.addChild(emojiText)
      container.x = x
      container.y = y

      return container
   }

   generateAnswerOptions(level) {
      const allResults = GAME_DATA.levels.map(l => l.result)
      const wrongAnswers = allResults.filter(result => result !== level.result)
      
      // More options for complex levels
      const optionCount = level.inputs.length >= 3 ? 5 : 3
      const shuffledWrong = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, optionCount)
      
      this.answerChoices = [level.result, ...shuffledWrong].sort(() => Math.random() - 0.5)
   }

   showAnswerOptions() {
      const startY = 320
      const buttonHeight = 50  // Smaller buttons to fit more
      const spacing = 12
      const optionCount = this.answerChoices.length

      // If more than 4 options, use 2 columns
      if (optionCount > 4) {
         const buttonsPerColumn = Math.ceil(optionCount / 2)
         const centerX = this.gameWidth / 2
         const leftColumnX = centerX - 80   // Left column center
         const rightColumnX = centerX + 80  // Right column center

         this.answerChoices.forEach((emoji, index) => {
            let buttonX, buttonY
            
            if (index < buttonsPerColumn) {
               // Left column
               buttonX = leftColumnX
               buttonY = startY + (index * (buttonHeight + spacing))
            } else {
               // Right column
               buttonX = rightColumnX
               buttonY = startY + ((index - buttonsPerColumn) * (buttonHeight + spacing))
            }
            
            const button = this.createAnswerButton(emoji, buttonX, buttonY, true) // true = smaller
            this.answerOptions.push(button)
            this.app.stage.addChild(button)
         })
      } else {
         // Single column for 4 or fewer options
         this.answerChoices.forEach((emoji, index) => {
            const buttonY = startY + (index * (buttonHeight + spacing))
            const button = this.createAnswerButton(emoji, this.gameWidth / 2, buttonY, false) // false = normal size
            this.answerOptions.push(button)
            this.app.stage.addChild(button)
         })
      }
   }

   createAnswerButton(emoji, x, y, isSmall = false) {
      const container = new PIXI.Container()

      // Button dimensions based on size
      const width = isSmall ? 140 : 300
      const height = isSmall ? 40 : 50
      const fontSize = isSmall ? 24 : 32

      // Button background
      const bg = new PIXI.Graphics()
      bg.beginFill(0x2c3e50, 0.9)
      bg.lineStyle(2, 0x3498db)
      bg.drawRoundedRect(-width/2, -height/2, width, height, 12)
      bg.endFill()

      // Emoji text
      const emojiText = new PIXI.Text(emoji, {
         fontFamily: "Arial",
         fontSize: fontSize,
         align: "center",
      })
      emojiText.anchor.set(0.5)

      container.addChild(bg)
      container.addChild(emojiText)
      container.x = x
      container.y = y
      container.emoji = emoji

      // Make interactive with larger touch area
      container.eventMode = "static"
      container.cursor = "pointer"
      
      // Add larger hit area for better touch
      const padding = 10
      container.hitArea = new PIXI.Rectangle(-width/2 - padding, -height/2 - padding, width + padding*2, height + padding*2)

      // Hover effects
      container.on("pointerover", () => {
         bg.tint = 0x3498db
         container.scale.set(1.05)
      })

      container.on("pointerout", () => {
         bg.tint = 0xffffff
         container.scale.set(1)
      })

      // Click handler
      container.on("pointerdown", () => {
         bg.tint = 0x2980b9
         container.scale.set(0.95)
         this.soundManager.playClick()
         this.hapticManager.light()
         this.handleAnswer(emoji)
      })

      return container
   }

   handleAnswer(selectedEmoji) {
      if (this.levelCompleted) return

      this.levelCompleted = true

      if (selectedEmoji === this.correctAnswer) {
         this.score += 10
         this.updateScore()
         this.showFeedback("Correct! 🎉", 0x27ae60)
         this.createSuccessParticles()
         this.soundManager.playCorrect()
         this.hapticManager.success()

         setTimeout(() => {
            this.showNextLevelButton()
         }, 1500)
      } else {
         this.showFeedback("Wrong! 😔", 0xe74c3c)
         this.soundManager.playWrong()
         this.hapticManager.error()

         setTimeout(() => {
            this.showNextLevelButton()
         }, 2000)
      }

      // Highlight answers
      this.answerOptions.forEach(option => {
         option.eventMode = "none"
         if (option.emoji === this.correctAnswer) {
            option.children[0].tint = 0x27ae60
         } else if (option.emoji === selectedEmoji && selectedEmoji !== this.correctAnswer) {
            option.children[0].tint = 0xe74c3c
         } else {
            option.alpha = 0.5
         }
      })
   }

   updateScore() {
      this.scoreText.text = `Score: ${this.score}`
      if (this.highScoreText) {
         this.highScoreText.text = `Best: ${this.gameData.highScore}`
      }
      this.saveGameData()
   }
   
   saveGameData() {
      try {
         this.gameData.currentLevel = this.currentLevel
         this.gameData.totalScore = this.score
         this.gameData.unlockedLevels = Math.max(this.gameData.unlockedLevels, this.currentLevel + 1)
         
         // Update high score
         if (this.score > this.gameData.highScore) {
            this.gameData.highScore = this.score
         }
         
         // Add completed level
         if (!this.gameData.completedLevels.includes(this.currentLevel)) {
            this.gameData.completedLevels.push(this.currentLevel)
         }
         
         // Update statistics
         this.gameData.statistics.totalPlayTime = Date.now() - this.sessionStartTime
         
         GameDataManager.saveGameData(this.gameData)
      } catch (error) {
         console.error('Failed to save game data:', error)
      }
   }

   showFeedback(message, color) {
      this.feedbackText = new PIXI.Text(message, {
         fontFamily: "Arial",
         fontSize: 20,
         fill: color,
         align: "center",
      })
      this.feedbackText.anchor.set(0.5)
      this.feedbackText.x = this.gameWidth / 2
      this.feedbackText.y = 250
      this.app.stage.addChild(this.feedbackText)
   }

   showNextLevelButton() {
      try {
         console.log('=== CREATING NEXT LEVEL BUTTON ===')
         
         // Clean up existing button
         if (this.nextButton) {
            console.log('Cleaning up existing button')
            if (this.nextButton.parent) {
               this.nextButton.parent.removeChild(this.nextButton)
            }
            if (this.nextButton.destroy) this.nextButton.destroy()
         }

         // Create a container for the button
         this.nextButton = new PIXI.Container()
         
         // Create the visual button
         const buttonGraphics = new PIXI.Graphics()
         buttonGraphics.beginFill(0x27ae60)
         buttonGraphics.lineStyle(3, 0x2ecc71)
         buttonGraphics.drawRoundedRect(-75, -25, 150, 50, 12)
         buttonGraphics.endFill()

         const buttonText = new PIXI.Text("Next Level", {
            fontFamily: "Arial",
            fontSize: 18,
            fill: 0xffffff,
            align: "center",
         })
         buttonText.anchor.set(0.5)

         // Add graphics and text to container
         this.nextButton.addChild(buttonGraphics)
         this.nextButton.addChild(buttonText)
         
         // Position the container
         this.nextButton.x = this.gameWidth / 2
         this.nextButton.y = this.gameHeight - 80  // Move up a bit more
         
         // Make the entire container interactive
         this.nextButton.eventMode = "static"
         this.nextButton.cursor = "pointer"
         this.nextButton.hitArea = new PIXI.Rectangle(-85, -35, 170, 70)

         console.log(`Button positioned at: (${this.nextButton.x}, ${this.nextButton.y})`)
         console.log(`Game dimensions: ${this.gameWidth} x ${this.gameHeight}`)
         console.log(`Button bounds: x=${this.nextButton.x - 85} to ${this.nextButton.x + 85}, y=${this.nextButton.y - 35} to ${this.nextButton.y + 35}`)

         // Add all event listeners with debug
         this.nextButton.on("pointerover", (event) => {
            console.log('Button hover IN')
            buttonGraphics.tint = 0x2ecc71
            this.nextButton.scale.set(1.05)
         })

         this.nextButton.on("pointerout", (event) => {
            console.log('Button hover OUT')
            buttonGraphics.tint = 0xffffff
            this.nextButton.scale.set(1)
         })

         this.nextButton.on("pointerdown", (event) => {
            console.log('=== NEXT LEVEL BUTTON CLICKED! ===')
            console.log('Event:', event)
            console.log('Current level:', this.currentLevel)
            
            buttonGraphics.tint = 0x1e8449
            this.nextButton.scale.set(0.95)
            
            try {
               this.soundManager.playClick()
               this.hapticManager.light()
            } catch (e) {
               console.log('Sound/haptic error:', e)
            }
            
            // Add small delay for visual feedback
            setTimeout(() => {
               console.log(`Moving from level ${this.currentLevel} to ${this.currentLevel + 1}`)
               this.currentLevel++
               this.loadLevel(this.currentLevel)
            }, 150)
         })

         // Also add click and tap events for better compatibility
         this.nextButton.on("click", () => {
            console.log('Button CLICK event triggered')
         })
         
         this.nextButton.on("tap", () => {
            console.log('Button TAP event triggered')
         })

         // Add to stage
         this.app.stage.addChild(this.nextButton)
         
         // Ensure button is on top
         this.app.stage.setChildIndex(this.nextButton, this.app.stage.children.length - 1)
         
         console.log('Button added to stage')
         console.log('Stage children count:', this.app.stage.children.length)
         console.log('Button is interactive:', this.nextButton.eventMode)
         console.log('Button cursor:', this.nextButton.cursor)
         console.log('=== BUTTON CREATION COMPLETE ===')
         
      } catch (error) {
         console.error('Error creating next level button:', error)
         console.error('Stack trace:', error.stack)
      }
   }

   createSuccessParticles() {
      const particles = []
      for (let i = 0; i < 15; i++) {
         const particle = new PIXI.Graphics()
         particle.beginFill(0xf1c40f)
         particle.drawCircle(0, 0, Math.random() * 4 + 2)
         particle.endFill()

         particle.x = 200 + (Math.random() - 0.5) * 100
         particle.y = 200 + (Math.random() - 0.5) * 100
         particle.vx = (Math.random() - 0.5) * 8
         particle.vy = (Math.random() - 0.5) * 8
         particle.life = 60

         particles.push(particle)
         this.app.stage.addChild(particle)
      }

      const animate = () => {
         particles.forEach((particle, index) => {
            particle.x += particle.vx
            particle.y += particle.vy
            particle.alpha = particle.life / 60
            particle.life--

            if (particle.life <= 0) {
               this.app.stage.removeChild(particle)
               particles.splice(index, 1)
            }
         })

         if (particles.length > 0) {
            requestAnimationFrame(animate)
         }
      }
      animate()
   }

   showGameComplete() {
      this.app.stage.removeChildren()

      // Background
      const bg = new PIXI.Graphics()
      bg.beginFill(0x16213e)
      bg.drawRect(0, 0, 400, 700)
      bg.endFill()
      this.app.stage.addChild(bg)

      // Congratulations
      const congratsText = new PIXI.Text("🎉 Congratulations! 🎉", {
         fontFamily: "Arial",
         fontSize: 28,
         fill: 0xf1c40f,
         align: "center",
      })
      congratsText.anchor.set(0.5)
      congratsText.x = 200
      congratsText.y = 250

      const completeText = new PIXI.Text("You completed all levels!", {
         fontFamily: "Arial",
         fontSize: 18,
         fill: 0xecf0f1,
         align: "center",
      })
      completeText.anchor.set(0.5)
      completeText.x = 200
      completeText.y = 300

      const maxScore = GAME_DATA.levels.length * 10
      const scoreText = new PIXI.Text(`Final Score: ${this.score}/${maxScore}`, {
         fontFamily: "Arial",
         fontSize: 24,
         fill: 0x27ae60,
         align: "center",
      })
      scoreText.anchor.set(0.5)
      scoreText.x = 200
      scoreText.y = 350

      this.app.stage.addChild(congratsText)
      this.app.stage.addChild(completeText)
      this.app.stage.addChild(scoreText)

      // Restart button
      const restartButton = new PIXI.Graphics()
      restartButton.beginFill(0x3498db)
      restartButton.lineStyle(2, 0x2980b9)
      restartButton.drawRoundedRect(-75, -20, 150, 40, 10)
      restartButton.endFill()

      const restartText = new PIXI.Text("Play Again", {
         fontFamily: "Arial",
         fontSize: 16,
         fill: 0xffffff,
         align: "center",
      })
      restartText.anchor.set(0.5)

      restartButton.addChild(restartText)
      restartButton.x = 200
      restartButton.y = 450
      restartButton.eventMode = "static"
      restartButton.cursor = "pointer"

      // Add hover effects for restart button
      restartButton.on("pointerover", () => {
         restartButton.tint = 0x2980b9
         restartButton.scale.set(1.05)
      })

      restartButton.on("pointerout", () => {
         restartButton.tint = 0xffffff
         restartButton.scale.set(1)
      })

      restartButton.on("pointerdown", () => {
         restartButton.tint = 0x3498db
         restartButton.scale.set(0.95)
         this.soundManager.playClick()
         this.hapticManager.light()
         
         setTimeout(() => {
            this.currentLevel = 0
            this.score = 0
            this.gameData.currentLevel = 0
            this.gameData.totalScore = 0
            this.saveGameData()
            this.app.stage.removeChildren()
            this.setupGame()
            this.loadLevel(this.currentLevel)
         }, 100)
      })

      this.app.stage.addChild(restartButton)
   }
}

// Start the game - prevent multiple instances
if (typeof window.gameInstance === 'undefined') {
   window.gameInstance = null
   
   const startGame = () => {
      if (window.gameInstance) return
      
      try {
         window.gameInstance = new EmojiAlchemyGame()
      } catch (e) {
         console.error('Game initialization error:', e)
      }
   }
   
   if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startGame, { once: true })
   } else {
      startGame()
   }
}