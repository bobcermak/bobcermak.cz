import { differenceInYears } from "date-fns";

export const yearsSince = ({ year, month, day }: { year: number; month: number; day: number }) =>
  differenceInYears(new Date(), new Date(year, month - 1, day));