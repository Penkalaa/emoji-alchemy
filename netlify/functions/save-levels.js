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
    
    console.log('Save function called with data:', JSON.stringify(data, null, 2));
    
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

    // Determine if this is an update (has existing ID) or create (new)
    const isUpdate = data.id && data.id.length > 0;
    const timestamp = new Date().toISOString();
    
    let packId, filename;
    
    if (isUpdate) {
      // Use existing ID for update
      packId = data.id;
      filename = data.filename || `${data.name}-${packId}.json`;
      console.log('UPDATE operation for existing pack:', packId);
    } else {
      // Create new ID for new pack
      packId = timestamp.slice(0, 19).replace(/[:-]/g, '');
      filename = `${data.name}-${packId}.json`;
      console.log('CREATE operation for new pack:', packId);
    }
    
    // Prepare response data
    const savedData = {
      id: packId,
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
        let supabaseResponse;
        
        if (isUpdate) {
          // UPDATE existing record
          console.log('Updating existing record in Supabase:', packId);
          supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/level_packs?id=eq.${packId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              name: data.name,
              filename: filename,
              timestamp: timestamp,
              total_levels: data.levels.length,
              level_data: savedData
            })
          });
        } else {
          // CREATE new record
          console.log('Creating new record in Supabase:', packId);
          supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/level_packs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              id: packId,
              name: data.name,
              filename: filename,
              timestamp: timestamp,
              total_levels: data.levels.length,
              level_data: savedData,
              created_at: timestamp,
              ip_address: event.headers['x-forwarded-for'] || event.headers['client-ip']
            })
          });
        }
        
        if (supabaseResponse.ok) {
          const responseText = await supabaseResponse.text();
          console.log(`Supabase response body for ${isUpdate ? 'update' : 'create'}:`, responseText);
          
          if (isUpdate) {
            // For updates, check if any rows were affected
            const updatedRecords = responseText ? JSON.parse(responseText) : [];
            
            if (updatedRecords.length > 0) {
              cloudSaveSuccess = true;
              console.log('Level pack updated in Supabase successfully');
              console.log('Updated records:', responseText);
            } else {
              console.warn('Supabase update returned 200 but no records were updated!');
              console.warn('This usually means RLS (Row Level Security) is blocking the update');
              
              return {
                statusCode: 403,
                headers,
                body: JSON.stringify({
                  success: false,
                  error: 'Update blocked - possibly due to Row Level Security (RLS)',
                  details: 'Record exists but could not be updated. Check Supabase RLS policies.',
                  packId: packId,
                  isUpdate: true,
                  responseBody: responseText
                })
              };
            }
          } else {
            // For creates, any 200 response is success
            cloudSaveSuccess = true;
            console.log('Level pack created in Supabase successfully');
          }
        } else {
          const errorText = await supabaseResponse.text();
          console.warn(`Supabase ${isUpdate ? 'update' : 'save'} failed:`, errorText);
          
          return {
            statusCode: supabaseResponse.status,
            headers,
            body: JSON.stringify({
              success: false,
              error: `Supabase ${isUpdate ? 'update' : 'save'} failed: ${supabaseResponse.status}`,
              details: errorText,
              packId: packId,
              isUpdate: isUpdate
            })
          };
        }
      } else {
        console.log('Supabase credentials not configured, skipping cloud save');
      }
    } catch (cloudError) {
      console.warn('Cloud save failed:', cloudError);
    }
    
    // Always log the save attempt
    console.log('Level data save attempt:', {
      id: packId,
      filename,
      totalLevels: data.levels.length,
      timestamp,
      isUpdate,
      cloudSaved: cloudSaveSuccess
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: isUpdate ? 'Level pack updated successfully!' : 'Level pack created successfully!',
        data: {
          id: packId,
          filename: filename,
          timestamp: timestamp,
          totalLevels: data.levels.length,
          isUpdate: isUpdate
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
