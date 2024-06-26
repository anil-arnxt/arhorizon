import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
import Tilt from "react-tilt";
import "leaflet/dist/leaflet.css";

import { Navbar } from "../components";
import osm from "../service/osm-providers";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Stats = () => {
  const [data, setData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [location, setLocation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const param = useParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/getproductbycampaignname",
          {
            campaign: param.id,
          }
        );
        setData(response.data[0]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [param]);
  // useEffect(() => {
  //   axios
  //     .get("https://ipinfo.io?token=da12d7e081a410")
  //     .then((response) => {
  //       setIp(response.data.ip);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the IP address!", error);
  //     });
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://ymxx21tb7l.execute-api.ap-south-1.amazonaws.com/production/gethorizoncampaigndata",
          {
            productId: data?.Id,
          }
        );
        setLocationData(response.data);
        console.log("dcd", response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [data]);
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (!userInfo) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!locationData || locationData.length === 0) {
      // handle empty or undefined locationData
      return;
    }

    const combinedCounts = [];

    locationData.forEach((item) => {
      const state = item.State;
      const city = item.City;

      // Update combined counts
      const existingIndex = combinedCounts.findIndex(
        (count) => count.state === state
      );

      if (existingIndex !== -1) {
        combinedCounts[existingIndex].count += 1;
        // Check if the city is not already in the cities array
        if (!combinedCounts[existingIndex].cities.includes(city)) {
          combinedCounts[existingIndex].cities.push(city);
        }
      } else {
        combinedCounts.push({ state, count: 1, cities: [city] });
      }
    });
    const combin = [
      { state: "Delhi", count: 1, cities: ["New Delhi", "Ambolie"] },
    ];

    setLocation(combinedCounts);
  }, [locationData]);

  return (
    <div className="bg-lightdark">
      <Navbar />
      <div className="flex mt-20">
        <SidebarDash />
        <div className="flex justify-center items-center w-full flex-1">
          <div class="relative w-full h-full">
            <div class="absolute hidden w-full bg-gray-50 lg:block h-96" />
            <div class="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                  <span class="relative inline-block">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
                      <defs>
                        <pattern
                          id="2c67e949-4a23-49f7-bf27-ca140852cf21"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30">
                          <circle cx="1" cy="1" r=".7" />
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#2c67e949-4a23-49f7-bf27-ca140852cf21)"
                        width="52"
                        height="24"
                      />
                    </svg>
                  </span>
                </h2>
              </div>
              <div class="grid max-w-screen-md gap-10 md:grid-cols-2 sm:mx-auto">
                <div>
                  <div class="p-8 bg-gray-900 rounded">
                    <div class="mb-4 text-center">
                      <p class="text-xl font-medium tracking-wide text-white">
                        View Count:
                      </p>
                      <div class="flex items-center justify-center">
                        <p class="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                          {data?.viewscount}
                        </p>
                        <p class="text-base text-gray-500">views</p>
                      </div>
                    </div>
                  </div>
                  <div class="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
                  <div class="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
                  <div class="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" />
                </div>
                <div>
                  <div class="p-8 bg-gray-900 rounded">
                    <div class="mb-4 text-center">
                      <p class="text-xl font-medium tracking-wide text-white">
                        Time Spend:
                      </p>
                      <div class="flex items-center justify-center">
                        <p class="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                          {data?.timespend
                            ? (data.timespend / 60).toFixed(2)
                            : 0}{" "}
                          {/* Convert seconds to minutes */}
                        </p>
                        <p class="text-base text-gray-500">minutes</p>
                      </div>
                    </div>
                  </div>
                  <div class="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
                  <div class="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
                  <div class="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" />
                </div>
              </div>
              <div class="w-4/5  px-4 mx-auto mt-24">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white ">
                  <div class="rounded-t mb-0 px-4 py-3 border-0">
                    <div class="flex flex-wrap items-center">
                      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3 class="font-bold text-lg text-blue-gray-800">
                          Viewed Users by States
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div class="block w-full overflow-x-auto">
                    <table class="items-center w-full border-collapse text-blueGray-700  ">
                      <thead class="thead-light ">
                        <tr>
                          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            State
                          </th>
                          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            City
                          </th>
                          <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Number of users by State
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {location?.map((nav) => (
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              {nav.state}
                            </th>

                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              {nav.cities.length > 0 ? nav.cities[0] : ""}
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {nav.count}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="w-4/5  px-4 mx-auto mt-24 h-52">
                <MapContainer
                  center={center}
                  zoom={ZOOM_LEVEL}
                  ref={mapRef}
                  zoomControl={false}
                  whenCreated={setMap}>
                  <TileLayer
                    url={osm.maptiler.url}
                    attribution={osm.maptiler.attribution}
                  />
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
