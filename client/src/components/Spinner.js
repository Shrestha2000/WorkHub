import React from "react";

function Spinner() {
  return (
    <div className="fixed inset-0 bg-red-200 opacity-70 flex items-center justify-center z-[9999]">
      <div className="h-10 w-10 border-4 border-black border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
