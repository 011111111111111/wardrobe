import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from "react";
import { Outfit, OutfitItem } from "../types/Outfit";
import { outfitsApi } from "../services/api";

type TagData = {
  tag: string;
  count: number;
}[];

type OutfitFilters = {
  tags?: string[];
};

type OutfitContextType = {
  // Data
  outfits: Outfit[];
  tagData: TagData;

  // Filtering
  activeFilters: OutfitFilters;
  filteredOutfits: Outfit[];
  setFilter: (type: keyof OutfitFilters, value: any) => void;
  clearFilters: () => void;

  // CRUD operations
  getOutfit: (id: string) => Outfit | undefined;
  addOutfit: (outfit: Outfit) => void;
  updateOutfit: (outfit: Outfit) => void;
  deleteOutfit: (id: string) => void;

  // Helper functions
  getMaxZIndex: (outfitId: string) => number; // Added helper function
};

export const OutfitContext = createContext<OutfitContextType | null>(null);

export const OutfitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [activeFilters, setActiveFilters] = useState<OutfitFilters>({
    tags: [],
  });

  // Load outfits from API on mount
  useEffect(() => {
    const loadOutfits = async () => {
      try {
        const items = await outfitsApi.getAll();
        // Map API response to Outfit format
        const mappedOutfits = items.map((item: any) => ({
          id: item._id || item.id,
          imageUri: item.imageUri || '',
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          clothingItems: item.clothingItems || [],
          tags: item.tags || [],
          season: item.season || [],
          occasion: item.occasion || [],
        }));
        setOutfits(mappedOutfits);
      } catch (e) {
        console.error("Error loading outfits:", e);
      }
    };
    loadOutfits();
  }, []);

  // Memoized tag frequency data
  const tagData = useMemo(() => {
    const tagCounts = outfits.reduce((acc, outfit) => {
      outfit.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [outfits]);

  // Memoized filtered outfits
  const filteredOutfits = useMemo(() => {
    if (!activeFilters.tags || activeFilters.tags.length === 0) {
      return outfits;
    }

    const tagFilters = new Set(activeFilters.tags);

    return outfits.filter((outfit) => {
      return Array.from(tagFilters).every((tag) => outfit.tags.includes(tag));
    });
  }, [outfits, activeFilters]);

  // Filter management
  const setFilter = useCallback((type: keyof OutfitFilters, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters({
      tags: [],
    });
  }, []);

  // CRUD operations
  const getOutfit = useCallback(
    (id: string) => {
      return outfits.find((outfit) => outfit.id === id);
    },
    [outfits]
  );

  const addOutfit = useCallback(async (outfit: Outfit) => {
    try {
      const newOutfit = await outfitsApi.create({
        clothingItems: outfit.clothingItems,
        tags: outfit.tags,
        season: outfit.season,
        occasion: outfit.occasion,
        imageUri: outfit.imageUri,
      });
      
      const mappedOutfit: Outfit = {
        id: newOutfit._id || newOutfit.id,
        imageUri: newOutfit.imageUri || '',
        createdAt: newOutfit.createdAt,
        updatedAt: newOutfit.updatedAt,
        clothingItems: newOutfit.clothingItems || [],
        tags: newOutfit.tags || [],
        season: newOutfit.season || [],
        occasion: newOutfit.occasion || [],
      };
      
      setOutfits((prev) => [...prev, mappedOutfit]);
    } catch (error) {
      console.error("Error adding outfit:", error);
      throw error;
    }
  }, []);

  const updateOutfit = useCallback(async (updatedOutfit: Outfit) => {
    try {
      const updated = await outfitsApi.update(updatedOutfit.id, updatedOutfit);
      const mappedOutfit: Outfit = {
        id: updated._id || updated.id,
        imageUri: updated.imageUri || updatedOutfit.imageUri,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
        clothingItems: updated.clothingItems || updatedOutfit.clothingItems,
        tags: updated.tags || updatedOutfit.tags,
        season: updated.season || updatedOutfit.season,
        occasion: updated.occasion || updatedOutfit.occasion,
      };
      
      setOutfits((prev) =>
        prev.map((outfit) =>
          outfit.id === updatedOutfit.id ? mappedOutfit : outfit
        )
      );
    } catch (error) {
      console.error("Error updating outfit:", error);
      throw error;
    }
  }, []);

  const deleteOutfit = useCallback(async (id: string) => {
    try {
      await outfitsApi.delete(id);
      setOutfits((prev) => prev.filter((outfit) => outfit.id !== id));
    } catch (error) {
      console.error("Error deleting outfit:", error);
      throw error;
    }
  }, []);

  // Helper function to get max zIndex for an outfit
  const getMaxZIndex = useCallback(
    (outfitId: string) => {
      const outfit = outfits.find((o) => o.id === outfitId);
      if (!outfit) return 0;

      return Math.max(0, ...outfit.clothingItems.map((item) => item.zIndex));
    },
    [outfits]
  );

  const contextValue = {
    outfits,
    tagData,
    activeFilters,
    filteredOutfits,
    setFilter,
    clearFilters,
    getOutfit,
    addOutfit,
    updateOutfit,
    deleteOutfit,
    getMaxZIndex,
  };

  return <OutfitContext.Provider value={contextValue}>{children}</OutfitContext.Provider>;
};
