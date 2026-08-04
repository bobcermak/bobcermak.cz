import type { FC } from "react";
import { EMAIL_COLORS, rowLabel, rowValue } from "./emailTheme";
import type { BreakdownRow } from "@/lib/calculator";

type BreakdownTableProps = {
  rows: BreakdownRow[];
};
const BreakdownTable: FC<BreakdownTableProps> = ({ rows }) => (
  <table role="presentation" width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
    <tbody>
      {rows.map((row, i) => {
        const border = i === 0 ? undefined : `1px solid ${EMAIL_COLORS.border}`;
        return (
          <tr key={`${row.label}-${row.value}`}>
            <td style={{ ...rowLabel, borderTop: border }}>{row.label}</td>
            <td style={{ ...rowValue, borderTop: border }}>{row.value}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
export default BreakdownTable;