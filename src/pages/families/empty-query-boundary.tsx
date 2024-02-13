import { ReactNode } from "react";
import { useInstantSearch } from "react-instantsearch";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

export default function EmptyQueryBoundary({ children, fallback }: Props) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return fallback;
  }

  return children;
}
