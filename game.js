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
   ],
}

class EmojiAlchemyGame {
   constructor() {
      this.currentLevel = 0
      this.app = null
      this.inputEmojis = []
      this.answerOptions = []
      this.correctAnswer = null
      this.score = 0
      this.levelCompleted = false
      
      // Prevent duplicate setup
      this.keyboardSetup = false

      this.init()
   }

   async init() {
      // Get device pixel ratio for high-DPI screens
      const pixelRatio = window.devicePixelRatio || 1
      
      // Use fixed dimensions to prevent loops
      const gameWidth = 400
      const gameHeight = 700
      
      // Create high-resolution canvas
      this.app = new PIXI.Application({
         width: gameWidth,
         height: gameHeight,
         backgroundColor: 0x1a1a2e,
         view: document.getElementById("gameCanvas"),
         antialias: true,
         resolution: pixelRatio,
         autoDensity: true,
      })

      // Store dimensions for positioning
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.pixelRatio = pixelRatio

      this.app.stage.eventMode = "static"
      this.app.stage.hitArea = new PIXI.Rectangle(0, 0, gameWidth, gameHeight)

      this.setupKeyboardShortcuts()
      this.setupGame()
      this.loadLevel(this.currentLevel)
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
      if (this.quickFeedback) {
         this.app.stage.removeChild(this.quickFeedback)
      }

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
         if (this.quickFeedback) {
            this.app.stage.removeChild(this.quickFeedback)
            this.quickFeedback = null
         }
      }, 1500)
   }

   setupGame() {
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

      // Score
      this.scoreText = new PIXI.Text(`Score: ${this.score}`, {
         fontFamily: "Arial",
         fontSize: 18,
         fill: 0xf1c40f,
         align: "left",
      })
      this.scoreText.x = 20
      this.scoreText.y = 80
      this.app.stage.addChild(this.scoreText)
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
      document.getElementById("levelDisplay").textContent = `Level ${level.level}`

      // Clear previous elements
      this.clearLevelElements()

      // Show level content
      this.showLevelContent(level)
   }

   clearLevelElements() {
      if (this.inputEmojis) {
         this.inputEmojis.forEach(sprite => this.app.stage.removeChild(sprite))
         this.inputEmojis = []
      }
      if (this.answerOptions) {
         this.answerOptions.forEach(option => this.app.stage.removeChild(option))
         this.answerOptions = []
      }
      if (this.feedbackText) {
         this.app.stage.removeChild(this.feedbackText)
         this.feedbackText = null
      }
      if (this.nextButton) {
         this.app.stage.removeChild(this.nextButton)
         this.nextButton = null
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

      // Make interactive
      container.eventMode = "static"
      container.cursor = "pointer"

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

         setTimeout(() => {
            this.showNextLevelButton()
         }, 1500)
      } else {
         this.showFeedback("Wrong! 😔", 0xe74c3c)

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
      this.nextButton = new PIXI.Graphics()
      this.nextButton.beginFill(0x27ae60)
      this.nextButton.lineStyle(2, 0x2ecc71)
      this.nextButton.drawRoundedRect(-75, -20, 150, 40, 10)
      this.nextButton.endFill()

      const buttonText = new PIXI.Text("Next Level", {
         fontFamily: "Arial",
         fontSize: 16,
         fill: 0xffffff,
         align: "center",
      })
      buttonText.anchor.set(0.5)

      this.nextButton.addChild(buttonText)
      this.nextButton.x = this.gameWidth / 2
      this.nextButton.y = 650
      this.nextButton.eventMode = "static"
      this.nextButton.cursor = "pointer"

      this.nextButton.on("pointerdown", () => {
         this.currentLevel++
         this.loadLevel(this.currentLevel)
      })

      this.app.stage.addChild(this.nextButton)
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

      restartButton.on("pointerdown", () => {
         this.currentLevel = 0
         this.score = 0
         this.app.stage.removeChildren()
         this.setupGame()
         this.loadLevel(this.currentLevel)
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