import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 }); // Outer circle position
  const [innerOffset, setInnerOffset] = useState({ x: 0, y: 0 }); // Inner ball offset within the outer circle
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Check if it's mobile view

  const outerRadius = 25; // Outer circle radius (50px diameter)
  const innerRadius = 7.5; // Inner ball radius (15px diameter)
  const speed = 0.1; // Speed multiplier for inner ball movement

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable cursor movement on mobile

    const moveCursor = (e) => {
      const { clientX: mouseX, clientY: mouseY } = e;
      setOuterPosition({ x: mouseX, y: mouseY });

      setInnerOffset((prevOffset) => {
        const deltaX = mouseX - outerPosition.x;
        const deltaY = mouseY - outerPosition.y;

        const newX = prevOffset.x + deltaX * speed;
        const newY = prevOffset.y + deltaY * speed;

        const distance = Math.sqrt(newX ** 2 + newY ** 2);
        if (distance > outerRadius - innerRadius) {
          const angle = Math.atan2(newY, newX);
          return {
            x: Math.cos(angle) * (outerRadius - innerRadius),
            y: Math.sin(angle) * (outerRadius - innerRadius),
          };
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [outerPosition, isMobile]);

  if (isMobile) return null; // Don't render cursor on mobile

  return (
    <>
      <div
        className="custom-cursor-outer"
        style={{
          left: `${outerPosition.x}px`,
          top: `${outerPosition.y}px`,
        }}
      ></div>
      <div
        className="custom-cursor"
        style={{
          left: `${outerPosition.x + innerOffset.x}px`,
          top: `${outerPosition.y + innerOffset.y}px`,
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
