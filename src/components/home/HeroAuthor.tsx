"use client";

import { useState } from "react";
import Image from "next/image";

interface HeroAuthor {
  image: string;
  name: string;
  description: string;
}

const authors: HeroAuthor[] = [
  {
    image: "/hero-authors/J.K Rowling.png",
    name: "J.K. Rowling",
    description: "British Author",
  },
  {
    image: "/hero-authors/Victor Hugo.png",
    name: "Victor Hugo",
    description: "French Author & Poet",
  },
  {
    image: "/hero-authors/Leo Tolstoy.png",
    name: "Leo Tolstoy",
    description: "Russian Novelist",
  },
  {
    image: "/hero-authors/Franz Kafka.png",
    name: "Franz Kafka",
    description: "Novelist & Short Story Writer",
  },
  {
    image: "/hero-authors/Stieg Larsson.png",
    name: "Stieg Larsson",
    description: "Swedish Author & Journalist",
  },
  {
    image: "/hero-authors/Agantha Christie.png",
    name: "Agatha Christie",
    description: "Crime & Mystery Writer",
  },
];

export default function HeroAuthors() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full">
      <div className="w-full overflow-x-auto">
        <div className="flex h-[500px] min-w-[950px] gap-3 lg:min-w-0">
          {authors.map((author, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={author.image}
                onMouseEnter={() => setActiveIndex(index)}
                className={`
                  relative
                  h-full
                  cursor-pointer
                  overflow-hidden
                  rounded-[24px]
                  transition-all
                  duration-500
                  ease-in-out

                  ${
                    isActive
                      ? "flex-[3.3] min-w-[320px]"
                      : "flex-1 min-w-[110px]"
                  }
                `}
              >
                {/* IMAGE */}
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  priority={index === 0}
                  sizes={isActive ? "(max-width: 768px) 320px, 430px" : "150px"}
                  className={`
                    object-cover
                    object-top
                    transition-all
                    duration-700
                    ease-in-out

                    ${
                      isActive ? "scale-100 grayscale-0" : "scale-105 grayscale"
                    }
                  `}
                />

                {/* DARK GRADIENT ONLY AT BOTTOM */}
                <div
                  className={`
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/85
                    via-black/10
                    to-transparent
                    transition-opacity
                    duration-500

                    ${isActive ? "opacity-100" : "opacity-0"}
                  `}
                />

                {/* TEXT INSIDE IMAGE */}
                <div
                  className={`
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-6
                    text-white
                    transition-all
                    duration-500

                    ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }
                  `}
                >
                  <h2 className="text-2xl font-bold md:text-3xl">
                    {author.name}
                  </h2>

                  <p className="mt-1 text-sm text-white/75 md:text-base">
                    {author.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
