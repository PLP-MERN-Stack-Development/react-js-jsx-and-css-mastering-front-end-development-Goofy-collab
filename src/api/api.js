const API_BASE_URL = 'https://api.adviceslip.com';

/**
 * Fetch multiple advice slips
 * @param {number} page - Page number 
 * @param {number} limit - Number of items per page
 * @returns {Promise<Array>} - Array of advice
 */
export const fetchPosts = async (page = 1, limit = 10) => {
  try {
    // Fetch random advice one by one with delays to get different results
    const transformedData = [];
    const usedIds = new Set();
    
    for (let i = 0; i < limit; i++) {
      // Add a small delay between requests to get different random advice
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      const response = await fetch(`${API_BASE_URL}/advice`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Only add if we haven't seen this ID before
      if (!usedIds.has(data.slip.id)) {
        usedIds.add(data.slip.id);
        transformedData.push({
          id: data.slip.id,
          title: `Advice #${data.slip.id}`,
          body: data.slip.advice,
        });
      }
    }
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching advice:', error);
    throw error;
  }
};

/**
 * Fetch a single random advice
 * @param {string} id - Advice ID
 * @returns {Promise<Object>} - Advice object
 */
export const fetchPostById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/advice`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      id: data.slip.id,
      title: `Advice #${data.slip.id}`,
      body: data.slip.advice,
    };
  } catch (error) {
    console.error(`Error fetching advice:`, error);
    throw error;
  }
};

/**
 * Search advice by keyword
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of matching advice
 */
export const searchPosts = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/advice/search/${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        return []; // No advice found
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if slips exist
    if (!data.slips || data.slips.length === 0) {
      return [];
    }
    
    // Transform the data
    const transformedData = data.slips.map((slip) => ({
      id: slip.id,
      title: `Advice #${slip.id}`,
      body: slip.advice,
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Error searching advice:', error);
    throw error;
  }
};

