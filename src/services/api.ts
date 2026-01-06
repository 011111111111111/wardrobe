const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

// Helper function to get userId (for now, using a default or from storage)
const getUserId = async (): Promise<string> => {
  // In a real app, you'd get this from auth context or storage
  // For now, using a default or stored value
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  let userId = await AsyncStorage.getItem('userId');
  if (!userId) {
    userId = `user-${Date.now()}`;
    await AsyncStorage.setItem('userId', userId);
  }
  return userId;
};

// Helper function for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Clothing API
export const clothingApi = {
  getAll: async (): Promise<any[]> => {
    const userId = await getUserId();
    return apiCall(`/clothing?userId=${userId}`);
  },

  getById: async (id: string): Promise<any> => {
    return apiCall(`/clothing/${id}`);
  },

  create: async (imageUri: string, imageData: any): Promise<any> => {
    const userId = await getUserId();
    const formData = new FormData();
    
    // For React Native, FormData handles file uploads differently
    const filename = imageUri.split('/').pop() || 'image.jpg';
    const fileType = imageUri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
    
    formData.append('image', {
      uri: imageUri,
      type: fileType,
      name: filename,
    } as any);
    formData.append('userId', userId);

    const apiUrl = `${API_BASE_URL}/clothing`;
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let fetch set it with boundary
    });

    if (!apiResponse.ok) {
      const error = await apiResponse.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${apiResponse.status}`);
    }

    return apiResponse.json();
  },

  update: async (id: string, updates: any): Promise<any> => {
    return apiCall(`/clothing/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  delete: async (id: string): Promise<void> => {
    return apiCall(`/clothing/${id}`, {
      method: 'DELETE',
    });
  },

  updateUsage: async (id: string, action: 'worn' | 'washed'): Promise<any> => {
    return apiCall(`/clothing/${id}/usage`, {
      method: 'PATCH',
      body: JSON.stringify({ action }),
    });
  },
};

// Outfits API
export const outfitsApi = {
  getAll: async (): Promise<any[]> => {
    const userId = await getUserId();
    return apiCall(`/outfits?userId=${userId}`);
  },

  getById: async (id: string): Promise<any> => {
    return apiCall(`/outfits/${id}`);
  },

  create: async (outfitData: {
    clothingItems: any[];
    tags?: string[];
    season?: string[];
    occasion?: string[];
    imageUri?: string;
  }): Promise<any> => {
    const userId = await getUserId();
    const formData = new FormData();
    
    formData.append('userId', userId);
    formData.append('clothingItems', JSON.stringify(outfitData.clothingItems));
    formData.append('tags', JSON.stringify(outfitData.tags || []));
    formData.append('season', JSON.stringify(outfitData.season || []));
    formData.append('occasion', JSON.stringify(outfitData.occasion || []));

    if (outfitData.imageUri) {
      const filename = outfitData.imageUri.split('/').pop() || 'outfit.jpg';
      const fileType = outfitData.imageUri.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
      
      formData.append('image', {
        uri: outfitData.imageUri,
        type: fileType,
        name: filename,
      } as any);
    }

    const apiUrl = `${API_BASE_URL}/outfits`;
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let fetch set it with boundary
    });

    if (!apiResponse.ok) {
      const error = await apiResponse.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${apiResponse.status}`);
    }

    return apiResponse.json();
  },

  update: async (id: string, updates: any): Promise<any> => {
    const formData = new FormData();
    
    Object.keys(updates).forEach(key => {
      if (key === 'imageUri' && updates[key]) {
        // Handle image upload
        const filename = updates[key].split('/').pop() || 'outfit.jpg';
        const fileType = updates[key].toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
        formData.append('image', {
          uri: updates[key],
          type: fileType,
          name: filename,
        } as any);
      } else if (typeof updates[key] === 'object' && updates[key] !== null) {
        formData.append(key, JSON.stringify(updates[key]));
      } else if (updates[key] !== undefined) {
        formData.append(key, updates[key]);
      }
    });

    const apiUrl = `${API_BASE_URL}/outfits/${id}`;
    const apiResponse = await fetch(apiUrl, {
      method: 'PUT',
      body: formData,
      // Don't set Content-Type header - let fetch set it with boundary
    });

    if (!apiResponse.ok) {
      const error = await apiResponse.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${apiResponse.status}`);
    }

    return apiResponse.json();
  },

  delete: async (id: string): Promise<void> => {
    return apiCall(`/outfits/${id}`, {
      method: 'DELETE',
    });
  },
};

// Health check
export const healthCheck = async (): Promise<any> => {
  return apiCall('/health');
};

