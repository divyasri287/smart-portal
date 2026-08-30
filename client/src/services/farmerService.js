/**
 * FarmerService - Placeholder API service for Farmer module (Member 1)
 */

import farmersData from '../data/farmers.json';

export const farmerService = {
  getFarmerProfile: async (farmerId) => {
    console.log('[Placeholder API] farmerService.getFarmerProfile called:', farmerId);
    return farmersData[0];
  },
  updateProfile: async (profileData) => {
    console.log('[Placeholder API] farmerService.updateProfile called:', profileData);
    return { success: true };
  },
};
