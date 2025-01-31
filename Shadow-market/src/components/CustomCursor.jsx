import React, { useEffect, useState } from "react";


const CustomCursor = () => {
  const [outerPosition, setOuterPosition] = useState({ x: 0, y: 0 }); // Outer circle position
  const [innerOffset, setInnerOffset] = useState({ x: 0, y: 0 }); // Inner ball offset within the outer circle

  const outerRadius = 25; // Outer circle radius (50px diameter)
  const innerRadius = 7.5; // Inner ball radius (15px diameter)

  const speed = 0.1; // Speed multiplier for inner ball movement (adjust this to control speed)

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: mouseX, clientY: mouseY } = e;

      // Update outer circle position to follow mouse
      setOuterPosition({ x: mouseX, y: mouseY });

      // Calculate offset for inner ball with speed control
      setInnerOffset((prevOffset) => {
        const deltaX = mouseX - outerPosition.x; // Movement direction X
        const deltaY = mouseY - outerPosition.y; // Movement direction Y

        const newX = prevOffset.x + deltaX * speed; // Smooth movement with speed
        const newY = prevOffset.y + deltaY * speed;

        // Clamp inner ball within the outer circle
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

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [outerPosition]);

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
