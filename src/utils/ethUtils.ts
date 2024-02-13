import { ethers } from 'ethers';

export const isValidAddress = (address: string): boolean => {
  return ethers.utils.isAddress(address);
};
