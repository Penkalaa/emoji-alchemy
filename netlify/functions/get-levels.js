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
    let levelPacks = [];
    let cloudFetchSuccess = false;
    
    // Try to fetch from Supabase if environment variables are available
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      try {
        const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/level_packs?select=id,name,filename,timestamp,total_levels,created_at,level_data&order=created_at.desc&limit=20`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        
        if (supabaseResponse.ok) {
          const supabaseData = await supabaseResponse.json();
          
          // Transform Supabase data to our format
          levelPacks = supabaseData.map(pack => ({
            id: pack.id,
            filename: pack.filename,
            name: pack.name,
            timestamp: pack.timestamp,
            totalLevels: pack.total_levels,
            levels: pack.level_data ? pack.level_data.levels : [], // Extract levels from level_data
            preview: [`📦 ${pack.name}`, `🎮 ${pack.total_levels} levels`, `📅 ${new Date(pack.created_at).toLocaleDateString()}`],
            source: 'cloud'
          }));
          
          cloudFetchSuccess = true;
          console.log(`Fetched ${levelPacks.length} level packs from Supabase`);
        } else {
          console.warn('Supabase fetch failed:', await supabaseResponse.text());
        }
      } catch (fetchError) {
        console.warn('Cloud fetch error:', fetchError);
      }
    } else {
      console.log('Supabase credentials not configured, returning empty array');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: cloudFetchSuccess ? 
          `Found ${levelPacks.length} level packs from cloud storage.` : 
          'Cloud storage not configured or unavailable. Using localStorage for level management.',
        data: levelPacks,
        total: levelPacks.length,
        cloudEnabled: cloudFetchSuccess,
        note: cloudFetchSuccess ? 
          'Level packs loaded from cloud storage (Supabase).' : 
          'Level packs are stored in localStorage. Configure SUPABASE_URL and SUPABASE_ANON_KEY for cloud storage.'
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
