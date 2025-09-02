import React from "react";

const StatCard = React.memo(({ title, value, icon, color, trend }) => (
  <div
    className="bg-white rounded-lg shadow-md p-6 border-l-4"
    style={{ borderLeftColor: color }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p
            className={`text-sm ${
              trend > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend > 0 ? "↗️" : "↘️"} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
));

export default StatCard;
