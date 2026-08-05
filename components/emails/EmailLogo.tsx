import { EMAIL_COLORS } from "./emailTheme";

const DOTS = [EMAIL_COLORS.blue, EMAIL_COLORS.peach, EMAIL_COLORS.purple, EMAIL_COLORS.ink];
const dot = (color: string) =>
  ({
    width: "5px",
    height: "5px",
    lineHeight: "5px",
    fontSize: 0,
    backgroundColor: color,
    borderRadius: "50%",
  }) as const;

const EmailLogo = () => (
  <table role="presentation" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
    <tbody>
      <tr>
        <td
          style={{
            paddingRight: "7px",
            fontSize: "21px",
            fontWeight: 700,
            letterSpacing: "-0.11em",
            lineHeight: "21px",
            color: EMAIL_COLORS.ink,
          }}
        >
          bc
        </td>
        <td style={{ verticalAlign: "middle" }}>
          <table
            role="presentation"
            cellPadding={0}
            cellSpacing={0}
            style={{ borderCollapse: "separate", borderSpacing: "3px" }}
          >
            <tbody>
              <tr>
                {DOTS.slice(0, 2).map((color) => (
                  <td key={color} style={dot(color)}>
                    &nbsp;
                  </td>
                ))}
              </tr>
              <tr>
                {DOTS.slice(2).map((color) => (
                  <td key={color} style={dot(color)}>
                    &nbsp;
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
);
export default EmailLogo;