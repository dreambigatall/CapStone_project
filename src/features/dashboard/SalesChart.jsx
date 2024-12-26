import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

/**
 * Styled component to customize the SalesChart container.
 * Inherits styles from DashboardBox and applies custom grid styling for charts.
 */
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Custom styles for grid lines in the chart */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

/**
 * SalesChart Component
 * 
 * This component displays a sales chart for a given number of days using Recharts.
 * It shows both total sales and extras sales based on the provided bookings data.
 *
 * @param {Object} props - The props for the component.
 * @param {Array} props.bookings - List of booking objects containing `created_at`, `totalPrice`, and `extrasPrice`.
 * @param {number} props.numDays - Number of days to display on the chart.
 *
 * @returns {JSX.Element} A styled area chart displaying sales data.
 */
function SalesChart({ bookings, numDays }) {
  // Access the current dark mode status from the context
  const { isDarkMode } = useDarkMode();

  /**
   * Generate an array of all dates within the interval of the last `numDays`.
   * This is used to map and group booking data.
   */
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1), // Start from `numDays` ago
    end: new Date(), // End at today
  });

  /**
   * Process bookings data to calculate sales totals for each day in the interval.
   * - `label`: Formatted date string for the X-axis.
   * - `totalSales`: Sum of total sales for bookings on the same day.
   * - `extrasSales`: Sum of extras sales for bookings on the same day.
   */
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"), // Format date for display
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0), // Sum of total sales
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0), // Sum of extras sales
    };
  });

  /**
   * Define chart colors based on the current theme (dark mode or light mode).
   */
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" }, // Indigo
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" }, // Green
        text: "#e5e7eb", // Light text for dark background
        background: "#18212f", // Dark tooltip background
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" }, // Light Indigo
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" }, // Light Green
        text: "#374151", // Dark text for light background
        background: "#fff", // White tooltip background
      };

  return (
    <StyledSalesChart>
      {/* Chart Heading with date range */}
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>

      {/* Responsive container to ensure chart resizes with its parent */}
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          {/* X-axis with formatted date labels */}
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          {/* Y-axis displaying sales with dollar sign */}
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          {/* Grid lines for visual guidance */}
          <CartesianGrid strokeDasharray="4" />
          {/* Tooltip with theme-based background */}
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* Area chart for total sales */}
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          {/* Area chart for extras sales */}
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
