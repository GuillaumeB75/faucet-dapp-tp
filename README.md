# **_SAGISTAMI FAUCET DAPP_** ![Rhino Team](./src/logo_large.png)

[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)

## _Built by "Rhino Team" Alyra_ ![Rhino Team](./public/favicon.ico)

#### _Developers : LokiDieKatze, StellaGreen, Benmissi-A, GuillaumeB75_

---

## Description

- testnet use : Rinkeby
- SAGISTAMI FAUCET dApp

  This repository contains a simple ERC-20 faucet dApp that will distibute an ERC-20 token called SAGISTAMI to whomever interacts with our dApp.

## Smart contracts

- Token.sol

  It's a simple ERC-20 token that is implemented using @openzeppelin's smart contract suite. Currently this contract will automatically mint 8000 tokens when deployed.

```

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 *@dev Token is {Ownable}, {ERC20}
 */

contract Token is Ownable, ERC20 {

```

- Faucet.sol

  It's the actual Faucet contract. It's a configurable contract that can be deployed for any ERC-20 token and the amount as well as the frequency for requesting funds from the faucet can be configured.
  
---

## Installation

To use this dApp you need to "git clone" those two repositories :

- Back-end :

```
git clone https://github.com/Benmissi-A/faucet-hardhat-tp
cd faucet-hardhat-tp
yarn
```

- Front-end :

```
git clone https://github.com/Benmissi-A/faucet-dapp-tp
cd faucet-dapp-tp
yarn
```
