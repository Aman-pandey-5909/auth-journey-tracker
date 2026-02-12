import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthProgressBar from "@/components/AuthProgressBar";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import CyberCard from "@/components/CyberCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signUp(email, password, displayName);

    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account Created",
        description: "Please check your email to verify your account, then log in.",
      });
      navigate("/login");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-primary neon-text">
            <Shield className="w-8 h-8" />
            <h1 className="text-2xl font-bold font-mono tracking-wider">SECURITY_AUTH</h1>
          </div>
          <p className="text-muted-foreground text-sm font-mono">
            <Terminal className="w-3 h-3 inline mr-1" />
            Initializing secure registration...
          </p>
        </div>

        <AuthProgressBar currentStep={1} />

        <CyberCard glow>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Display Name
              </Label>
              <Input
                id="name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="agent_smith"
                required
                className="bg-background border-border font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@secure.io"
                required
                className="bg-background border-border font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                className="bg-background border-border font-mono text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
              <PasswordStrengthMeter password={password} />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-mono uppercase tracking-wider"
            >
              {isLoading ? "Creating Secure Identity..." : "Initialize Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-muted-foreground text-xs font-mono">
              Already registered?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Access Terminal
              </Link>
            </span>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};

export default SignUp;
