import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 lg:px-16 flex-shrink-0 relative z-10">
      <div>
        <Image
          src="/signature.png"
          alt="Ryan Signature"
          width={240}
          height={80}
          className="h-24 w-auto"
          priority
        />
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/about" className="text-white/80 hover:text-white transition-colors">
          about
        </Link>
        <Link href="/blog" className="text-white/80 hover:text-white transition-colors">
          blog
        </Link>
        <Link href="https://axiomsystems.io" target="_blank" className="text-white/80 hover:text-white transition-colors">
          firm
        </Link>
        <Link 
          href="/newsletter" 
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
        >
          newsletter
        </Link>
      </div>
    </nav>
  );
} 