import gql from "graphql-tag";
import StockBarChart from "../Bar/Bar";
import Heading from "../Heading/Heading";
import StockLineChart from "../Line/Line";
import StockPieChart from "../Pie/Pie";
import createApolloClient from "@/libs/ApolloClient";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const companyInfo = gql`
  query Query($name: String!) {
    getData(name: $name) {
      companyName
      currentPrice {
        NSE
      }
      companyProfile {
        companyDescription
      }
      industry
      stockDetailsReusableData {
        marketCap
        NetIncome
        interimNetIncome
        currentDividendYieldCommonStockPrimaryIssueLTM
      }
      financials {
        FiscalYear
        stockFinancialMap {
          INC {
            displayName
            value
          }
        }
      }
    }
  }
`;

export default async function StockData({ name }) {
  const apolloClient = createApolloClient();

  const { data, error } = await apolloClient.query({
    query: companyInfo,
    variables: { name },
  });

  if (error) {
    console.error("GraphQL Error:", error);
  }

  const currentPrice = {
    price: data?.getData.currentPrice.NSE,
    name: data?.getData.companyName,
    marketCap: data?.getData.stockDetailsReusableData.marketCap,
  };

  const pieData = {
    netIncome: data?.getData.stockDetailsReusableData.NetIncome,
    interimNetIncome: data?.getData.stockDetailsReusableData.interimNetIncome,
    dividendYield:
      data?.getData.stockDetailsReusableData.currentDividendYieldCommonStockPrimaryIssueLTM,
  };

  const description = data?.getData.companyProfile.companyDescription;
  const companyName = data?.getData?.companyName;

  const revenueData = {
    financials: data?.getData.financials ?? [],
    name: companyName,
  };

  return (
    <main className="size-full">
      <Link
        href="/chat"
        className="size-[50px] flex justify-center items-center bg-indigo-500 rounded-full fixed bottom-10 right-10"
      >
        <MessageCircle className="text-white" />
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="border py-2 border-dashed border-gray-300 rounded-lg h-32 md:h-64">
          <StockBarChart revenueData={revenueData} />
        </div>
        <div className="border py-2 border-dashed rounded-lg border-gray-300 h-32 md:h-64">
          <StockPieChart pieData={pieData} />
        </div>
        <div className="border overflow-y-auto p-2 border-dashed rounded-lg border-gray-300 h-32 md:h-64">
          <div className="size-full">
            <h1 className="w-full py-2 text-shadow-2xs h-fit text-center font-semibold text-indigo-600">
              Company Description
            </h1>
            <p className="w-full h-fit text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="border py-2 border-dashed rounded-lg border-gray-300 h-32 md:h-64">
          <Heading companyData={currentPrice} />
        </div>
      </div>

      <div className="border p-2 border-dashed rounded-lg border-gray-300 h-96 mb-4">
        <StockLineChart companyName={companyName} />
      </div>
    </main>
  );
}
