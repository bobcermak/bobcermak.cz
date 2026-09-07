import type { FC } from "react";
import { Column, Row, Section, Text } from "@react-email/components";
import { stepBox, stepCell, stepDesc, stepNum, stepNumCell, stepTitle } from "./emailTheme";
import { PROCESS_STEPS } from "@/types/lead";

type ProcessStepsProps = {
  accent: string;
};
const ProcessSteps: FC<ProcessStepsProps> = ({ accent }) => (
  <Section style={stepBox}>
    {PROCESS_STEPS.map((step, i) => (
      <Row key={step.title}>
        <Column style={stepNumCell}>
          <Text style={{ ...stepNum, color: accent }}>{String(i + 1).padStart(2, "0")}</Text>
        </Column>
        <Column style={stepCell}>
          <Text style={stepTitle}>
            {step.title}
            <span style={stepDesc}> — {step.desc}</span>
          </Text>
        </Column>
      </Row>
    ))}
  </Section>
);
export default ProcessSteps;