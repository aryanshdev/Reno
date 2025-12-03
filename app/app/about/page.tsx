import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-10">About This Submission</h1>
      <div className="text-lg capitalize">
        This Project is very simple prototype for a web app to list and view
        listed schools. On seeing the simplicity I decided to not use any
        backend. I have used to inbuild Next server to perform Database
        operations.
        <div className="mt-8 mb-3">Things Used In The Prototype:</div>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>NextJS API Routes for backend functionality</li>
          <li>NextJS For Frontend</li>
          <li>TailwindCSS</li>
          <li>MySQL via TiDB Cloud (Free SQL Database Provider)</li>
          <li>Vercel - For Deployment</li>
        </ul>

       <Link href={"https://aryanshdev.in"} target="_blank"> <div className="bg-white text-black w-fit px-6 py-1 font-medium my-20 rounded-lg mx-auto">More about me</div>
     </Link> </div>
    </>
  );
}
