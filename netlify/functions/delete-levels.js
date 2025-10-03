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
        console.log('Attempting Supabase delete for pack:', packId);
        console.log('Supabase URL:', supabaseUrl);
        
        const deleteUrl = `${supabaseUrl}/rest/v1/level_packs?id=eq.${packId}`;
        console.log('Delete URL:', deleteUrl);
        
        const supabaseResponse = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          }
        });
        
        console.log('Supabase response status:', supabaseResponse.status);
        
        if (supabaseResponse.ok) {
          cloudDeleteSuccess = true;
          console.log('Level pack deleted from Supabase successfully');
        } else {
          const errorText = await supabaseResponse.text();
          console.warn('Supabase delete failed:', supabaseResponse.status, errorText);
        }
      } catch (supabaseError) {
        console.warn('Supabase delete error:', supabaseError);
      }
    } else {
      console.log('Supabase credentials not configured, skipping cloud delete');
      console.log('SUPABASE_URL exists:', !!supabaseUrl);
      console.log('SUPABASE_ANON_KEY exists:', !!supabaseKey);
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
