import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import CyberCard from "@/components/CyberCard";
import { Shield, ArrowRight, Lock, Fingerprint, Eye } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const features = [
    { icon: Lock, title: "Secure Auth Flow", desc: "Email/password with session management" },
    { icon: Fingerprint, title: "RLS Protection", desc: "Row-level security on all data" },
    { icon: Eye, title: "Security Audit", desc: "Real-time session & token inspection" },
  ];

  return (
    <div className="min-h-screen bg-background cyber-grid flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 text-primary neon-text">
            <Shield className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold font-mono tracking-wider text-foreground">
            SECURITY<span className="text-primary">_AUTH</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm max-w-sm mx-auto">
            A showcase of authentication and security features.
            Sign up, log in, and explore your security dashboard.
          </p>
        </div>

        <div className="grid gap-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <CyberCard key={f.title} className="p-4 text-left">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-mono text-sm text-foreground">{f.title}</p>
                    <p className="font-mono text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              </CyberCard>
            );
          })}
        </div>

        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => navigate("/signup")}
            className="font-mono uppercase tracking-wider"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
            className="font-mono uppercase tracking-wider border-border"
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
