import Image from "next/image";
import Link from "next/link";

const Footercomponent = () => {
  return (
    <footer className="bg-[#210D4A] text-white pt-16 pb-8 px-6 md:px-16 mt-auto w-full">
      <div className="max-w-7xl mx-auto">
        {/* TOP GRID CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Column 1: Brand Info & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo + Brand Name */}
            <div className="flex items-center space-x-3">
              <Image
                alt="CARTORA Logo"
                className="h-16 w-16 object-contain"
                id="custom-cartora-logo"
                src="/ISTAD.png"
                width={64}
                height={64}
              />
              <span className="text-2xl font-bold tracking-wider uppercase font-serif">
                CARTORA
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Your one-stop destination for top quality, unbeatable deals,
              and fast delivery. Shop smart, anytime, anywhere.
            </p>
            {/* Social Media Buttons */}
            <div className="flex items-center space-x-3 pt-2">
              {/* Facebook */}
              <a
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#FF6B00] hover:bg-[#e05e00] flex items-center justify-center text-white transition"
                href="https://www.facebook.com/share/1EShT8KnVx/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.21 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.21 22 17.08 22 12.06Z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-[#FF6B00] hover:bg-[#e05e00] flex items-center justify-center text-white transition"
                href="https://www.youtube.com/@istad7665"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.4 3.6-6.4 3.6Z" />
                </svg>
              </a>
              {/* Google */}
              <a
                aria-label="Google"
                className="w-10 h-10 rounded-full bg-[#FF6B00] hover:bg-[#e05e00] flex items-center justify-center text-white transition"
                href="mailto:info.istad@gmail.com"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M21.35 11.1H12v2.9h5.35c-.23 1.42-1.67 4.17-5.35 4.17-3.22 0-5.84-2.67-5.84-5.96s2.62-5.96 5.84-5.96c1.83 0 3.06.78 3.76 1.45l2.56-2.47C16.87 3.68 14.66 2.7 12 2.7 6.98 2.7 2.9 6.78 2.9 11.8s4.08 9.1 9.1 9.1c5.25 0 8.74-3.69 8.74-8.89 0-.6-.07-1.05-.15-1.5Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
              COMPANY
            </h4>
            <ul className="space-y-3 text-sm font-medium text-slate-300">
              <li>
                <Link className="hover:text-purple-300 transition" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-purple-300 transition"
                  href="/html/product-page"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-300 transition" href="#">
                  Browse
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-purple-300 transition"
                  href="/html/about"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Explore Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
              EXPLORE
            </h4>
            <ul className="space-y-3 text-sm font-medium text-slate-300">
              <li>
                <Link className="hover:text-purple-300 transition" href="#">
                  Electronic
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-300 transition" href="#">
                  Furniture
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-300 transition" href="#">
                  Fashion
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-300 transition" href="#">
                  Kitchen
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
              CONTACT
            </h4>
            <div className="space-y-3 text-sm font-medium text-slate-300">
              <div>
                <p className="text-slate-400 text-xs">Call:</p>
                <p className="mt-0.5">(+885)99 666 777</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Gmail:</p>
                <p className="mt-0.5 break-all">istadshop168@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Column 5: Organize By ISTAD (2 Cols) */}
          <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
              ORGANIZE BY ISTAD
            </h4>
            {/* ISTAD Logo */}
            <div className="pt-1 flex justify-center lg:justify-start">
              <Image
                alt="ISTAD Logo"
                className="w-36 h-36 object-contain rounded-full border-purple-400/30 p-1"
                src="/Istad.png"
                width={144}
                height={144}
              />
            </div>
          </div>
        </div>

        {/* BOTTOM BAR / COPYRIGHT */}
        <div className="border-t border-purple-900/60 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div>
            <p>© Copyright by CodeUI. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            <Link className="hover:text-slate-200 transition" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:text-slate-200 transition" href="#">
              Terms of Use
            </Link>
            <Link className="hover:text-slate-200 transition" href="#">
              Legal
            </Link>
            <Link className="hover:text-slate-200 transition" href="#">
              Site Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footercomponent;