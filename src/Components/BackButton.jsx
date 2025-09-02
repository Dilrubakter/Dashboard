import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 

const BackButton = ({ label = "Back" }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "40px",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 20px",
          borderRadius: "999px",
          background: "linear-gradient(135deg,#06b6d4,#8b5cf6)",
          color: "white",
          fontWeight: "600",
          boxShadow: "0 8px 25px rgba(139,92,246,0.3)",
          cursor: "pointer",
        }}
      >
        <ArrowLeft size={16} /> {label}
      </button>
    </div>
  );
};

export default BackButton;
