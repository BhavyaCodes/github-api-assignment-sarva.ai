import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserSearchTextProvider } from "@/context/userProfile.context";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  CategoryScale,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  BarElement,
  CategoryScale,
  Title
);

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserSearchTextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserSearchTextProvider>
    </QueryClientProvider>
  );
}
