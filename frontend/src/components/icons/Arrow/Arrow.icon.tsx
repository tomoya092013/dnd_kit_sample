import { IconType } from "../icon.type";

type ArrowIconType = {
  direction: "left" | "right";
} & IconType;

export const ArrowIcon = ({
  color = "#444",
  direction,
  width = 14,
  height = 17,
}: ArrowIconType) => {
  if (direction === "left") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 14 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 1L1 8.5L13 16"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  } else if (direction === "right") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 14 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 16L13 8.5L1 1"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
};
