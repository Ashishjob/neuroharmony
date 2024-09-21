"use client";

import Link from 'next/link';

const Banner = () => {
  return (
    <main className="banner-image">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
              Find your community <br /> with Neuroharmony
            </h1>
            <p className="mt-6 text-lg leading-8 text-black">
                Neuroharmony is a platform that connects you with your community
                of like-minded individuals.
            </p>
          </div>
          <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
            <div className="grid gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8">
              <Link href="/quiz">
                <button className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded">
                  Start by taking a quiz to match
                </button>
              </Link>
              <button className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Banner;