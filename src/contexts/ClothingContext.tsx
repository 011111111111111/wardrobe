import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { ClothingItem, createNewClothingItem } from "../types/ClothingItem";
import { categories } from "../data/categories";
import { clothingApi } from "../services/api";

type CategoryCounts = {
  All: number;
  [key: string]: number;
};

type TagData = {
  tag: string;
  count: number;
}[];

type ClothingFilters = {
  category?: string;
  tags?: string[];
};

type ProcessingError = {
  message: string;
  code?: string;
};

type ProcessingCallbacks = {
  onBackgroundRemovalComplete?: () => void;
  onCategorizationComplete?: () => void;
  onError?: (error: ProcessingError) => void;
};

type ClothingContextType = {
  // Data
  clothingItems: ClothingItem[];
  categoryData: CategoryCounts;
  tagData: TagData;

  // Filtering
  activeFilters: ClothingFilters;
  filteredItems: ClothingItem[];
  setFilter: (type: keyof ClothingFilters, value: any) => void;
  clearFilters: () => void;

  // CRUD operations
  getClothingItem: (id: string) => ClothingItem | undefined;
  addClothingItemFromImage: (imageUri: string, callbacks?: ProcessingCallbacks) => Promise<string>; // Returns new item ID
  updateClothingItem: (item: ClothingItem) => void;
  deleteClothingItem: (id: string) => void;
};

export const ClothingContext = createContext<ClothingContextType | null>(null);

