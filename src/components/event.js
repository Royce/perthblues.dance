import React from "react";
import Image from "./image-spoonful";

const Event = () => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="h-36 flex-none rounded-t overflow-hidden">
        <Image />
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <h2 className="text-gray-900 font-bold text-xl mb-2">
            Spoonful - August 17
          </h2>
          <p className="text-gray-700 text-base mb-1">
            The Spoonful returns with another ALL BLUES night of music and
            dancing!
          </p>
          <p className="text-gray-700 text-base mb-1">
            Open level class from 7.30pm
            <br />
            Social dancing from 8.45 til late
            <br />
            BYO snacks and drinks to share
          </p>
          <p className="text-gray-700 text-base">
            <b>$15</b> for the night (includes class)
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">
              Banks Reserve Pavillion, Mount Lawley
            </p>
            <p className="text-gray-600">https://goo.gl/maps/isiAk2VZQMQ2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
