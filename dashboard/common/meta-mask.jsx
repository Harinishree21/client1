import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { ethers } from 'ethers';

const MetaMaskSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 507.83 470.86"><defs><style>.a{fill:#e2761b;stroke:#e2761b;}.a,.b,.c,.d,.e,.f,.g,.h,.i,.j{stroke-linecap:round;stroke-linejoin:round;}.b{fill:#e4761b;stroke:#e4761b;}.c{fill:#d7c1b3;stroke:#d7c1b3;}.d{fill:#233447;stroke:#233447;}.e{fill:#cd6116;stroke:#cd6116;}.f{fill:#e4751f;stroke:#e4751f;}.g{fill:#f6851b;stroke:#f6851b;}.h{fill:#c0ad9e;stroke:#c0ad9e;}.i{fill:#161616;stroke:#161616;}.j{fill:#763d16;stroke:#763d16;}</style></defs><title>metamask</title><polygon class="a" points="482.09 0.5 284.32 147.38 320.9 60.72 482.09 0.5"/><polygon class="b" points="25.54 0.5 221.72 148.77 186.93 60.72 25.54 0.5"/><polygon class="b" points="410.93 340.97 358.26 421.67 470.96 452.67 503.36 342.76 410.93 340.97"/><polygon class="b" points="4.67 342.76 36.87 452.67 149.57 421.67 96.9 340.97 4.67 342.76"/><polygon class="b" points="143.21 204.62 111.8 252.13 223.7 257.1 219.73 136.85 143.21 204.62"/><polygon class="b" points="364.42 204.62 286.91 135.46 284.32 257.1 396.03 252.13 364.42 204.62"/><polygon class="b" points="149.57 421.67 216.75 388.87 158.71 343.55 149.57 421.67"/><polygon class="b" points="290.88 388.87 358.26 421.67 348.92 343.55 290.88 388.87"/><polygon class="c" points="358.26 421.67 290.88 388.87 296.25 432.8 295.65 451.28 358.26 421.67"/><polygon class="c" points="149.57 421.67 212.18 451.28 211.78 432.8 216.75 388.87 149.57 421.67"/><polygon class="d" points="213.17 314.54 157.12 298.04 196.67 279.95 213.17 314.54"/><polygon class="d" points="294.46 314.54 310.96 279.95 350.71 298.04 294.46 314.54"/><polygon class="e" points="149.57 421.67 159.11 340.97 96.9 342.76 149.57 421.67"/><polygon class="e" points="348.72 340.97 358.26 421.67 410.93 342.76 348.72 340.97"/><polygon class="e" points="396.03 252.13 284.32 257.1 294.66 314.54 311.16 279.95 350.91 298.04 396.03 252.13"/><polygon class="e" points="157.12 298.04 196.87 279.95 213.17 314.54 223.7 257.1 111.8 252.13 157.12 298.04"/><polygon class="f" points="111.8 252.13 158.71 343.55 157.12 298.04 111.8 252.13"/><polygon class="f" points="350.91 298.04 348.92 343.55 396.03 252.13 350.91 298.04"/><polygon class="f" points="223.7 257.1 213.17 314.54 226.29 382.31 229.27 293.07 223.7 257.1"/><polygon class="f" points="284.32 257.1 278.96 292.87 281.34 382.31 294.66 314.54 284.32 257.1"/><polygon class="g" points="294.66 314.54 281.34 382.31 290.88 388.87 348.92 343.55 350.91 298.04 294.66 314.54"/><polygon class="g" points="157.12 298.04 158.71 343.55 216.75 388.87 226.29 382.31 213.17 314.54 157.12 298.04"/><polygon class="h" points="295.65 451.28 296.25 432.8 291.28 428.42 216.35 428.42 211.78 432.8 212.18 451.28 149.57 421.67 171.43 439.55 215.75 470.36 291.88 470.36 336.4 439.55 358.26 421.67 295.65 451.28"/><polygon class="i" points="290.88 388.87 281.34 382.31 226.29 382.31 216.75 388.87 211.78 432.8 216.35 428.42 291.28 428.42 296.25 432.8 290.88 388.87"/><polygon class="j" points="490.44 156.92 507.33 75.83 482.09 0.5 290.88 142.41 364.42 204.62 468.37 235.03 491.43 208.2 481.49 201.05 497.39 186.54 485.07 177 500.97 164.87 490.44 156.92"/><polygon class="j" points="0.5 75.83 17.39 156.92 6.66 164.87 22.56 177 10.44 186.54 26.34 201.05 16.4 208.2 39.26 235.03 143.21 204.62 216.75 142.41 25.54 0.5 0.5 75.83"/><polygon class="g" points="468.37 235.03 364.42 204.62 396.03 252.13 348.92 343.55 410.93 342.76 503.36 342.76 468.37 235.03"/><polygon class="g" points="143.21 204.62 39.26 235.03 4.67 342.76 96.9 342.76 158.71 343.55 111.8 252.13 143.21 204.62"/><polygon class="g" points="284.32 257.1 290.88 142.41 321.1 60.72 186.93 60.72 216.75 142.41 223.7 257.10 226.09 293.27 226.29 382.31 281.34 382.31 281.74 293.27 284.32 257.1"/></svg>
`;

export default function MetaMaskButton() {

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    // Check if wallet address is stored in local storage
    const storedAddress = localStorage.getItem("walletAddress");
    if (storedAddress) {
      setWalletAddress(storedAddress);
    }
  }, []);

  async function requestAccount() {
    console.log('Requesting account...');

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      setWalletAddress(address);
      localStorage.setItem("walletAddress", address); // Store address in local storage
      alert('Connected Successfully');
      window.location.reload();
    } catch (error) {
      alert('Error connecting...');
    }
  }

  function disconnectWallet() {
    // Clear wallet address from state and local storage
    setWalletAddress("");
    localStorage.removeItem("walletAddress");
    alert('Disconnected');
    window.location.reload();
  }

  async function connectWallet() {
    try {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Use the provider as needed
    } catch (error) {
      alert('MetaMask not detected or not installed. Please install MetaMask.');
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="inherit"
        startIcon={
          <div
            dangerouslySetInnerHTML={{ __html: MetaMaskSVG }}
            style={{ width: '24px', height: '24px' }}
          />
        }
        onClick={() => (walletAddress ? disconnectWallet() : connectWallet())}
      >
        {walletAddress ? `Connected: ${walletAddress}` : 'Connect With MetaMask'}
      </Button>
    </div>
  );
}