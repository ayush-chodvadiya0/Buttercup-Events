import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import Attendees from "../../components/Attendees";
import { useRouter } from "next/router";
import ShareEventModal from "../../components/ShareEventModal";
import supabase from "../../utils/supabase";

export async function getServerSideProps(context) {
  let { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", context.query.id);
  let Event = {};
  if (events) {
    Event = events[0];
  } else {
    console.log("No such document!");
  }
  return {
    props: { Event, error },
  };
}

const ListEvent = ({ Event, error }) => {
  const [click, setClick] = useState(Event.disableRegistration);
  const [showModal, setShowModal] = useState(false);
  const [disableRegModal, setDisableRegModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{`${Event?.title} | Buttercup Events`}</title>
        <meta
          name="description"
          content="An event ticketing system built with NextJS and Supabase"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative w-full">
        <div className="h-[45vh] p-3 flex flex-col items-center justify-center bg-[#FFD95A]  registergray w-full">
          <h2 className="text-4xl font-extrabold mb-4 text-center text-white">
            {Event?.title}
          </h2>
          {Event?.attendees && (
            <p className="text-xl font-extrabold mb-6 text-white">
              Total Attendees:{" "}
              <span className="text-white">{Event?.attendees}</span>
            </p>
          )}
        </div>
        {/* <Attendees
          attendees={Event.attendees}
          id={router.query.id}
          click={click}
          setClick={setClick}
          disableRegModal={disableRegModal}
          setDisableRegModal={setDisableRegModal}
        /> */}

        <Link href="/dashboard" className="absolute top-6 left-4 py-2 px-4">
          <AiTwotoneHome className="text-4xl text-[#FFD95A]" />
        </Link>
        {!click && (
          <BsFillShareFill
            className=" absolute top-6 right-10 cursor-pointer text-2xl text-[#FFD95A]"
            onClick={openModal}
          />
        )}
        {showModal && (
          <ShareEventModal eventID={Event.id} closeModal={closeModal} />
        )}
      </main>
    </div>
  );
};

export default ListEvent;
