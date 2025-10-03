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
    console.log('Delete function called with event:', JSON.stringify(event, null, 2));
    
    // Get pack ID from query parameters
    const packId = event.queryStringParameters?.id;
    
    console.log('Extracted pack ID:', packId);
    console.log('All query parameters:', event.queryStringParameters);
    
    if (!packId) {
      console.log('ERROR: No pack ID provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Pack ID is required',
          received: event.queryStringParameters
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
        
        // First check if the record exists
        const checkUrl = `${supabaseUrl}/rest/v1/level_packs?id=eq.${packId}&select=id,name`;
        console.log('Checking if record exists:', checkUrl);
        
        const checkResponse = await fetch(checkUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        
        if (checkResponse.ok) {
          const existingRecords = await checkResponse.json();
          console.log('Existing records found:', existingRecords);
          
          if (existingRecords.length === 0) {
            console.log('No record found with ID:', packId);
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ 
                success: false, 
                error: 'Record not found',
                packId: packId
              })
            };
          }
        }
        
        const deleteUrl = `${supabaseUrl}/rest/v1/level_packs?id=eq.${packId}`;
        console.log('Delete URL:', deleteUrl);
        
        const supabaseResponse = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=representation'
          }
        });
        
        console.log('Supabase response status:', supabaseResponse.status);
        
        const responseText = await supabaseResponse.text();
        console.log('Supabase response body:', responseText);
        
        if (supabaseResponse.ok) {
          cloudDeleteSuccess = true;
          console.log('Level pack deleted from Supabase successfully');
          console.log('Deleted records:', responseText);
        } else {
          console.warn('Supabase delete failed:', supabaseResponse.status, responseText);
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
