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

//eslint-disable-next-line
export const countryComponentContext = createContext({
  refetch: () => {},
});

const CountryComponent: React.FC<countryStateType> = ({
  switchLangDispatch,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  //eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const { ref, inView } = useInView();

 useEffect(() => {
  httpClient.get("/countries?_page=1&_per_page=5&_next")
 }, [ref, inView])

  const { isLoading, error, data, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ["countries-fetch", searchParams],
    queryFn: ({ pageParam }) => getCountries(searchParams, pageParam),
    initialPageParam: 1,
    //eslint-disable-next-line
    //@ts-ignore
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const rowVirtualizer = useVirtualizer({
    //eslint-disable-next-line
    //@ts-ignore
    count: data?.pages?.reduce((acc, page) => acc + page.data.length, 0) || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 795,
    overscan: 3,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      setSearchParams();
    }
    //eslint-disable-next-line
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <countryComponentContext.Provider value={{ refetch }}>
      <div className="country__section">
        <SortBtns refetch={refetch} />
        <div style={{ display: "flex", gap: "10px" }}>
          <CountryAddForm
            dispatch={switchLangDispatch}
            typeOfLanguage={"eng"}
          />
        </div>
        <div
          ref={parentRef}
          style={{
            height: '800px',
            overflowY: "auto",
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const index = virtualItem.index;
              //eslint-disable-next-line
              //@ts-ignore
              const country = data?.pages.flatMap((page) => page.data)[index];
              return (
                <div
                  key={virtualItem.key}
                  style={{
                    position: "absolute",
                    top: virtualItem.start,
                    height: virtualItem.size,
                  }}
                >
                  <Wrapper
                    key={country.id}
                    flagUrl={country.flagUrl}
                    countryIndex={index}
                    dispatch={switchLangDispatch}
                    el={country}
                    countryLikes={country.likes}
                  />
                </div>
              );
            })}
            <div style={{marginTop:`${rowVirtualizer.getTotalSize()}px`}} ref={ref}></div>
          </div>
        </div>
      </div>
    </countryComponentContext.Provider>
  );
};

export default CountryComponent;
