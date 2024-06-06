"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./common/customButton";
import CustomInput from "./common/cusomInput";
import { signOut, useSession } from "next-auth/react";
import Loading from "./common/loading";
import { toast } from "react-toastify";

interface HomeComponentProps {}

const HomeComponent = ({}: HomeComponentProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState([] as any);
  const [showAddQues, setShowAddQues] = useState(false);
  const [newQues, setNewQues] = useState("");
  const [newAns, setNewAns] = useState("");
  const sessionData = useSession();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    // alert("Logout");
    signOut();
  };
  const handleShuffleQuestions = () => {
    const randIndex = Math.floor(Math.random() * data.length - 1) + 1;
    setSelectedIndex(randIndex);
    setShowAnswer(false);
    setShowModal(true);
    setShuffle(true);
    setShowAddQues(false);
  };

  const handleNext = () => {
    setShowAnswer(false);
    if (shuffle) {
      const randIndex = Math.floor(Math.random() * data.length - 1) + 1;
      setSelectedIndex(randIndex);
    } else {
      if (selectedIndex < data.length - 1) setSelectedIndex(selectedIndex + 1);
    }
  };
  const handleAddQuestion = async () => {
    setShowAddQues(true);
    setSelectedIndex(0);
    setShuffle(false);
    setShowModal(true);
  };
  const fetchData = async () => {
    console.log("............fetch data");
    if (sessionData.data?.user?.email) {
      setLoading(true);
      console.log("............fetch data inside");
      let formData = new FormData();
      // formData.append("email", sessionData.data?.user?.email);
      const response = await fetch(
        "/api/fetchData?email=" + sessionData.data?.user?.email,
        {
          method: "GET",
          // body: formData,
        }
      );
      const jsonResp = await response.json();
      console.log(jsonResp?.data.questions, "........");
      if (jsonResp.success) {
        setData([...jsonResp?.data?.questions] as any);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sessionData.status]);

  console.log("session : ", sessionData);

  return (
    <div className="h-[100vh] w-full bg-[white] relative">
      <Loading loading={loading} />
      <nav className="flex justify-between w-full items-center py-2 px-4 border-b-[3px] border-black h-[80px]">
        <p className="text-sm cursor-pointer">
          {sessionData?.data?.user?.email}
        </p>
        <span className="w-[100px]">
          <CustomButton
            label="Logout"
            handleClick={handleLogout}
            small={true}
          />
        </span>
      </nav>
      <div
        className="flex flex-col overflow-auto mt-2"
        style={{ height: "calc(100vh - 160px)" }}
      >
        {data.map((question: any, index: any) => {
          return (
            <div
              key={index}
              className="flex flex-col text-[18px] border-b-[1px] border-black px-4 py-4 hover:bg-[black] hover:text-[white] cursor-pointer"
              onClick={() => {
                setSelectedIndex(index);
                setShowAnswer(false);
                setShowModal(true);
                setShuffle(false);
                setShowAddQues(false);
              }}
            >
              <p>{`${index + 1}. ${question.ques}`}</p>
            </div>
          );
        })}
      </div>
      <div className="h-[80px] w-full bg-[rgba(255,255,255, 1)] absolute bottom-0 flex justify-around items-center border-t-[3px] border-black">
        <span className="w-[200px]">
          <CustomButton
            label="Shuffle Questions"
            handleClick={handleShuffleQuestions}
            small={true}
          />
        </span>
        <span className="w-[200px]">
          <CustomButton
            label="Add Question"
            handleClick={handleAddQuestion}
            small={true}
          />
        </span>
      </div>
      {showModal && (
        <section className="absolute h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.5)] top-0 flex justify-center items-center">
          <section className="h-[50%] w-[50%] bg-[white] rounded-xl border-[3px] border-black py-8 px-4 relative overflow-auto">
            {!showAddQues && (
              <p className="text-3xl mt-4">{data[selectedIndex]?.ques}</p>
            )}
            {showAnswer && !showAddQues && (
              <p className="text-2xl mt-4 text-[green]">
                {data[selectedIndex]?.ans}
              </p>
            )}
            {showAddQues && (
              <CustomInput
                value={newQues}
                onChange={(e) => setNewQues(e.target.value)}
                label="Add Ques"
                isTextArea
              />
            )}
            {showAddQues && (
              <CustomInput
                value={newAns}
                onChange={(e) => setNewAns(e.target.value)}
                label="Add Answer"
                isTextArea
              />
            )}
            {showAddQues && (
              <span className="w-[200px] mt-8">
                <CustomButton
                  label={"Submit"}
                  handleClick={async () => {
                    setLoading(true);
                    let formData = new FormData();
                    const updatedQues = [
                      ...data,
                      { ques: newQues, ans: newAns },
                    ];
                    formData.append(
                      "email",
                      sessionData.data?.user?.email || ("" as string)
                    );
                    formData.append("questions", JSON.stringify(updatedQues));
                    const res = await fetch("/api/addData", {
                      method: "POST",
                      body: formData,
                    });
                    const response = await res.json();
                    console.log(response);
                    if (response.success) {
                      toast.success("Added!");
                      fetchData();
                      setShowAddQues(false);
                      setShowModal(false);
                    } else {
                      toast.error("Please try again!");
                    }
                    setLoading(false);
                  }}
                  small={true}
                />
              </span>
            )}
            <p
              className="absolute top-0 right-5 cursor-pointer p-2"
              onClick={() => {
                setShowModal(false);
                setShowAddQues(false);
                setNewAns("");
                setNewQues("");
              }}
            >
              X
            </p>
            {!showAddQues && (
              <span className="w-[200px] absolute bottom-5">
                <CustomButton
                  label={showAnswer ? "Hide Answer" : "Show Answer"}
                  handleClick={() => {
                    setShowAnswer(!showAnswer);
                  }}
                  small={true}
                />
              </span>
            )}
            {!showAddQues && (
              <span className="w-[200px] absolute bottom-5 left-[230px]">
                <CustomButton
                  label={"Next"}
                  handleClick={handleNext}
                  small={true}
                />
              </span>
            )}
          </section>
        </section>
      )}
    </div>
  );
};

export default HomeComponent;
