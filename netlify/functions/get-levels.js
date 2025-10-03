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
    // For now, we return empty array since level packs are stored in localStorage
    
    // This would normally query a database and return saved level packs
    // Currently, all level packs are managed via localStorage in the client
    const savedLevels = [];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'No server-side level packs found. Using localStorage for level management.',
        data: savedLevels,
        total: savedLevels.length,
        note: 'Level packs are currently stored in localStorage. In production, this would fetch from a real database.'
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
