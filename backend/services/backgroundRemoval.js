const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const FAL_API_KEY = process.env.FAL_API_KEY;
const API_ENDPOINT = 'https://queue.fal.run/fal-ai/birefnet/v2';

/**
 * Remove background from an image using fal.ai API
 * @param {string} imageUrl - URL of the image to process
 * @returns {Promise<string>} - URL of the processed image
 */
const removeBackground = async (imageUrl) => {
  try {
    console.log('[BG Removal Service] Request initiated:', new Date().toISOString());

    // Prepare the payload
    const payload = {
      image_url: imageUrl,
      model: 'General Use (Light)',
      operating_resolution: '1024x1024',
      output_format: 'png',
      refine_foreground: true,
    };

    // Submit the request
    const response = await axios.post(API_ENDPOINT, payload, {
      headers: {
        Authorization: `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('[BG Removal Service] Request submitted:', new Date().toISOString());

    if (!response.data.status_url || !response.data.response_url) {
      throw new Error('Invalid response from background removal API');
    }

    const { status_url, response_url } = response.data;

    // Poll for status
    let status = '';
    let attempts = 0;
    const maxAttempts = 150; // 30 seconds max (200ms * 150)

    while (status !== 'COMPLETED' && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      attempts++;

      const statusResponse = await axios.get(status_url, {
        headers: {
          Authorization: `Key ${FAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      status = statusResponse.data.status;

      if (status === 'FAILED' || status === 'CANCELLED') {
        throw new Error(`Background removal request ${status}`);
      }
    }

    if (status !== 'COMPLETED') {
      throw new Error('Background removal request timed out');
    }

    // Get the result
    const resultResponse = await axios.get(response_url, {
      headers: {
        Authorization: `Key ${FAL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('[BG Removal Service] Process complete:', new Date().toISOString());

    const imageUrl = resultResponse.data.image?.url;

    if (!imageUrl) {
      throw new Error('No image URL in the result');
    }

    return imageUrl;
  } catch (error) {
    console.error('Error in removeBackground:', error);
    throw error;
  }
};

module.exports = {
  removeBackground
};

