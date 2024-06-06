import React from "react";
import { Hourglass } from "react-loader-spinner";

const Loading = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {loading ? (
        <div
          className=" absolute top-0 left-0 flex flex-1 h-[100vh] w-[100vw] justify-center items-center bg-[rgba(0,0,0,0.2)]"
          style={{ zIndex: 10000 }}
        >
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Loading;
