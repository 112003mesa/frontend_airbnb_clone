export const dynamic = "force-dynamic";

import { format } from "date-fns";
import Footer from "../_components/header/Footer";
import Header from "../_components/header/Header";
import { getSearchResult } from "../utils/api";
import ListingCard from "../_components/header/ListingCard";
import { ListingCardItem } from "@/app/types/app";
import MapClient from "../_components/header/MapClient";

type ListingCardProps = Omit<ListingCardItem, "long" | "lat">;

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const SearchResult = async ({ searchParams }: Props) => {
  const { location, startDate, endDate, numberOfGuests } = searchParams || {};

  let formatedStartDate = "";
  let formatedEndDate = "";

  if (startDate && endDate) {
    formatedStartDate = format(new Date(startDate), "dd MMMM yy");
    formatedEndDate = format(new Date(endDate), "dd MMMM yy");
  }

  const range = `${formatedStartDate} - ${formatedEndDate}`;

  const filters = [
    "Cancellation Flexibility",
    "Type of Place",
    "Price",
    "Rooms and Beds",
    "More filters",
  ];

  const searchResultData = await getSearchResult();

  return (
    <>
      <Header
        placeholder={`${location || "Anywhere"} | ${range || "Any week"} | ${
          numberOfGuests || "Any"
        } guests`}
      />

      <main>
        <section className="flex-grow pt-14">
          <div className="container flex">
            <div className="pr-4">
              <p className="text-xs">
                300+ Stays - {range} - for {numberOfGuests} guests
              </p>

              <h1 className="text-3xl font-semibold mt-2 mb-6">
                Stays in {location || "Anywhere"}
              </h1>

              <div className="hidden lg:inline-flex whitespace-normal mb-5 space-x-3 text-gray-800">
                {filters.map((item) => (
                  <button className="filter-btn" key={item} type="button">
                    {item}
                  </button>
                ))}
              </div>

              <div>
                {searchResultData?.map((listing: ListingCardProps) => (
                  <ListingCard
                    key={listing.title}
                    img={listing.img}
                    title={listing.title}
                    location={listing.location}
                    description={listing.description}
                    price={listing.price}
                    star={listing.star}
                    total={listing.total}
                  />
                ))}
              </div>
            </div>

            <div className="hidden xl:inline-flex xl:min-w-[600px]">
              <MapClient searchResultData={searchResultData} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SearchResult;