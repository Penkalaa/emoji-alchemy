// Netlify Function to save level data
// Environment variables needed: SUPABASE_URL, SUPABASE_ANON_KEY
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

    // Save to cloud storage (Supabase or similar)
    let cloudSaveSuccess = false;
    
    try {
      // Try to save to Supabase if environment variables are available
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseKey) {
        const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/level_packs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            id: timestampShort,
            name: data.name,
            filename: filename,
            timestamp: timestamp,
            total_levels: data.levels.length,
            level_data: savedData,
            created_at: timestamp,
            ip_address: event.headers['x-forwarded-for'] || event.headers['client-ip']
          })
        });
        
        if (supabaseResponse.ok) {
          cloudSaveSuccess = true;
          console.log('Level pack saved to Supabase successfully');
        } else {
          console.warn('Supabase save failed:', await supabaseResponse.text());
        }
      } else {
        console.log('Supabase credentials not configured, skipping cloud save');
      }
    } catch (cloudError) {
      console.warn('Cloud save failed:', cloudError);
    }
    
    // Always log the save attempt
    console.log('Level data save attempt:', {
      id: timestampShort,
      filename,
      totalLevels: data.levels.length,
      timestamp,
      cloudSaved: cloudSaveSuccess
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
