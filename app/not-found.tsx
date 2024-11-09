import Link from "next/link";
import Image from "next/image";
import notFoundImage from "../public/not-found.jpg"; // Adjust the path as necessary

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <Image
        src={notFoundImage}
        alt="Not Found"
        width={500}
        height={300}
        className="mb-4"
      />
      <h1 className="mb-4 text-4xl font-bold text-gray-800">
        404 - Page Not Found
      </h1>
      <p className="mb-8 text-gray-800">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-yellow-300 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}
