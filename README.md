# Trading Studio: Next.js + TypeScript Assignment

## Overview

**Trading Studio** is an online platform that allows users to create and manage trading/investment strategies. The platform enables users to design strategies, backtest them with historical data, and track the execution status of strategies. Users can define multiple strategy stages such as scanning, buying, selling, and simulation, and evaluate the performance based on predefined rules and configurations.

## Features

- **Create a New Strategy**: Build a new strategy from scratch.
- **Save Incomplete Strategy**: Save progress on a strategy and return to work on it later.
- **Submit for Simulation**: Submit a strategy for simulation and track execution status.
- **Track Execution Status**: Monitor the progress of in-progress strategies.
- **Load Completed Strategy Results**: Retrieve results for strategies that have finished executing.
- **Fetch Saved Strategies**: View a list of all previously saved strategies.
- **Copy a Strategy**: Duplicate an existing saved strategy to create a new one.

## Strategy Structure

A strategy consists of the following four key stages:

### 1. **Scanner Step**

The goal of the Scanner Step is to identify all financial instruments that meet a certain set of rules for a given day.

- **Example Scanner Rule**:
  - Instruments must meet the following criteria:
    - Instrument type: EQUITY
    - Exchange: NSE
    - Price growth over the last 300 days should be greater than 0%
    - Price of the instrument should be greater than 99
    - OR the instrument should be among the top 10% by market capitalization with a 90-day average transaction value greater than 300 million.

### 2. **Buy Step**

The Buy Step filters instruments that meet the defined criteria for entering a position.

- **Example Buy Rule**:
  - Last price must be greater than or equal to the last 30-day close price.
  - Last price must be greater than or equal to the last 30-day moving average.

### 3. **Sell Step**

The Sell Step defines the rules for exiting a position.

- **Example Sell Rule**:
  - Trailing stop-loss is set to 10%.
  - Positions must be held for at least 5 days before exiting.

### 4. **Simulation Step**

The Simulation Step simulates the portfolio using a given configuration based on the instruments shortlisted in the previous steps.

- **Example Simulation Rule**:
  - Initial margin: 100,000
  - Simulation date range: From `01/01/2000` to `20/03/2025`
  - Maximum open positions: 20
  - Each instrument can have a maximum of 1 position.
  - The sorting type for entering positions is based on the top 300 days' performance.

## Usage

Once the app is running, you can interact with it to:

- **Create and manage trading strategies**: Build new strategies, save them, and return to work on them later.
- **Define your scanning, buying, selling, and simulation rules**: Set the conditions for each stage of the strategy process.
- **Track strategy execution status**: Monitor the progress of the strategy simulation and get real-time updates on its execution.
- **Load results of previously executed strategies**: Retrieve the results of strategies that have finished execution.
- **View a list of saved strategies**: Access and manage all previously saved strategies.
- **Copy an existing strategy**: Duplicate a saved strategy to create a new one based on a previous configuration.


## Assumptions

- The platform assumes the user has a basic understanding of trading and financial instruments.
- The platform requires external APIs or data sources for retrieving real-time and historical financial data.
- Users must provide their own configuration for each strategy stage, including scanner, buy, sell, and simulation rules.
- It is assumed that the system will handle various instruments like equities, commodities, or other financial products, as defined by the user.
- Users should be aware that running simulations can take time based on the historical data available and the complexity of the strategy.

## Prerequisites

Before running the app locally, make sure you have the following installed:

- **Node.js** (Version 14.x or higher)
  - Install from [nodejs.org](https://nodejs.org/).
- **Yarn** or **npm** (Node.js package managers)
  - Install Yarn via `npm install --global yarn` (optional, npm is also acceptable).

## Installation

To run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Moscolape/trading-studio.git
