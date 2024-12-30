// "use client";

// import Link from "next/link";

// type Props = {
//   error: Error & { digest?: string };
//   reset: () => void;
// };

// const extractTitle = (message: string): string =>
//   message
//     .split("\n")
//     .find(line => line.toLowerCase().startsWith("title:"))
//     ?.split(":")
//     .slice(1)
//     .join(":")
//     .trim() || "Error";

// const parseErrorMessage = (message: string) =>
//   message.split("\n").map((line, index) => {
//     const parts = line.split(":");
//     return (
//       <p key={index} className="mb-2">
//         {parts.length > 1 ? <strong>{parts[0]}:</strong> : null}
//         {parts.slice(1).join(":") || line}
//       </p>
//     );
//   });

// export default function Error({ error, reset }: Props) {
//   const title = extractTitle(error.message);
//   const errorMessage = parseErrorMessage(error.message);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md max-w-lg w-full text-center">
//         <h2 className="text-3xl font-extrabold text-red-800 mb-6">{title}</h2>
//         {error.message && (
//           <div className="text-red-600 font-medium">{errorMessage}</div>
//         )}
//         {error.digest && (
//           <p className="text-red-500 mt-4 mb-4">
//             <strong>Digest:</strong> {error.digest}
//           </p>
//         )}
//         {title !== "Unauthorized error" ? (
//           <button
//             className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-lg text-white transition-transform transform hover:scale-105"
//             onClick={reset}
//           >
//             Try again
//           </button>
//         ) : (
//           <Link
//             href="/"
//             className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-lg text-white transition-transform transform hover:scale-105"
//           >
//             Go back
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }
