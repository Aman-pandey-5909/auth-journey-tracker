import { Shield, UserPlus, LogIn, CheckCircle } from "lucide-react";

interface AuthProgressBarProps {
  currentStep: number; // 0 = none, 1 = signup, 2 = login, 3 = dashboard
}

const steps = [
  { icon: UserPlus, label: "Sign Up" },
  { icon: LogIn, label: "Log In" },
  { icon: Shield, label: "Secured" },
];

const AuthProgressBar = ({ currentStep }: AuthProgressBarProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-secondary" />
        {/* Progress line fill */}
        <div
          className="absolute top-5 left-[10%] h-0.5 bg-primary transition-all duration-700 ease-out"
          style={{
            width: `${Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 80)}%`,
          }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > index + 1;
          const isActive = currentStep === index + 1;
          const isPending = currentStep < index + 1;

          return (
            <div key={step.label} className="flex flex-col items-center z-10 relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  isCompleted
                    ? "bg-primary border-primary neon-border"
                    : isActive
                    ? "bg-secondary border-primary animate-glow"
                    : "bg-secondary border-muted"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-primary-foreground" />
                ) : (
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>
              <span
                className={`mt-2 text-xs font-mono tracking-wider uppercase ${
                  isActive ? "text-primary neon-text" : isCompleted ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuthProgressBar;
