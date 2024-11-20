# Arbitrum dApp Dashboard

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

Arbitrum dApp Dashboard is a comprehensive platform designed to streamline the development, deployment, and management of decentralized applications (dApps) on the Arbitrum network. This application addresses the challenges faced by developers in the blockchain space, particularly those working with Arbitrum's layer 2 scaling solution.

**Live Demo:** [Loom Video](https://www.loom.com/share/2e494ae9ebcb4afcbb48f42a1fa8ea8f)

**Live Url:** [https://arbitrum-dapp-dashboard.example.com](https://arbitrum-dapp-dashboard.example.com)

### Problem Statement

Developing and deploying smart contracts on blockchain networks, especially layer 2 solutions like Arbitrum, can be complex and time-consuming. Developers often struggle with:

1. Setting up the development environment
2. Writing and testing smart contracts
3. Deploying contracts to the network
4. Accessing relevant documentation and resources
5. Connecting with the community for support

The Arbitrum dApp Dashboard solves these problems by providing an all-in-one solution that simplifies the entire dApp development lifecycle on Arbitrum.

## Features

1. **Dashboard**: A central hub for managing your Arbitrum projects and accessing key features.
2. **Single File Deploy**: Easily deploy Solidity smart contracts to the Arbitrum network with a simple interface.
3. **Contract Templates**: Access pre-built, customizable smart contract templates to kickstart your development.
4. **Resources**:
   - Documentation: Comprehensive guides and API references.
   - Tutorials: Step-by-step learning materials for Arbitrum development.
   - Community: Connect with other Arbitrum developers and get support.
   - Tools: Access to essential development tools and utilities.
5. **Chat Support**: Get real-time assistance with an AI-powered chat interface.

## Architecture

The Arbitrum dApp Dashboard consists of a front-end React application and a back-end Express.js server.

### Front-end

The front-end is built with React and uses react-router-dom for routing. Key components include:

- Dashboard: The main landing page
- SingleFileDeploy: Interface for deploying individual smart contracts
- Templates: Browse and use pre-built contract templates
- Resources: Access documentation, tutorials, community, and tools
- Chat: AI-powered support chat interface

### Back-end

The back-end is an Express.js server that handles:

- Contract compilation and deployment
- File uploads (using Multer)
- Input validation
- Chat functionality

## Installation

To set up the Arbitrum dApp Dashboard locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/fadexadex/Arbitrum-Dev-Help.git
   cd Arbitrum-Dev-Help
   
2. Install dependencies for both front-end and back-end:

   ```bash
   # Install front-end dependencies
   cd front-end
   npm install

   # Install back-end dependencies
   cd ../back-end
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the server directory with the following variables:
   ```
   PORT=6190
   ARBITRUM_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
   PRIVATE_KEY=your_private_key_here
   ```

## Usage

To run the application locally:

1. Start the back-end server:

   ```bash
   cd backend
   npm start
   ```

2. In a new terminal, start the front-end development server:

   ```bash
   cd front-end
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to access the Arbitrum dApp Dashboard.

