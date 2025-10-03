// Netlify Function to retrieve saved levels
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // In a real implementation, you would fetch from a database
    // For now, we'll simulate finding saved level packs
    
    // This would normally query a database, but for demo purposes
    // we'll return some sample data that matches what might be saved
    const savedLevels = [];
    
    // Check if there are any indicators of saved levels
    // In a real app, this would query your database
    const currentTime = new Date().toISOString();
    const todayTimestamp = currentTime.slice(0, 10).replace(/-/g, '');
    
    // Generate some realistic sample data based on current time
    const sampleLevels = [
      {
        id: `${todayTimestamp}120000`,
        filename: `custom-levels-${todayTimestamp}120000.json`,
        name: "custom-levels",
        timestamp: `${currentTime.slice(0, 10)}T12:00:00.000Z`,
        totalLevels: 25,
        preview: ["🎨 + 🖌️ = 🖼️", "🌱 + 🌞 = 🌻", "🪨 + 🔥 = 🌋"]
      },
      {
        id: `${todayTimestamp}140000`,
        filename: `my-levels-${todayTimestamp}140000.json`,
        name: "my-levels", 
        timestamp: `${currentTime.slice(0, 10)}T14:00:00.000Z`,
        totalLevels: 15,
        preview: ["🔋 + 📱 = 🔌", "🌊 + 🏄 = 🏖️", "🎯 + 🏹 = 🎪"]
      }
    ];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Levels retrieved successfully!',
        data: sampleLevels,
        total: sampleLevels.length,
        note: 'In production, this would fetch from a real database. Level packs are currently stored in localStorage.'
      })
    };

  } catch (error) {
    console.error('Error retrieving levels:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};
