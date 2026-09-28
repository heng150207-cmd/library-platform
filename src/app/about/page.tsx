import {
  ArrowRight,
  BookOpen,
  Heart,
  Target,
  Users,
} from "lucide-react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
};
import {
  FaGithub,
  FaGlobe,
  FaLinkedinIn,
} from "react-icons/fa6";

/* =====================================================
   TEAM
===================================================== */

const team = [
  {
    name: "Bun Tharith",
    role: "Team Leader",
    image: "/team/rith.png",
    skills: ["Frontend", "UI/UX", "Documentation"],
  },
  {
    name: "Yun Menghong",
    role: "Team Member",
    image: "/team/hong.png",
    skills: ["Frontend", "UI/UX", "Documentation"],
  },
  {
    name: "Chin Lyheng",
    role: "Team Member",
    image: "/team/heng.png",
    skills: ["Frontend", "UI/UX", "Documentation"],
  },
  {
    name: "Mon Nary",
    role: "Team Member",
    image: "/team/nary.png",
    skills: ["Frontend", "UI/UX", "Documentation"],
  },
  {
    name: "Sela Somaly",
    role: "Team Member",
    image: "/team/maly.png",
    skills: ["Frontend", "UI/UX", "Documentation"],
  },
  {
    name: "Vy Thavin",
    role: "Team Member",
    image: "/team/vin.png",
    skills: ["Frontend", "UI/UX", "Documentation"],
  },
];

/* =====================================================
   FEATURES
===================================================== */

const features = [
  {
    title: "Our Mission",
    description:
      "To create a simple and accessible platform where readers can discover books, explore authors, and enjoy learning.",
    icon: Target,
  },
  {
    title: "Our Values",
    description:
      "We focus on simplicity, accessibility, teamwork, creativity, and continuous improvement.",
    icon: Heart,
  },
  {
    title: "Our Team",
    description:
      "Our six members work together in frontend development, UI/UX design, and project documentation.",
    icon: Users,
  },
];

/* =====================================================
   KEEP ORIGINAL MEMBER SKILL COLORS
===================================================== */

const getSkillStyle = (skill: string) => {
  switch (skill) {
    case "Frontend":
      return "border-blue-200 bg-blue-50 text-blue-600";

    case "UI/UX":
      return "border-pink-200 bg-pink-50 text-pink-600";

    case "Documentation":
      return "border-purple-200 bg-purple-50 text-purple-600";

    default:
      return "border-gray-200 bg-gray-50 text-gray-600";
  }
};

/* =====================================================
   ABOUT PAGE
===================================================== */

