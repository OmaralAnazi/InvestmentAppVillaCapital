import { TailSpin } from "react-loader-spinner";

function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 9999, // To ensure its higher than all elements
      }}
    >
      <TailSpin color="white" height={150} width={150} />
    </div>
  );
}

export default Loading;
