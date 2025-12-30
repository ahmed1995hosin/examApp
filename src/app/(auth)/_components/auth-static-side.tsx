import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";
import React from "react";

// features
const features = [
  {
    icon: <Brain />,
    title: "Tailored Diplomas",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    icon: <BookOpenCheck />,
    title: "Focused Exams",
    description:
      "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    icon: <RectangleEllipsis />,
    title: "Smart Multi-Step Forms",
    description:
      "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
];

export default function AuthStaticSide() {
  return (
    <div className="px-33 py-28 w-full relative overflow-hidden bg-gradient-to-br from-white to-blue-50">
      {/* circle right */}
      <div className="w-100 h-100 absolute top-28 -right-16 bg-blue-400 rounded-full blur-[150px] opacity-65"></div>

      {/* circle left */}
      <div className="w-100 h-100 absolute -bottom-28 left-3.5  bg-blue-400 rounded-full blur-[150px] opacity-65"></div>

      {/* icon exam app text */}
      <div className="flex  items-center gap-2">
        <FolderCode className="w-10 h-10 text-blue-600 " />
        <span className="text-xl font-semibold  text-blue-600">Exam App</span>
      </div>

      {/* content */}
      <div className="">
        {/* heading */}
        <h2 className="text-3xl font-bold font-inter text-gray-800 pt-33">
          Empower your learning journey with our smart exam platform.
        </h2>
        {/* content features */}
        <ul className="flex flex-col gap-9 mt-14">
          {features.map((feature, i) => (
            <li key={i} className="flex gap-5">
              {/*Feature Icon */}
              <div className="size-9 flex items-center justify-center border border-blue-600  shrink-0 text-blue-600 ">
                {feature.icon}
              </div>

              {/*Feature Content */}
              <div className="flex flex-col gap-2.5">
                {/*Feature Title */}
                <h3 className="font-semibold text-xl text-blue-600">
                  {feature.title}
                </h3>

                {/*Feature Description */}
                <p className=" text-base font-normal text-gray-700">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
