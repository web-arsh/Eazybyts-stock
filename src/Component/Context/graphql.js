import createApolloClient from "@/libs/ApolloClient";
import { gql } from "@apollo/client";
import { create } from "zustand";

const LiveStockData = gql`
  query Query($getLiveDataName2: String!) {
    getLiveData(name: $getLiveDataName2) {
      datasets {
        metric
        values
      }
    }
  }
`;

const graphqlDataFunction = create((set) => ({
  data: null,
  getCompanyInfo: async (name) => {
    try {
      const apolloClient = createApolloClient();
      const { data } = await apolloClient.query({
        query: LiveStockData,
        variables: { getLiveDataName2: name },
      });
      set({ data });
    } catch (error) {
      console.error("Error fetching company info:", error);
    }
  },
}));

export default graphqlDataFunction;
