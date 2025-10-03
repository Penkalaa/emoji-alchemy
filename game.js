// Dynamic Level Manager
class LevelManager {
   constructor() {
      this.currentLevelPack = null;
      this.availablePacks = [];
      this.defaultLevels = this.getDefaultLevels();
   }
   
   async loadAvailablePacks() {
      try {
         // First, check localStorage for saved level packs
         const localPacks = this.getLocalLevelPacks();
         
         // Then try to fetch from server
         let serverPacks = [];
         try {
            const response = await fetch('/.netlify/functions/get-levels');
            const result = await response.json();
            
            if (result.success) {
               serverPacks = result.data;
            }
         } catch (error) {
            console.warn('Could not fetch server level packs:', error);
         }
         
         // Combine local and server packs (prioritize local)
         const allPacks = [...localPacks, ...serverPacks];
         
         // Remove duplicates based on ID
         const uniquePacks = allPacks.filter((pack, index, self) => 
            index === self.findIndex(p => p.id === pack.id)
         );
         
         this.availablePacks = uniquePacks;
         console.log('Available level packs:', this.availablePacks.length, '(local + server)');
         return this.availablePacks;
         
      } catch (error) {
         console.error('Failed to load level packs:', error);
         return [];
      }
   }
   
   getLocalLevelPacks() {
      const localPacks = [];
      
      try {
         console.log('Scanning localStorage for level packs...');
         console.log('Total localStorage items:', localStorage.length);
         
         // Debug: List all localStorage keys
         const allKeys = [];
         for (let i = 0; i < localStorage.length; i++) {
            allKeys.push(localStorage.key(i));
         }
         console.log('All localStorage keys:', allKeys);
         
         // Scan localStorage for level packs
         for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('levelPack_')) {
               console.log('Found level pack key:', key);
               
               try {
                  const packData = JSON.parse(localStorage.getItem(key));
                  console.log('Pack data structure:', Object.keys(packData));
                  
                  // Handle different possible data structures
                  let levels = packData.levels;
                  let name = packData.name || 'Unnamed Pack';
                  let id = packData.id || key.replace('levelPack_', '');
                  
                  if (!levels || !Array.isArray(levels)) {
                     console.warn('Invalid level pack structure:', packData);
                     continue;
                  }
                  
                  // Create preview from first 3 levels
                  const preview = levels.slice(0, 3).map(level => {
                     const inputs = level.inputs ? level.inputs.join(' + ') : 'Unknown';
                     const result = level.result || 'Unknown';
                     return `${inputs} = ${result}`;
                  });
                  
                  localPacks.push({
                     id: id,
                     filename: packData.filename || `${name}.json`,
                     name: name,
                     timestamp: packData.timestamp || new Date().toISOString(),
                     totalLevels: levels.length,
                     preview: preview,
                     source: 'local'
                  });
                  
                  console.log('Added local pack:', name, 'with', levels.length, 'levels');
               } catch (parseError) {
                  console.error('Error parsing level pack:', key, parseError);
               }
            }
         }
         
