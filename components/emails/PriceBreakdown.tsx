import type { FC } from "react";
import { Column, Row, Text } from "@react-email/components";
import { cellPad, EMAIL_COLORS, rowLabel, rowValue } from "./emailTheme";
import type { BreakdownRow } from "@/lib/calculator";

type PriceBreakdownProps = {
  rows: BreakdownRow[];
};
const PriceBreakdown: FC<PriceBreakdownProps> = ({ rows }) => (
  <>
    {rows.map((row, i) => {
      const isTotal = i === rows.length - 1;
      const border = i === 0 ? {} : { borderTop: `1px solid ${EMAIL_COLORS.border}` };
      const emphasis = isTotal ? { fontWeight: 600, color: EMAIL_COLORS.ink } : {};
      return (
        <Row key={`${row.label}-${row.value}`}>
          <Column style={{ ...cellPad, ...border }}>
            <Text style={{ ...rowLabel, ...emphasis }}>{row.label}</Text>
          </Column>
          <Column style={{ ...cellPad, ...border }} align="right">
            <Text style={{ ...rowValue, ...(isTotal ? { fontSize: "15px" } : {}) }}>{row.value}</Text>
          </Column>
        </Row>
      );
    })}
  </>
);
export default PriceBreakdown;