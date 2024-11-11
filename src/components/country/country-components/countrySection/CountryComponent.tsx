import Wrapper from "../Wrapper";
import SortBtns from "./SortBtns";
import CountryAddForm from "./countryAddForm/CountryAddForm";
import React, { Dispatch, useRef, createContext, useEffect } from "react";
import { CountryAction } from "@components/country/Reducer/countryReducer";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCountries } from "../../../../api/countries";
import { useSearchParams } from "react-router-dom";
import { httpClient } from "../../../../api";
import { useInView } from "react-intersection-observer";

export interface countryStateType {
  switchLangDispatch: Dispatch<CountryAction>;
}

export const countryComponentContext = createContext({
  refetch: () => {},
});

const CountryComponent: React.FC<countryStateType> = ({
  switchLangDispatch,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  //eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  httpClient
    .get("/countries?_page=1&_per_page=5&_next")
    .then((next) => console.log(next.data));

  const { isLoading, error, data, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ["countries-fetch", searchParams],
    queryFn: ({ pageParam }) => getCountries(searchParams, pageParam),
    initialPageParam: 1,
    //eslint-disable-next-line
    //@ts-ignore
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const { ref, inView } = useInView();

  const rowVirtualizer = useVirtualizer({
    //eslint-disable-next-line
    //@ts-ignore
    count: data?.pages?.reduce((acc, page) => acc + page.data.length, 0) || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 195,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      setSearchParams();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //eslint-disable-next-line
  //@ts-ignore
  if (data?.pages[0].data) {
    return (
      <countryComponentContext.Provider value={{ refetch }}>
        <div>
          <SortBtns refetch={refetch} />
          <div
            className="country__section"
            ref={parentRef}
            style={{ position: "relative" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <CountryAddForm
                dispatch={switchLangDispatch}
                typeOfLanguage={"eng"}
              />
            </div>
            <div
              style={{
                height: rowVirtualizer.getTotalSize(),
                overflowY: "auto",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                // Получаем правильный индекс для элемента
                const index = virtualItem.index;
                //eslint-disable-next-line
                //@ts-ignore
                const country = data?.pages.flatMap((page) => page.data)[index];
                return (
                  <Wrapper
                    key={country.id}
                    flagUrl={country.flagUrl}
                    countryIndex={index}
                    dispatch={switchLangDispatch}
                    el={country}
                    countryLikes={country.likes}
                    // Использовать virtualItem.start и virtualItem.size для позиционирования
                  />
                );
              })}
              <div ref={ref}></div>
            </div>
          </div>
        </div>
      </countryComponentContext.Provider>
    );
  }

  return null;
};

export default CountryComponent;
