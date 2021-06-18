# **_SAGISTAMI FAUCET DAPP_** ![Rhino Team](./src/logo_small.png)

[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)

## _Built by "Rhino Team" Alyra_ ![Rhino Team](./public/favicon.ico)

#### _Developers : LokiDieKatze, StellaGreen, Benmissi-A, GuillaumeB75_

[![create-buy LokieDieKatze](https://img.shields.io/badge/create%20buy-LokiDieKatze-FFA07A)](https://github.com/LokiDieKatze)
[![create-buy StellaGreen](https://img.shields.io/badge/create%20buy-StellaGreen-FFA07A)](https://github.com/StellaGreen)
[![create-buy Benmissi-A](https://img.shields.io/badge/create%20buy-Benmissi-FFA07A)](https://github.com/Benmissi-A)
[![create-buy LokieDieKatze](https://img.shields.io/badge/create%20buy-GuillaumeB75-FFA07A)](https://github.com/GuillaumeB75)

---

## Description

- testnet use : Rinkeby
- **SAGISTAMI FAUCET dApp**

  This repository contains a simple ERC-20 faucet dApp that will distibute an ERC-20 token called SAGISTAMI to whomever interacts with our dApp.

## Smart contracts

- **Token.sol**

  It's a simple ERC-20 token that is implemented using @openzeppelin's smart contract suite. Currently, by default, this contract will automatically mint 8000 tokens when deployed.

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

- **Faucet.sol**

  It's the actual Faucet contract. It's a configurable contract that can be deployed for any ERC-20 token and the amount as well as the frequency for requesting funds from the faucet can be configured. By default, the frequency is set to 3 days.

---

## Installation

To use this dApp you need to "git clone" this repository :

- faucet-dapp :

```
git clone https://github.com/Benmissi-A/faucet-dapp-tp
cd faucet-dapp-tp
yarn
```
