"use client";

import React, { useState } from "react";
import Header from "@/components/onboarding/Header";
import IndustryDropdown from "@/components/onboarding/IndustryDropdown";
import RoleDropdown from "@/components/onboarding/RoleDropdown";
import FooterImage from "@/components/onboarding/FooterImage";
import GoalDropdown from "@/components/onboarding/GoalDropdown";

interface CareerPathFormProps {
  onSubmit: (industry: string) => void;
}

interface CareerDetails {
  industry: boolean;
  role: boolean;
  goal: boolean;
}

const DecorateButton = ({ icon, name }: { icon: string; name: string }) => {
  return (
    <div className="flex relative flex-col items-end w-full max-w-[1019px] max-md:max-w-full">
      <button className="flex z-10 gap-2 justify-end items-end px-5 py-4 mt-40 mr-32 text-base font-medium bg-white bg-opacity-10 min-h-12 rotate-[-0.17948938805876508rad] border border-blue-700 rounded-[32px] max-md:mt-10 max-md:mr-2.5">
        <span className="self-stretch my-auto text-white">{icon}</span>
        <span className="self-stretch my-auto leading-6 text-black">
          {name}
        </span>
      </button>
    </div>
  );
};

export default function CareerPathForm({ onSubmit }: CareerPathFormProps) {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  const [careerDetails, setCareerDetails] = useState<CareerDetails>({
    industry: true,
    role: false,
    goal: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(selectedIndustry);
  };

  const handleClick = () => {
    if (careerDetails.industry === true) {
      setCareerDetails({
        ...careerDetails,
        industry: false,
        role: true,
      });
    } else if (careerDetails.role === true) {
      setCareerDetails({
        ...careerDetails,
        role: false,
        goal: true,
      });
    } else if (
      careerDetails.industry === false &&
      careerDetails.role === false &&
      careerDetails.goal === true
    ) {
      window.location.href = "/onboarding/shareexperience";
    }
  };

  const handleBackClick = () => {
    if (careerDetails.goal === true) {
      setCareerDetails({
        ...careerDetails,
        goal: false,
        role: true,
      });
    } else if (careerDetails.role === true) {
      setCareerDetails({
        ...careerDetails,
        role: false,
        industry: true,
      });
    } else if (
      careerDetails.industry === true &&
      careerDetails.role === false &&
      careerDetails.goal === false
    ) {
      window.location.href = "/onboarding/chooseexperience";
    }
  };

  return (
    <main className="flex overflow-hidden flex-col bg-white">
      <div className="flex relative flex-col items-center justify-center py-14 w-full min-h-[1024px] max-md:max-w-full">
        <Header
          title="Define your career path"
          subtitle="Share your career aspirations with us"
          onClick={handleBackClick}
        />
        {(() => {
          if (careerDetails.industry === true) {
            return <DecorateButton icon="👀" name="Ooolala" />;
          } else if (careerDetails.role === true) {
            return <DecorateButton icon="👀" name="Ooolala" />;
          } else if (careerDetails.goal === true) {
            return <DecorateButton icon="👀" name="Ooolala" />;
          }
        })()}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-full font-bold"
        >
          {(() => {
            if (careerDetails.industry === true) {
              return (
                <IndustryDropdown
                  value={selectedIndustry}
                  onChange={setSelectedIndustry}
                />
              );
            } else if (careerDetails.role === true) {
              return (
                <RoleDropdown value={selectedRole} onChange={setSelectedRole} />
              );
            } else if (careerDetails.goal === true) {
              return (
                <GoalDropdown value={selectedGoal} onChange={setSelectedGoal} />
              );
            }
          })()}
          <button
            type="submit"
            onClick={handleClick}
            className="gap-2 self-center px-5 py-4 mt-8 text-base font-semibold text-white whitespace-nowrap bg-indigo-600 rounded-lg min-h-[48px]"
          >
            Continue
          </button>
        </form>
        <FooterImage path="/03.png" alt="" />
      </div>
    </main>
  );
}
