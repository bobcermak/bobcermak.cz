import type { FC } from "react";
import { Column, Row, Text } from "@react-email/components";
import { stepCell, stepDesc, stepNum, stepNumCell, stepTitle } from "./emailTheme";
import { PROCESS_STEPS } from "@/types/lead";

type ProcessStepsProps = {
  accent: string;
};
const ProcessSteps: FC<ProcessStepsProps> = ({ accent }) => (
  <>
    {PROCESS_STEPS.map((step, i) => (
      <Row key={step.title}>
        <Column style={stepNumCell}>
          <Text style={{ ...stepNum, color: accent }}>{String(i + 1).padStart(2, "0")}</Text>
        </Column>
        <Column style={stepCell}>
          <Text style={stepTitle}>{step.title}</Text>
          <Text style={stepDesc}>{step.desc}</Text>
        </Column>
      </Row>
    ))}
  </>
);
export default ProcessSteps;