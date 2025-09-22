import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import axios from 'axios';
import gql from 'graphql-tag';
import { NextRequest } from 'next/server';

const typeDefs = gql`
  # Stock Data

  type Company {
    companyDescription: String!
  }
  type Price {
    NSE: Float!
  }
  type StockDetail {
    marketCap: Float!
    NetIncome: Float!
    interimNetIncome: Float!
    currentDividendYieldCommonStockPrimaryIssueLTM: Float!
  }
  type Display {
    displayName: String!
    value: String!
  }
  type StockType {
    INC: [Display]
  }
  type StockFinancial {
    stockFinancialMap: StockType
    FiscalYear: Int!
  }
  type Stock {
    companyName: String!
    currentPrice: Price
    companyProfile: Company
    industry: String!
    stockDetailsReusableData: StockDetail
    financials: [StockFinancial]
  }

  type StockPriceValue {
    metric: String!
    values: [[String!]!]!
  }

  type Dataset {
    datasets: [StockPriceValue!]!
  }

  type Query {
    getData(name: String!): Stock
    getLiveData(name: String!): Dataset
  }
`;

const resolvers = {
  Query: {
    getData: async (_, { name }) => {
      const options = {
        method: 'GET',
        url: 'https://stock.indianapi.in/stock',
        params: { name },
        headers: { 'X-Api-Key': process.env.STOCK_KEY }
      };

      const { data } = await axios.request(options);

      if (data.financials && Array.isArray(data.financials)) {
        const years = ['2025', '2024', '2023', '2022', '2021'];

        data.financials = data.financials
          .filter(financial => years.includes(String(financial.FiscalYear)))
          .map(financial => {
            if (financial.stockFinancialMap?.INC) {
              financial.stockFinancialMap.INC =
                financial.stockFinancialMap.INC.filter(
                  stockMap => stockMap.displayName === 'Revenue '
                );
            }
            return financial;
          });
      }

      return data;
    },

    getLiveData: async (_, { name }) => {
      const options = {
        method: 'GET',
        url: 'https://stock.indianapi.in/historical_data',
        params: { stock_name: name, period: '1m', filter: 'price' },
        headers: { 'X-Api-Key': process.env.STOCK_KEY }
      };

      const { data } = await axios.request(options);

      if (!data.datasets) {
        return { datasets: [] };
      }

      const datasets = data.datasets.map(ds => ({
        metric: ds.metric,
        values: ds.values.map(arr => arr.map(val => String(val)))
      }));

      return { datasets };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(request) {
  return handler(request);
}

export async function POST(request) {
  return handler(request);
}
