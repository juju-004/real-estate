import React, { ReactNode } from "react";

function Container({
  children,
  id,
  className,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={`mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 mt-10 ${className}`}
      id={id}
    >
      {children}
    </div>
  );
}

export default Container;
