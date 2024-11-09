import { ethers } from 'ethers'

export class WalletService {
  private wallet: ethers.Wallet | null = null
  
  // Generate a new wallet
  createWallet(): string {
    this.wallet = ethers.Wallet.createRandom()
    return this.wallet.address
  }

  // Get existing wallet address
  getAddress(): string | null {
    return this.wallet?.address || null
  }

  // Save wallet to local storage (encrypted)
  async saveWallet(password: string): Promise<void> {
    if (!this.wallet) return
    
    const encrypted = await this.wallet.encrypt(password)
    localStorage.setItem('wallet', encrypted)
  }

  // Load wallet from local storage
  async loadWallet(password: string): Promise<boolean> {
    const encrypted = localStorage.getItem('wallet')
    if (!encrypted) return false

    try {
      this.wallet = await ethers.Wallet.fromEncryptedJson(encrypted, password)
      return true
    } catch (error) {
      console.error('Error loading wallet:', error)
      return false
    }
  }
} 