export default function AboutPage() {
  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#F8FAFF]
        via-[#F7F8FC]
        to-[#F9F5FF]
        text-[#20233A]
        transition-colors
        duration-300

        dark:from-[#10121B]
        dark:via-[#12141E]
        dark:to-[#171320]
        dark:text-[#F3F4F8]
      "
    >
      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          mx-auto
          max-w-[1440px]
          px-4
          pt-6
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            relative
            min-h-[580px]
            overflow-hidden
            rounded-[32px]
            shadow-[0_24px_70px_rgba(61,67,130,0.18)]

            dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)]
          "
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/about-hero.jpg"
            alt="Our team"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#182255]/90
              via-[#293A86]/65
              to-[#7A4FD8]/35

              dark:from-[#090D22]/95
              dark:via-[#1B2459]/80
              dark:to-[#472B72]/55
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/65
              via-black/15
              to-transparent
            "
          />

          <div
            className="
              absolute
              -right-24
              -top-24
              h-80
              w-80
              rounded-full
              bg-purple-300/20
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              min-h-[580px]
              items-end
              px-7
              pb-14
              sm:px-12
              lg:px-20
              lg:pb-16
            "
          >
            <div className="max-w-3xl">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/25
                  bg-white/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  backdrop-blur-md
                "
              >
                <BookOpen className="h-4 w-4" />
                About our journey
              </div>

              <h1
                className="
                  mt-5
                  text-5xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-6xl
                  lg:text-7xl
                "
              >
                Our Story
              </h1>

              <p
                className="
                  mt-5
                  max-w-2xl
                  text-base
                  leading-8
                  text-white/80
                  sm:text-lg
                "
              >
                We believe books have the power
                to inspire, educate, and connect
                people. Our platform was created
                to make discovering books and
                authors simple, clear, and
                enjoyable.
              </p>

              <a
                href="#team"
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-[#3A458F]
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#F4F2FF]
                  hover:shadow-xl

                  dark:bg-[#F5F5FA]
                  dark:text-[#393F8C]
                "
              >
                Meet our team

                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          INTRODUCTION
      ================================================= */}

      <section
        className="
          mx-auto
          max-w-4xl
          px-6
          py-24
          text-center
        "
      >
        <div
          className="
            mx-auto
            mb-5
            h-1
            w-12
            rounded-full
            bg-gradient-to-r
            from-[#4867D6]
            to-[#7A4FD8]
          "
        />

        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[#7077B5]

            dark:text-[#9995E8]
          "
        >
          Who we are
        </span>

        <h2
          className="
            mt-4
            text-4xl
            font-bold
            tracking-tight
            text-[#24273D]
            sm:text-5xl

            dark:text-[#F3F4FA]
          "
        >
          Building a better way to explore books.
        </h2>

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-base
            leading-8
            text-[#777D93]

            dark:text-[#A7ABBA]
          "
        >
          Our project was created to provide
          users with a simple and organized
          place to discover books, learn about
          authors, and explore useful
          information in one platform.
        </p>
      </section>

      {/* =================================================
          FEATURES
      ================================================= */}

      <section
        className="
          mx-auto
          max-w-[1280px]
          px-6
          pb-24
        "
      >
        <div
          className="
            grid
            gap-5
            md:grid-cols-3
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-[#E3E7F2]
                  bg-white
                  p-8
                  shadow-[0_10px_35px_rgba(72,80,130,0.05)]
                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[#C8CEF0]
                  hover:shadow-[0_20px_50px_rgba(91,78,190,0.13)]

                  dark:border-[#2D3141]
                  dark:bg-[#1A1D28]
                  dark:shadow-[0_10px_35px_rgba(0,0,0,0.20)]
                  dark:hover:border-[#57518C]
                  dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.32)]
                "
              >
                <div
                  className={`
                    absolute
                    left-0
                    right-0
                    top-0
                    h-1
                    bg-gradient-to-r

                    ${
                      index === 0
                        ? "from-[#4867D6] to-[#6175D9]"
                        : index === 1
                          ? "from-[#665DD1] to-[#7A4FD8]"
                          : "from-[#4867D6] to-[#7A4FD8]"
                    }
                  `}
                />

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#EEF2FF]
                    to-[#F4EEFF]
                    text-[#6658C7]
                    transition-transform
                    duration-300
                    group-hover:scale-110

                    dark:from-[#282E4D]
                    dark:to-[#362744]
                    dark:text-[#BCB4FF]
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3
                  className="
                    mt-7
                    text-2xl
                    font-bold
                    text-[#292C43]

                    dark:text-[#F3F4F8]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#7B8095]

                    dark:text-[#A7ABBA]
                  "
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* =================================================
          TEAM SECTION
      ================================================= */}

      <section
        id="team"
        className="
          border-y
          border-[#E8EAF3]
          bg-white
          py-24
          transition-colors
          duration-300

          dark:border-[#292C39]
          dark:bg-[#141720]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1280px]
            px-6
          "
        >
          <div
            className="
              mb-14
              text-center
            "
          >
            <div
              className="
                mx-auto
                mb-4
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-[#EEF2FF]
                to-[#F4EEFF]
                text-[#6658C7]

                dark:from-[#282E4D]
                dark:to-[#362744]
                dark:text-[#BCB4FF]
              "
            >
              <Users className="h-5 w-5" />
            </div>

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#7077B5]

                dark:text-[#9995E8]
              "
            >
              Meet the people
            </p>

            <h2
              className="
                mt-3
                text-4xl
                font-bold
                tracking-tight
                text-[#24273D]
                sm:text-5xl

                dark:text-[#F3F4F8]
              "
            >
              Our Team
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-[#7B8095]

                dark:text-[#A7ABBA]
              "
            >
              Meet the six members behind our
              project. We work together on
              frontend development, UI/UX
              design, and documentation.
            </p>
          </div>

          {/* =================================================
              TEAM GRID
          ================================================= */}

          <div
            className="
              grid
              gap-7
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {team.map((member) => (
              <article
                key={member.name}
                className="
                  group
                  flex
                  min-h-[455px]
                  flex-col
                  items-center
                  rounded-[26px]
                  border
                  border-gray-200
                  bg-white
                  px-7
                  py-9
                  text-center
                  shadow-[0_10px_35px_rgba(72,80,130,0.05)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-gray-300
                  hover:shadow-xl
                  hover:shadow-gray-200/60

                  dark:border-[#4A5385]

                  dark:bg-gradient-to-br
                  dark:from-[#18223A]
                  dark:via-[#1E2235]
                  dark:to-[#271C39]

                  dark:shadow-[0_14px_40px_rgba(67,76,155,0.14)]

                  dark:hover:border-[#7467D8]
                "
              >
                {/* PROFILE IMAGE */}

                <div
                  className="
                    relative
                    mb-6
                    flex
                    h-[170px]
                    w-[170px]
                    items-end
                    justify-center
                  "
                >
                  <div
                    className="
                      absolute
                      bottom-3
                      h-[120px]
                      w-[120px]
                      rounded-full
                      bg-[#7561c9]
                    "
                  />

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="
                      relative
                      z-10
                      max-h-[165px]
                      max-w-[155px]
                      object-contain
                    "
                  />
                </div>

                {/* NAME */}

                <h3
                  className="
                    text-[22px]
                    font-bold
                    text-gray-900

                    dark:text-[#F3F4F8]
                  "
                >
                  {member.name}
                </h3>

                {/* ROLE */}

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-gray-500

                    dark:text-[#A3A8B8]
                  "
                >
                  {member.role}
                </p>

                {/* SKILLS */}

                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    justify-center
                    gap-2
                  "
                >
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getSkillStyle(skill)}
                      `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* SOCIAL ICONS */}

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    justify-center
                    gap-5
                  "
                >
                  <a
                    href="#"
                    aria-label={`${member.name} website`}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      text-gray-500
                      transition

                      hover:bg-gray-100
                      hover:text-gray-900

                      dark:text-[#969BAD]
                      dark:hover:bg-[#292D39]
                      dark:hover:text-white
                    "
                  >
                    <FaGlobe size={20} />
                  </a>

                  <a
                    href="#"
                    aria-label={`${member.name} GitHub`}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      text-gray-500
                      transition

                      hover:bg-gray-100
                      hover:text-gray-900

                      dark:text-[#969BAD]
                      dark:hover:bg-[#292D39]
                      dark:hover:text-white
                    "
                  >
                    <FaGithub size={20} />
                  </a>

                  <a
                    href="#"
                    aria-label={`${member.name} LinkedIn`}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      text-gray-500
                      transition

                      hover:bg-gray-100
                      hover:text-gray-900

                      dark:text-[#969BAD]
                      dark:hover:bg-[#292D39]
                      dark:hover:text-white
                    "
                  >
                    <FaLinkedinIn size={19} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          OUR STORY
      ================================================= */}

      <section
        className="
          bg-gradient-to-r
          from-[#202956]
          via-[#2D3C83]
          to-[#5F45A8]
          py-20
          text-white
          lg:py-28

          dark:from-[#11172F]
          dark:via-[#1B2450]
          dark:to-[#432F73]
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-[1280px]
            gap-14
            px-6
            lg:grid-cols-2
            lg:items-center
          "
        >
          <div className="relative">
            <div
              className="
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                shadow-2xl
              "
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/library.jpg"
                alt="Library"
                className="
                  h-[500px]
                  w-full
                  object-cover
                "
              />
            </div>

            <div
              className="
                absolute
                -bottom-6
                right-6
                rounded-2xl
                border
                border-white/40
                bg-white/95
                px-7
                py-5
                text-[#292C43]
                shadow-xl
                backdrop-blur

                dark:border-[#44485D]
                dark:bg-[#1B1E29]/95
                dark:text-[#F3F4F8]
              "
            >
              <p
                className="
                  bg-gradient-to-r
                  from-[#4867D6]
                  to-[#7A4FD8]
                  bg-clip-text
                  text-3xl
                  font-bold
                  text-transparent

                  dark:from-[#8397FF]
                  dark:to-[#B68CFF]
                "
              >
                100+
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#7B8095]

                  dark:text-[#A8ADBE]
                "
              >
                Books & resources
              </p>
            </div>
          </div>

          <div className="lg:pl-8">
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.25em]
                text-white/45
              "
            >
              Our journey
            </span>

            <h2
              className="
                mt-4
                text-4xl
                font-bold
                tracking-tight
                sm:text-5xl
              "
            >
              Created for people who love
              discovering new ideas.
            </h2>

            <p
              className="
                mt-6
                max-w-xl
                leading-8
                text-white/65
                dark:text-white/70
              "
            >
              We wanted to create more than
              just a list of books. Our goal
              was to build an experience that
              helps users discover interesting
              titles, understand authors, and
              explore content without feeling
              overwhelmed.
            </p>

            <p
              className="
                mt-4
                max-w-xl
                leading-8
                text-white/65
                dark:text-white/70
              "
            >
              Through research, design,
              development, testing, and
              teamwork, the platform continued
              to grow into a simple and modern
              digital library experience.
            </p>

            <div
              className="
                mt-9
                grid
                grid-cols-3
                gap-5
                border-t
                border-white/10
                pt-8
              "
            >
              <div>
                <p className="text-3xl font-bold">
                  100+
                </p>

                <p className="mt-1 text-xs text-white/45">
                  Books
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">
                  50+
                </p>

                <p className="mt-1 text-xs text-white/45">
                  Authors
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">
                  10+
                </p>

                <p className="mt-1 text-xs text-white/45">
                  Categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CTA
      ================================================= */}

      <section
        className="
          mx-auto
          max-w-[1280px]
          px-6
          py-20
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-[#E2E6F2]
            bg-gradient-to-r
            from-[#EEF3FF]
            via-[#F5F4FF]
            to-[#F4EEFF]
            px-7
            py-16
            text-center
            transition-colors

            dark:border-[#303445]
            dark:from-[#1C2238]
            dark:via-[#211F36]
            dark:to-[#2A2035]
          "
        >
          <div
            className="
              absolute
              -left-20
              -top-20
              h-56
              w-56
              rounded-full
              bg-[#4867D6]/10
              blur-3xl

              dark:bg-[#617BFF]/15
            "
          />

          <div
            className="
              absolute
              -bottom-20
              -right-20
              h-56
              w-56
              rounded-full
              bg-[#7A4FD8]/10
              blur-3xl

              dark:bg-[#A16BFF]/15
            "
          />

          <div className="relative z-10">
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-[#4867D6]
                to-[#7A4FD8]
                text-white
                shadow-lg
                shadow-purple-200/40

                dark:shadow-none
              "
            >
              <BookOpen className="h-6 w-6" />
            </div>

            <h2
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-4xl
                font-bold
                tracking-tight
                text-[#292C43]

                dark:text-[#F3F4F8]
              "
            >
              Discover something worth reading.
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-[#777D93]

                dark:text-[#A8ADBD]
              "
            >
              Explore books, discover authors,
              and find your next favorite story.
            </p>

            <a
              href="/books"
              className="
                group
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-[#4867D6]
                to-[#7A4FD8]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-purple-200/40
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-xl

                dark:from-[#5C72DE]
                dark:to-[#875FD8]
                dark:shadow-none
              "
            >
              Explore Books

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}