export const ClothingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [activeFilters, setActiveFilters] = useState<ClothingFilters>({
    category: "All",
    tags: [],
  });

  // Load clothing items from API on mount
  useEffect(() => {
    const loadClothingItems = async () => {
      try {
        const items = await clothingApi.getAll();
        // Map API response to ClothingItem format
        const mappedItems = items.map((item: any) => ({
          id: item._id || item.id,
          imageUri: item.imageUri,
          backgroundRemovedImageUri: item.backgroundRemovedImageUri || '',
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          category: item.category || '',
          subcategory: item.subcategory || '',
          tags: item.tags || [],
          color: item.color || [],
          season: item.season || [],
          occasion: item.occasion || [],
          brand: item.brand || '',
          purchaseDate: item.purchaseDate || '',
          price: item.price || 0,
          processingStatus: item.processingStatus || {
            backgroundRemoval: 'pending',
            categorization: 'pending',
          },
          processingError: item.processingError,
          lastWorn: item.lastWorn,
          wearCount: item.wearCount || 0,
          lastWashed: item.lastWashed,
          washCount: item.washCount || 0,
        }));
        setClothingItems(mappedItems);
      } catch (e) {
        console.error("Error loading clothing items:", e);
      }
    };
    loadClothingItems();
  }, []);

  // Memoized category counts
  const categoryData = useMemo(() => {
    let counts: CategoryCounts = { All: clothingItems.length };

    // Use reduce for better performance than forEach
    counts = Object.keys(categories).reduce((acc, category) => {
      acc[category] = clothingItems.reduce((count, item) => (item.category === category ? count + 1 : count), 0);
      return acc;
    }, counts);

    return counts;
  }, [clothingItems]);

  // Memoized tag frequency data
  const tagData = useMemo(() => {
    // Use reduce to build tag counts in a single pass
    const tagCounts = clothingItems.reduce((acc, item) => {
      item.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by frequency
    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [clothingItems]);

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    // Early return if no filters are active
    if (activeFilters.category === "All" && (!activeFilters.tags || activeFilters.tags.length === 0)) {
      return clothingItems;
    }

    // Create a Set of tag filters for O(1) lookup
    const tagFilters = new Set(activeFilters.tags);

    return clothingItems.filter((item) => {
      // Category filter
      if (activeFilters.category !== "All" && item.category !== activeFilters.category) {
        return false;
      }

      // Tag filter - only check if we have active tag filters
      if (tagFilters.size > 0) {
        return Array.from(tagFilters).every((tag) => item.tags.includes(tag));
      }

      return true;
    });
  }, [clothingItems, activeFilters]);

  // Filter management
  const setFilter = useCallback((type: keyof ClothingFilters, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters({
      category: "All",
      tags: [],
    });
  }, []);

  // CRUD operations
  const getClothingItem = useCallback(
    (id: string) => {
      return clothingItems.find((item) => item.id === id);
    },
    [clothingItems]
  );

  const addClothingItemFromImage = useCallback(
    async (imageUri: string, callbacks?: ProcessingCallbacks): Promise<string> => {
      try {
        // Create item via API (backend handles background removal and categorization)
        const newItem = await clothingApi.create(imageUri, {});
        
        // Map API response to ClothingItem format
        const mappedItem: ClothingItem = {
          id: newItem._id || newItem.id,
          imageUri: newItem.imageUri,
          backgroundRemovedImageUri: newItem.backgroundRemovedImageUri || '',
          createdAt: newItem.createdAt,
          updatedAt: newItem.updatedAt,
          category: newItem.category || '',
          subcategory: newItem.subcategory || '',
          tags: newItem.tags || [],
          color: newItem.color || [],
          season: newItem.season || [],
          occasion: newItem.occasion || [],
          brand: newItem.brand || '',
          purchaseDate: newItem.purchaseDate || '',
          price: newItem.price || 0,
          processingStatus: newItem.processingStatus || {
            backgroundRemoval: 'pending',
            categorization: 'pending',
          },
          processingError: newItem.processingError,
        };

        // Add to local state
        setClothingItems((prev) => [...prev, mappedItem]);

        // Poll for processing completion
        const pollProcessingStatus = async () => {
          const maxAttempts = 60; // 30 seconds
          let attempts = 0;
          
          const checkStatus = async () => {
            try {
              const updated = await clothingApi.getById(mappedItem.id);
              
              if (updated.processingStatus.backgroundRemoval === 'completed') {
                callbacks?.onBackgroundRemovalComplete?.();
              }
              if (updated.processingStatus.categorization === 'completed') {
                callbacks?.onCategorizationComplete?.();
              }
              
              if (updated.processingStatus.backgroundRemoval === 'error' || 
                  updated.processingStatus.categorization === 'error') {
                const error: ProcessingError = {
                  message: updated.processingError?.backgroundRemoval || 
                          updated.processingError?.categorization || 
                          'Processing error',
                };
                callbacks?.onError?.(error);
              }
              
              // Update local state
              setClothingItems((prev) =>
                prev.map((item) =>
                  item.id === mappedItem.id
                    ? {
                        ...item,
                        ...updated,
                        id: updated._id || updated.id,
                        backgroundRemovedImageUri: updated.backgroundRemovedImageUri || item.backgroundRemovedImageUri,
                        category: updated.category || item.category,
                        subcategory: updated.subcategory || item.subcategory,
                        color: updated.color || item.color,
                        season: updated.season || item.season,
                        occasion: updated.occasion || item.occasion,
                        processingStatus: updated.processingStatus,
                        processingError: updated.processingError,
                      }
                    : item
                )
              );
              
              // Continue polling if still processing
              if ((updated.processingStatus.backgroundRemoval === 'processing' || 
                   updated.processingStatus.backgroundRemoval === 'pending' ||
                   updated.processingStatus.categorization === 'processing' || 
                   updated.processingStatus.categorization === 'pending') &&
                  attempts < maxAttempts) {
                attempts++;
                setTimeout(checkStatus, 500);
              }
            } catch (error) {
              console.error('Error polling status:', error);
            }
          };
          
          checkStatus();
        };
        
        pollProcessingStatus();

        return mappedItem.id;
      } catch (error) {
        const processedError: ProcessingError = {
          message: error instanceof Error ? error.message : "An unknown error occurred",
          code: "UPLOAD_ERROR",
        };
        console.error("Error adding clothing item:", processedError);
        callbacks?.onError?.(processedError);
        throw error;
      }
    },
    []
  );

  const updateClothingItem = useCallback(async (updatedItem: ClothingItem) => {
    try {
      const updated = await clothingApi.update(updatedItem.id, updatedItem);
      setClothingItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? {
          ...updated,
          id: updated._id || updated.id,
        } : item))
      );
    } catch (error) {
      console.error("Error updating clothing item:", error);
      throw error;
    }
  }, []);

  const deleteClothingItem = useCallback(async (id: string) => {
    try {
      await clothingApi.delete(id);
      setClothingItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting clothing item:", error);
      throw error;
    }
  }, []);

  const contextValue = {
    // Data
    clothingItems,
    categoryData,
    tagData,

    // Filtering
    activeFilters,
    filteredItems,
    setFilter,
    clearFilters,

    // CRUD operations
    getClothingItem,
    addClothingItemFromImage,
    updateClothingItem,
    deleteClothingItem,
  };

  return <ClothingContext.Provider value={contextValue}>{children}</ClothingContext.Provider>;
};
