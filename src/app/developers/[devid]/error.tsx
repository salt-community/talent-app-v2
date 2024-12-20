// 'use client';

// type Props = {
//   error: Error & { digest?: string };
//   reset: () => void;
// };

// export default function Error({ error, reset }: Props) {
//   console.log("Inne i Error - devid")
//   const errorMessage = error.message.split("\n").map((line, index) => {
//     const parts = line.split(":");
//     if (parts.length > 1) {
//       return (
//         <p key={index} className="mb-2">
//           <strong>{parts[0]}:</strong>
//           {parts.slice(1).join(":")}
//         </p>
//       );
//     }
//     return (
//       <p key={index} className="mb-2">
//         {line}
//       </p>
//     );
//   });

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md max-w-lg w-full text-center">
//         <h2 className="text-3xl font-extrabold text-red-800 mb-6">Oops!</h2>
//         {error.message && (
//           <div className="text-red-600 font-medium">{errorMessage}</div>
//         )}
//         {error.digest && (
//           <p className="text-red-500 mt-4">
//             <strong>Digest:</strong> {error.digest}
//           </p>
//         )}
//         <button
//           className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-lg text-white transition-transform transform hover:scale-105"
//           onClick={() => reset()}
//         >
//           Try again
//         </button>
//       </div>
//     </div>
//   );
// }
