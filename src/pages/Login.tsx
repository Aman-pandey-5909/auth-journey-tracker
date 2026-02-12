import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthProgressBar from "@/components/AuthProgressBar";
import CyberCard from "@/components/CyberCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Access Denied",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Access Granted", description: "Welcome back, agent." });
      navigate("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-primary neon-text">
            <Shield className="w-8 h-8" />
            <h1 className="text-2xl font-bold font-mono tracking-wider">SECURITY_AUTH</h1>
          </div>
          <p className="text-muted-foreground text-sm font-mono">
            <Terminal className="w-3 h-3 inline mr-1" />
            Authenticating credentials...
          </p>
        </div>

        <AuthProgressBar currentStep={2} />

        <CyberCard glow>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-mono uppercase tracking-wider"
            >
              {isLoading ? "Verifying Identity..." : "Authenticate"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-muted-foreground text-xs font-mono">
              No credentials?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Register New Agent
              </Link>
            </span>
          </div>
        </CyberCard>
      </div>
    </div>
  );
};

export default Login;