         console.log('Found local level packs:', localPacks.length);
         return localPacks;
         
      } catch (error) {
         console.error('Error scanning local level packs:', error);
         return [];
      }
   }
   
   async loadLevelPack(packId) {
      try {
         console.log(`Loading level pack: ${packId}`);
         
         // Try to load from localStorage first (if saved locally)
         const savedPack = localStorage.getItem(`levelPack_${packId}`);
         if (savedPack) {
            console.log('Found level pack in localStorage:', packId);
            const packData = JSON.parse(savedPack);
            this.currentLevelPack = packData;
            console.log('Loaded pack data:', packData.name, 'with', packData.levels.length, 'levels');
            return packData.levels;
         }
         
         // Try to fetch from server
         try {
            console.log('Trying to fetch from server:', packId);
            const response = await fetch(`/.netlify/functions/get-levels?id=${packId}`);
            const result = await response.json();
            
            if (result.success && result.data) {
               console.log('Loaded level pack from server');
               this.currentLevelPack = result.data;
               
               // Save to localStorage for future use
               localStorage.setItem(`levelPack_${packId}`, JSON.stringify(result.data));
               
               return result.data.levels;
            }
         } catch (serverError) {
            console.warn('Could not fetch from server:', serverError);
         }
         
         // Fallback to default levels
         console.log('Using default levels as fallback');
         return this.defaultLevels;
         
      } catch (error) {
         console.error('Failed to load level pack:', error);
         return this.defaultLevels;
      }
   }
   
   getCurrentLevels() {
      return this.currentLevelPack ? this.currentLevelPack.levels : this.defaultLevels;
   }
   
   getDefaultLevels() {
      return [
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
      ];
   }
   
   // Save level pack to localStorage for offline use
   saveLevelPackLocally(packData) {
      try {
         localStorage.setItem(`levelPack_${packData.id}`, JSON.stringify(packData));
         console.log('Level pack saved locally:', packData.name);
      } catch (error) {
         console.error('Failed to save level pack locally:', error);
      }
   }
}

// Global level manager instance
const levelManager = new LevelManager();

