exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'DELETE, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow DELETE method
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Method not allowed. Use DELETE.' 
      })
    };
  }

  try {
    // Get pack ID from query parameters
    const packId = event.queryStringParameters?.id;
    
    if (!packId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Pack ID is required' 
        })
      };
    }

    console.log('Attempting to delete pack:', packId);

    // Try to delete from Supabase if environment variables are available
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    let cloudDeleteSuccess = false;
    
    if (supabaseUrl && supabaseKey) {
      try {
        const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/level_packs?id=eq.${packId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          }
        });
        
        if (supabaseResponse.ok) {
          cloudDeleteSuccess = true;
          console.log('Level pack deleted from Supabase successfully');
        } else {
          const errorText = await supabaseResponse.text();
          console.warn('Supabase delete failed:', errorText);
        }
      } catch (supabaseError) {
        console.warn('Supabase delete error:', supabaseError);
      }
    } else {
      console.log('Supabase credentials not configured, skipping cloud delete');
    }

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        cloudDeleted: cloudDeleteSuccess,
        message: cloudDeleteSuccess 
          ? 'Pack deleted from cloud storage' 
          : 'Pack deleted locally (cloud unavailable)',
        packId: packId
      })
    };

  } catch (error) {
    console.error('Delete function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Internal server error',
        details: error.message
      })
    };
  }
};
