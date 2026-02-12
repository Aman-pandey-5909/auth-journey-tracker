import { useMemo } from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const { score, label, checks } = useMemo(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    const labels = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];

    return { score, label: labels[score] || "", checks };
  }, [password]);

  if (!password) return null;

  const colors = ["", "bg-destructive", "bg-destructive", "text-primary", "bg-primary", "bg-primary"];

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? (colors[score] || "bg-primary") : "bg-secondary"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className={`text-xs font-mono ${score >= 3 ? "text-primary" : "text-destructive"}`}>
          {label}
        </span>
        <div className="flex gap-2 text-xs font-mono text-muted-foreground">
          <span className={checks.length ? "text-primary" : ""}>8+</span>
          <span className={checks.uppercase ? "text-primary" : ""}>A-Z</span>
          <span className={checks.number ? "text-primary" : ""}>0-9</span>
          <span className={checks.special ? "text-primary" : ""}>!@#</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
