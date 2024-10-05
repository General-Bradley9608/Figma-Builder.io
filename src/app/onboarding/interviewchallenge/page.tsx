"use client";

import React, { useCallback, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";

import { useAuth } from "@/providers/Auth";
import { OnboardingTemplate } from "../_components/OnboardingTemplate";
import ChallengeSelector from "@/components/onboarding/ChallengeSelector";
import { Button } from "@/components/Button";
import { cp } from "fs";

interface Challenge {
  emoji: string;
  text: string;
}

export default function InterviewChallenges() {
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const { theme } = useTheme();
  const router = useRouter();
  const { user } = useAuth();

  const challenges: Challenge[] = [
    { emoji: "😰", text: "Nervousness" },
    { emoji: "📝", text: "Structuring Answers" },
    { emoji: "👀", text: "Maintaining Eye Contact" },
    { emoji: "🗣️", text: "Speaking Clearly" },
    { emoji: "🤔", text: "Handling Unexpected Questions" },
    { emoji: "📚", text: "Demonstrating Relevant Experience" },
    { emoji: "🌍", text: "Overcoming Cultural Barriers" },
    { emoji: "🧠", text: "Articulating Complex Ideas" },
    { emoji: "🔥", text: "Maintaining Focus Under Pressure" },
    { emoji: "👀", text: "Managing Non-Verbal Communication" },
    { emoji: "🤷🏻", text: "Other" },
  ];

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<{
    challenges: string[];
  }>({
    defaultValues: {
      challenges: [],
    },
  });

  const handleChallengeToggle = (challenge: string) => {
    setSelectedChallenges((prev) =>
      prev.includes(challenge)
        ? prev.filter((c) => c !== challenge)
        : [...prev, challenge]
    );
  };

  const handleSelectAll = () => {
    setSelectedChallenges(challenges.map((c) => c.text));
  };

  const handleBackClick = () => {
    router.push("/onboarding/shareexperience");
  };

  const onSubmit = useCallback(async () => {
    try {
      console.log(selectedChallenges);
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${user?.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            onboarding: {
              challenge: selectedChallenges,
            },
          }),
        }
      );
      if (req.ok) {
        router.push("/onboarding/trainingpath");
      } else {
        console.error("Error:", req.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [selectedChallenges, user]);

  return (
    <OnboardingTemplate
      headerTitle="Let's tackle your challenges"
      headerSubTitle="Help us understand your interview challenges and what you want to improve."
      bodyTitle="My interivew challenges are..."
      bodyTitleClassName=""
      handleBackClick={handleBackClick}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-full font-bold"
      >
        <div className="flex flex-wrap justify-center w-full md:mt-10 md:max-w-full">
          <ChallengeSelector
            challenges={challenges}
            selectedChallenges={selectedChallenges}
            onChallengeToggle={handleChallengeToggle}
            onSelectAll={handleSelectAll}
          />{" "}
          <div className="flex gap-4 items-center justify-center mt-12 text-base font-semibold md:mt-10">
            <Button
              type="submit"
              variant={theme === "dark" ? "secondary" : "default"}
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </OnboardingTemplate>
  );
}