// Backward compatibility - GAME_DATA will be populated dynamically
const GAME_DATA = {
   levels: levelManager.getDefaultLevels()
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
   
   setEnabled(enabled) {
      this.enabled = enabled
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
      
      // Initialize level manager
      this.levelManager = levelManager
      
      // Prevent duplicate setup
      this.keyboardSetup = false
      
      // Game session tracking
      this.sessionStartTime = Date.now()
      
      // Level pack selector state
      this.levelPackSelectorOpen = false
      this.levelPackPanel = null
      
      // Settings menu state
      this.settingsMenuOpen = false
      this.settingsPanel = null
      this.settingsOverlay = null
      this.settingsButton = null

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
         
         // Load available level packs and show selector
         this.showLevelPackSelector()
         
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
         // S key to show settings
         else if (event.key.toLowerCase() === 's') {
            this.showSettingsMenu()
         }
         // Escape key to hide settings
         else if (event.key === 'Escape') {
            this.hideSettingsMenu()
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
         
         // Settings Button
         this.settingsButton = this.createSettingsButton()
         this.app.stage.addChild(this.settingsButton)
         
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
   
   async showLevelPackSelector() {
      try {
         console.log('=== SHOWING LEVEL PACK SELECTOR ===')
         
         // Load available packs
         const availablePacks = await this.levelManager.loadAvailablePacks()
         
         // Create overlay
         this.levelPackOverlay = new PIXI.Graphics()
         this.levelPackOverlay.beginFill(0x000000, 0.8)
         this.levelPackOverlay.drawRect(0, 0, this.gameWidth, this.gameHeight)
         this.levelPackOverlay.endFill()
         this.levelPackOverlay.eventMode = 'static'
         
         // Create selector panel
         this.levelPackPanel = new PIXI.Graphics()
         this.levelPackPanel.beginFill(0x2c3e50, 0.95)
         this.levelPackPanel.lineStyle(3, 0x3498db)
         this.levelPackPanel.drawRoundedRect(0, 0, 350, 400, 15)
         this.levelPackPanel.endFill()
         this.levelPackPanel.x = (this.gameWidth - 350) / 2
         this.levelPackPanel.y = (this.gameHeight - 400) / 2
         
         // Title
         const title = new PIXI.Text('Select Level Pack', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xf1c40f,
            align: 'center'
         })
         title.anchor.set(0.5)
         title.x = 175
         title.y = 40
         this.levelPackPanel.addChild(title)
         
         let yPos = 90
         
         // Default levels button
         const defaultButton = this.createPackButton('Default Levels', '50 built-in levels', 175, yPos, () => {
            this.selectLevelPack('default')
         })
         this.levelPackPanel.addChild(defaultButton)
         yPos += 70
         
         // Available packs
         if (availablePacks.length > 0) {
            availablePacks.forEach((pack, index) => {
               if (yPos < 350) { // Don't overflow panel
                  const packButton = this.createPackButton(
                     pack.name, 
                     `${pack.totalLevels} levels - ${new Date(pack.timestamp).toLocaleDateString()}`,
                     175, 
                     yPos, 
                     () => this.selectLevelPack(pack.id)
                  )
                  this.levelPackPanel.addChild(packButton)
                  yPos += 70
               }
            })
         } else {
            // No packs available message
            const noPacksText = new PIXI.Text('No custom level packs found.\nUsing default levels.', {
               fontFamily: 'Arial',
               fontSize: 14,
               fill: 0xbdc3c7,
               align: 'center'
            })
            noPacksText.anchor.set(0.5)
            noPacksText.x = 175
            noPacksText.y = yPos + 20
            this.levelPackPanel.addChild(noPacksText)
         }
         
         // Admin panel link
         const adminText = new PIXI.Text('Create levels at /admin-editor', {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0x95a5a6,
            align: 'center'
         })
         adminText.anchor.set(0.5)
         adminText.x = 175
         adminText.y = 370
         this.levelPackPanel.addChild(adminText)
         
         // Add to stage
         this.app.stage.addChild(this.levelPackOverlay)
         this.app.stage.addChild(this.levelPackPanel)
         
         // Animate in
         this.levelPackPanel.alpha = 0
         this.levelPackPanel.scale.set(0.8)
         
         const animateIn = () => {
            this.levelPackPanel.alpha += 0.1
            this.levelPackPanel.scale.x += 0.02
            this.levelPackPanel.scale.y += 0.02
            
            if (this.levelPackPanel.alpha < 1) {
               requestAnimationFrame(animateIn)
            } else {
               this.levelPackPanel.alpha = 1
               this.levelPackPanel.scale.set(1)
            }
         }
         animateIn()
         
      } catch (error) {
         console.error('Error showing level pack selector:', error)
         // Fallback to default levels
         this.selectLevelPack('default')
      }
   }
   
   createPackButton(title, subtitle, x, y, onClick) {
      const container = new PIXI.Container()
      
      // Button background
      const bg = new PIXI.Graphics()
      bg.beginFill(0x34495e)
      bg.lineStyle(2, 0x3498db)
      bg.drawRoundedRect(-150, -25, 300, 50, 10)
      bg.endFill()
      
      // Title text
      const titleText = new PIXI.Text(title, {
         fontFamily: 'Arial',
         fontSize: 16,
         fill: 0xffffff,
         align: 'center'
      })
      titleText.anchor.set(0.5)
      titleText.y = -8
      
      // Subtitle text
      const subtitleText = new PIXI.Text(subtitle, {
         fontFamily: 'Arial',
         fontSize: 12,
         fill: 0xbdc3c7,
         align: 'center'
      })
      subtitleText.anchor.set(0.5)
      subtitleText.y = 8
      
      container.addChild(bg)
      container.addChild(titleText)
      container.addChild(subtitleText)
      container.x = x
      container.y = y
      
      // Make interactive
      container.eventMode = 'static'
      container.cursor = 'pointer'
      container.hitArea = new PIXI.Rectangle(-160, -35, 320, 70)
      
      // Hover effects
      container.on('pointerover', () => {
         bg.tint = 0x3498db
         container.scale.set(1.05)
      })
      
      container.on('pointerout', () => {
         bg.tint = 0xffffff
         container.scale.set(1)
      })
      
      container.on('pointerdown', () => {
         bg.tint = 0x2980b9
         container.scale.set(0.95)
         this.soundManager.playClick()
         this.hapticManager.light()
         onClick()
      })
      
      return container
   }
   
   async selectLevelPack(packId) {
      try {
         console.log(`Selected level pack: ${packId}`)
         
         // Hide selector
         this.hideLevelPackSelector()
         
         // Load levels
         if (packId === 'default') {
            GAME_DATA.levels = this.levelManager.getDefaultLevels()
         } else {
            const levels = await this.levelManager.loadLevelPack(packId)
            GAME_DATA.levels = levels
         }
         
         console.log(`Loaded ${GAME_DATA.levels.length} levels`)
         
         // Reset game state
         this.currentLevel = 0
         this.score = 0
         
         // Start game
         this.loadLevel(this.currentLevel)
         
         this.showQuickFeedback(`Loaded ${GAME_DATA.levels.length} levels!`, 0x27ae60)
         
      } catch (error) {
         console.error('Error selecting level pack:', error)
         this.showErrorMessage('Failed to load level pack')
      }
   }
   
   hideLevelPackSelector() {
      if (this.levelPackOverlay && this.levelPackOverlay.parent) {
         this.app.stage.removeChild(this.levelPackOverlay)
         if (this.levelPackOverlay.destroy) this.levelPackOverlay.destroy()
         this.levelPackOverlay = null
      }
      
      if (this.levelPackPanel && this.levelPackPanel.parent) {
         this.app.stage.removeChild(this.levelPackPanel)
         if (this.levelPackPanel.destroy) this.levelPackPanel.destroy()
         this.levelPackPanel = null
      }
   }
   
   createSettingsButton() {
      const container = new PIXI.Container()
      
      // Button background
      const bg = new PIXI.Graphics()
      bg.beginFill(0x34495e)
      bg.lineStyle(2, 0x2c3e50)
      bg.drawRoundedRect(-20, -20, 40, 40, 8)
      bg.endFill()
      
      // Settings icon (gear emoji)
      const icon = new PIXI.Text('⚙️', {
         fontFamily: 'Arial',
         fontSize: 20,
         align: 'center'
      })
      icon.anchor.set(0.5)
      
      container.addChild(bg)
      container.addChild(icon)
      container.x = this.gameWidth - 30
      container.y = 30
      
      // Make interactive
      container.eventMode = 'static'
      container.cursor = 'pointer'
      container.hitArea = new PIXI.Rectangle(-25, -25, 50, 50)
      
      // Hover effects
      container.on('pointerover', () => {
         bg.tint = 0x3498db
         container.scale.set(1.1)
      })
      
      container.on('pointerout', () => {
         bg.tint = 0xffffff
         container.scale.set(1)
      })
      
      container.on('pointerdown', () => {
         bg.tint = 0x2980b9
         container.scale.set(0.9)
         this.soundManager.playClick()
         this.hapticManager.light()
         this.showSettingsMenu()
      })
      
      return container
   }
   
   showSettingsMenu() {
      if (this.settingsMenuOpen) return
      
      console.log('=== SHOWING SETTINGS MENU ===')
      this.settingsMenuOpen = true
      
      // Create overlay
      this.settingsOverlay = new PIXI.Graphics()
      this.settingsOverlay.beginFill(0x000000, 0.8)
      this.settingsOverlay.drawRect(0, 0, this.gameWidth, this.gameHeight)
      this.settingsOverlay.endFill()
      this.settingsOverlay.eventMode = 'static'
      this.settingsOverlay.on('pointerdown', () => {
         this.hideSettingsMenu()
      })
      
      // Create settings panel
      this.settingsPanel = new PIXI.Graphics()
      this.settingsPanel.beginFill(0x2c3e50, 0.95)
      this.settingsPanel.lineStyle(3, 0x3498db)
      this.settingsPanel.drawRoundedRect(0, 0, 360, 500, 15)
      this.settingsPanel.endFill()
      this.settingsPanel.x = (this.gameWidth - 360) / 2
      this.settingsPanel.y = (this.gameHeight - 500) / 2
      
      this.createSettingsContent()
      
      // Add to stage
      this.app.stage.addChild(this.settingsOverlay)
      this.app.stage.addChild(this.settingsPanel)
      
      // Animate in
      this.settingsPanel.alpha = 0
      this.settingsPanel.scale.set(0.8)
      
      const animateIn = () => {
         this.settingsPanel.alpha += 0.1
         this.settingsPanel.scale.x += 0.02
         this.settingsPanel.scale.y += 0.02
         
         if (this.settingsPanel.alpha < 1) {
            requestAnimationFrame(animateIn)
         } else {
            this.settingsPanel.alpha = 1
            this.settingsPanel.scale.set(1)
         }
      }
      animateIn()
   }
   
   createSettingsContent() {
      let yPos = 30
      
      // Title
      const title = new PIXI.Text('⚙️ Settings', {
         fontFamily: 'Arial',
         fontSize: 24,
         fill: 0xf1c40f,
         align: 'center'
      })
      title.anchor.set(0.5)
      title.x = 180
      title.y = yPos
      this.settingsPanel.addChild(title)
      yPos += 50
      
      // Current Level Pack Info
      const currentPack = this.levelManager.currentLevelPack
      const packName = currentPack ? currentPack.name : 'Default Levels'
      const packInfo = new PIXI.Text(`📦 Current Pack: ${packName}`, {
         fontFamily: 'Arial',
         fontSize: 14,
         fill: 0xecf0f1,
         align: 'center'
      })
      packInfo.anchor.set(0.5)
      packInfo.x = 180
      packInfo.y = yPos
      this.settingsPanel.addChild(packInfo)
      yPos += 30
      
      const levelInfo = new PIXI.Text(`📊 ${GAME_DATA.levels.length} levels available`, {
         fontFamily: 'Arial',
         fontSize: 12,
         fill: 0xbdc3c7,
         align: 'center'
      })
      levelInfo.anchor.set(0.5)
      levelInfo.x = 180
      levelInfo.y = yPos
      this.settingsPanel.addChild(levelInfo)
      yPos += 40
      
      // Change Level Pack Button
      const changeLevelPackBtn = this.createMenuButton('🔄 Change Level Pack', 180, yPos, () => {
         this.hideSettingsMenu()
         this.showLevelPackSelector()
      })
      this.settingsPanel.addChild(changeLevelPackBtn)
      yPos += 60
      
      // Audio Controls
      const audioTitle = new PIXI.Text('🔊 Audio Settings', {
         fontFamily: 'Arial',
         fontSize: 16,
         fill: 0x3498db,
         align: 'center'
      })
      audioTitle.anchor.set(0.5)
      audioTitle.x = 180
      audioTitle.y = yPos
      this.settingsPanel.addChild(audioTitle)
      yPos += 35
      
      // Sound Toggle
      const soundStatus = this.gameData.settings.soundEnabled ? 'ON' : 'OFF'
      const soundBtn = this.createMenuButton(`🔊 Sound: ${soundStatus}`, 180, yPos, () => {
         this.toggleSound()
      })
      this.settingsPanel.addChild(soundBtn)
      yPos += 50
      
      // Vibration Toggle
      const vibrationStatus = this.gameData.settings.vibrationEnabled ? 'ON' : 'OFF'
      const vibrationBtn = this.createMenuButton(`📳 Vibration: ${vibrationStatus}`, 180, yPos, () => {
         this.toggleVibration()
      })
      this.settingsPanel.addChild(vibrationBtn)
      yPos += 60
      
      // Game Stats
      const statsTitle = new PIXI.Text('📈 Game Statistics', {
         fontFamily: 'Arial',
         fontSize: 16,
         fill: 0x3498db,
         align: 'center'
      })
      statsTitle.anchor.set(0.5)
      statsTitle.x = 180
      statsTitle.y = yPos
      this.settingsPanel.addChild(statsTitle)
      yPos += 35
      
      // Stats info
      const stats = [
         `🏆 High Score: ${this.gameData.highScore}`,
         `📊 Current Score: ${this.score}`,
         `🎯 Current Level: ${this.currentLevel + 1}`,
         `✅ Completed: ${this.gameData.completedLevels.length} levels`
      ]
      
      stats.forEach(stat => {
         const statText = new PIXI.Text(stat, {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0xbdc3c7,
            align: 'center'
         })
         statText.anchor.set(0.5)
         statText.x = 180
         statText.y = yPos
         this.settingsPanel.addChild(statText)
         yPos += 20
      })
      
      yPos += 20
      
      // Admin Panel Link
      const adminBtn = this.createMenuButton('⚙️ Level Editor', 180, yPos, () => {
         window.open('/admin-editor.html', '_blank')
      })
      this.settingsPanel.addChild(adminBtn)
      yPos += 60
      
      // Close Button
      const closeBtn = this.createMenuButton('✕ Close', 180, yPos, () => {
         this.hideSettingsMenu()
      }, 0x95a5a6)
      this.settingsPanel.addChild(closeBtn)
   }
   
   createMenuButton(text, x, y, onClick, color = 0x34495e) {
      const container = new PIXI.Container()
      
      // Button background
      const bg = new PIXI.Graphics()
      bg.beginFill(color)
      bg.lineStyle(2, 0x3498db)
      bg.drawRoundedRect(-140, -20, 280, 40, 8)
      bg.endFill()
      
      // Button text
      const buttonText = new PIXI.Text(text, {
         fontFamily: 'Arial',
         fontSize: 14,
         fill: 0xffffff,
         align: 'center'
      })
      buttonText.anchor.set(0.5)
      
      container.addChild(bg)
      container.addChild(buttonText)
      container.x = x
      container.y = y
      
      // Make interactive
      container.eventMode = 'static'
      container.cursor = 'pointer'
      container.hitArea = new PIXI.Rectangle(-150, -25, 300, 50)
      
      // Hover effects
      container.on('pointerover', () => {
         bg.tint = 0x3498db
         container.scale.set(1.05)
      })
      
      container.on('pointerout', () => {
         bg.tint = 0xffffff
         container.scale.set(1)
      })
      
      container.on('pointerdown', () => {
         bg.tint = 0x2980b9
         container.scale.set(0.95)
         this.soundManager.playClick()
         this.hapticManager.light()
         setTimeout(onClick, 100)
      })
      
      return container
   }
   
   toggleSound() {
      this.gameData.settings.soundEnabled = !this.gameData.settings.soundEnabled
      this.soundManager.setEnabled(this.gameData.settings.soundEnabled)
      this.saveGameData()
      
      // Refresh settings menu
      this.hideSettingsMenu()
      setTimeout(() => this.showSettingsMenu(), 100)
      
      const status = this.gameData.settings.soundEnabled ? 'enabled' : 'disabled'
      this.showQuickFeedback(`Sound ${status}`, 0x3498db)
   }
   
   toggleVibration() {
      this.gameData.settings.vibrationEnabled = !this.gameData.settings.vibrationEnabled
      this.hapticManager.setEnabled(this.gameData.settings.vibrationEnabled)
      this.saveGameData()
      
      // Test vibration if enabled
      if (this.gameData.settings.vibrationEnabled) {
         this.hapticManager.light()
      }
      
      // Refresh settings menu
      this.hideSettingsMenu()
      setTimeout(() => this.showSettingsMenu(), 100)
      
      const status = this.gameData.settings.vibrationEnabled ? 'enabled' : 'disabled'
      this.showQuickFeedback(`Vibration ${status}`, 0x3498db)
   }
   
   hideSettingsMenu() {
      if (!this.settingsMenuOpen) return
      
      console.log('=== HIDING SETTINGS MENU ===')
      this.settingsMenuOpen = false
      
      // Remove overlay
      if (this.settingsOverlay && this.settingsOverlay.parent) {
         this.app.stage.removeChild(this.settingsOverlay)
         if (this.settingsOverlay.destroy) this.settingsOverlay.destroy()
         this.settingsOverlay = null
      }
      
      // Remove panel
      if (this.settingsPanel && this.settingsPanel.parent) {
         this.app.stage.removeChild(this.settingsPanel)
         if (this.settingsPanel.destroy) this.settingsPanel.destroy()
         this.settingsPanel = null
      }
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