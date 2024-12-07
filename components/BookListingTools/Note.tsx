import Link from "next/link";

export default function Note() {
  return (
    <div className="badge-button mx-auto w-fit  mt-4">
      <span className="badge font-mono">i</span>
      This tool can make mistakes. Verify information against 
      <Link href={"/kdp-guidelines"} className="underline">
        guidelines.
      </Link>
    </div>
  );
}
