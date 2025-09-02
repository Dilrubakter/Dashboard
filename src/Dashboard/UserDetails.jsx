import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from "../Components/BackButton";
import {
  SearchIcon
} from "lucide-react";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center p-6">Loading user details...</p>;
  if (!user)
    return <p className="text-center p-6 text-red-500">User not found.</p>;

    return (
      <div className="p-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <BackButton label="Go Back" />

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h3
            style={{
              fontSize: "4rem",
              fontWeight: "900",
              background:
                "linear-gradient(135deg, #ffffff 0%, #e879f9 50%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
              lineHeight: "1.1",
            }}
          >
            User Details
          </h3>
        </div>

        {/* 🔹 Personal Info + Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-6 bg-gray-500 border rounded-lg shadow">
            <h2 className="text-white text-center font-bold mb-4">
              Personal Information
            </h2>
            <p>
              <strong className="text-black">Name:</strong> {user.name}
            </p>
            <p>
              <strong>Username:</strong> @{user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noreferrer"
                className="text-green-300"
              >
                {user.website}
              </a>
            </p>
          </div>

          <div className="p-6 bg-gray-500 border rounded-lg shadow">
            <h2 className="text-white text-center font-bold mb-4">Address</h2>
            <p>
              <strong>Street:</strong> {user.address.street}
            </p>
            <p>
              <strong>Suite:</strong> {user.address.suite}
            </p>
            <p>
              <strong>City:</strong> {user.address.city}
            </p>
            <p>
              <strong>Zipcode:</strong> {user.address.zipcode}
            </p>
            <p>
              <strong>Geo Location:</strong> {user.address.geo.lat},{" "}
              {user.address.geo.lng}
            </p>
          </div>
        </div>

        {/* 🔹 Company Info */}
        <div className="p-6 bg-gray-500 border rounded-lg shadow">
          <h2 className="text-white text-center font-bold mb-4">Company</h2>
          <p>
            <strong>Company Name:</strong> {user.company.name}
          </p>
          <p>
            <strong>Catch Phrase:</strong> {user.company.catchPhrase}
          </p>
          <p>
            <strong>Business:</strong> {user.company.bs}
          </p>
        </div>
      </div>
    );
}
