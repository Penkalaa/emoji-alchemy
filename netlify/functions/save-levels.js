// Netlify Function to save level data
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.name || !data.levels || !Array.isArray(data.levels)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid data format. Required: name, levels (array)' 
        })
      };
    }

    // Create timestamp
    const timestamp = new Date().toISOString();
    const timestampShort = timestamp.slice(0, 19).replace(/[:-]/g, '');
    
    // Create filename with timestamp
    const filename = `${data.name}-${timestampShort}.json`;
    
    // Prepare response data
    const savedData = {
      id: timestampShort,
      filename: filename,
      name: data.name,
      timestamp: timestamp,
      version: data.version || "1.0",
      totalLevels: data.levels.length,
      levels: data.levels,
      metadata: {
        userAgent: event.headers['user-agent'],
        ip: event.headers['x-forwarded-for'] || event.headers['client-ip'],
        savedAt: timestamp
      }
    };

    // In a real implementation, you would save this to a database
    // For now, we'll just return the data with a success message
    // You can integrate with services like:
    // - Netlify Forms
    // - Airtable
    // - Firebase
    // - Supabase
    // - FaunaDB

    console.log('Level data saved:', {
      filename,
      totalLevels: data.levels.length,
      timestamp
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Levels saved successfully!',
        data: {
          id: timestampShort,
          filename: filename,
          timestamp: timestamp,
          totalLevels: data.levels.length
        },
        // Include the full data for download
        fullData: savedData
      })
    };

  } catch (error) {
    console.error('Error saving levels:', error);
    
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
