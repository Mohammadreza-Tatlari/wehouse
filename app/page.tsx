"use client";

export default function Home() {
  console.log("Log from rendering home");
  
  return (
    <>
    <div>Home</div>
    <div className="mt-80 border-2 cursor-pointer"
     onClick={() => {console.log("sanity check");
    }}>Sane</div>
    </>
  )
}
