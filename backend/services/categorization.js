const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const categories = {
  'Tops': ['T-Shirt', 'Shirt', 'Blouse', 'Sweater', 'Hoodie', 'Jacket', 'Coat', 'Tank Top', 'Crop Top'],
  'Bottoms': ['Jeans', 'Pants', 'Shorts', 'Skirt', 'Leggings', 'Sweatpants'],
  'Dresses': ['Casual Dress', 'Formal Dress', 'Sundress', 'Maxi Dress', 'Midi Dress'],
  'Outerwear': ['Jacket', 'Coat', 'Blazer', 'Cardigan', 'Vest'],
  'Shoes': ['Sneakers', 'Boots', 'Heels', 'Flats', 'Sandals', 'Loafers'],
  'Accessories': ['Hat', 'Bag', 'Belt', 'Scarf', 'Jewelry', 'Watch'],
};

const colors = ['Black', 'White', 'Gray', 'Navy', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Pink', 'Purple', 'Brown', 'Beige', 'Tan', 'Olive', 'Maroon', 'Burgundy', 'Teal', 'Turquoise', 'Coral', 'Lavender', 'Gold', 'Silver', 'Bronze'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
const occasions = ['Casual', 'Work', 'Formal', 'Party', 'Sport', 'Beach', 'Travel'];

/**
 * Categorize clothing item using OpenAI GPT-4o
 * @param {string} imageUrl - URL of the image to categorize
 * @returns {Promise<Object>} - Categorized clothing data
 */
const categorizeClothing = async (imageUrl) => {
  try {
    console.log('[Categorization Service] Request initiated:', new Date().toISOString());

    const categoriesAndSubcategories = Object.entries(categories)
      .map(([category, subcategories]) => {
        const subcategoriesList = subcategories.join(', ');
        return `${category}: ${subcategoriesList}`;
      })
      .join('; ');

    const colorList = colors.join(', ');
    const seasonList = seasons.join(', ');
    const occasionList = occasions.join(', ');

    const systemPrompt = `You are an AI assistant that categorizes clothing items based on images.
    The possible categories and their subcategories are: ${categoriesAndSubcategories}.
    The possible colors are: ${colorList}.
    The possible seasons are: ${seasonList}.
    The possible occasions are: ${occasionList}.
    Please provide the most appropriate category, subcategory, colors, seasons, and occasions for the given clothing item.
    The category and subcategory should be selected from the list of categories and subcategories provided.
    Ensure that the subcategory corresponds to the correct category.
    If more than one color applies, please provide the top 5 colors in the order of decreasing prominence.
    More than one season or occasion may apply, so please provide all that are relevant.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please categorize this clothing item based on the image.',
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'low',
              },
            },
          ],
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'clothing_categorization',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              category: { type: 'string' },
              subcategory: { type: 'string' },
              color: { type: 'array', items: { type: 'string' } },
              season: { type: 'array', items: { type: 'string' } },
              occasion: { type: 'array', items: { type: 'string' } },
            },
            required: ['category', 'subcategory', 'color', 'season', 'occasion'],
            additionalProperties: false,
          },
        },
      },
    });

    console.log('[Categorization Service] Response received:', new Date().toISOString());

    const aiContent = response.choices[0].message.content;
    const parsedData = JSON.parse(aiContent);

    return {
      category: parsedData.category,
      subcategory: parsedData.subcategory,
      color: parsedData.color,
      season: parsedData.season,
      occasion: parsedData.occasion,
    };
  } catch (error) {
    console.error('Error categorizing clothing:', error);
    throw error;
  }
};

module.exports = {
  categorizeClothing,
  categories,
  colors,
  seasons,
  occasions
};

