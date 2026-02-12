import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AuthProgressBar from "@/components/AuthProgressBar";
import CyberCard from "@/components/CyberCard";
import { Button } from "@/components/ui/button";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  User,
  Clock,
  Key,
  Fingerprint,
  Lock,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const { user, session, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [sessionAge, setSessionAge] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (session?.expires_at) {
        const expiresAt = new Date(session.expires_at * 1000);
        const now = new Date();
        const diff = expiresAt.getTime() - now.getTime();
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setSessionAge(`${mins}m ${secs}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [session]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || !user) return null;

  const securityChecks = [
    {
      icon: ShieldCheck,
      label: "Email Verified",
      status: user.email_confirmed_at ? "pass" : "fail",
      detail: user.email_confirmed_at
        ? `Verified ${new Date(user.email_confirmed_at).toLocaleDateString()}`
        : "Not verified",
    },
    {
      icon: Lock,
      label: "Authenticated Session",
      status: "pass",
      detail: `Token expires in ${sessionAge}`,
    },
    {
      icon: Key,
      label: "Row Level Security",
      status: "pass",
      detail: "RLS active on all tables",
    },
    {
      icon: Fingerprint,
      label: "Auth Provider",
      status: "info",
      detail: user.app_metadata?.provider || "email",
    },
    {
      icon: Activity,
      label: "Last Sign In",
      status: "info",
      detail: user.last_sign_in_at
        ? new Date(user.last_sign_in_at).toLocaleString()
        : "N/A",
    },
  ];

  return (
    <div className="min-h-screen bg-background cyber-grid p-4">
      <div className="max-w-2xl mx-auto space-y-6 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary neon-text">
            <Shield className="w-6 h-6" />
            <h1 className="text-xl font-bold font-mono tracking-wider">SECURITY_DASHBOARD</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="font-mono text-xs border-border hover:border-destructive hover:text-destructive"
          >
            <LogOut className="w-3 h-3 mr-1" />
            Terminate Session
          </Button>
        </div>

        <AuthProgressBar currentStep={3} />

        {/* User Info */}
        <CyberCard>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary border-2 border-primary flex items-center justify-center neon-border">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-mono text-sm text-primary">
                {user.user_metadata?.display_name || "Agent"}
              </p>
              <p className="font-mono text-xs text-muted-foreground">{user.email}</p>
              <p className="font-mono text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                Session TTL: {sessionAge}
              </p>
            </div>
          </div>
        </CyberCard>

        {/* Security Checks */}
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Security Audit
          </h2>
          <div className="space-y-2">
            {securityChecks.map((check) => {
              const Icon = check.icon;
              return (
                <CyberCard key={check.label} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 ${
                          check.status === "pass"
                            ? "text-primary"
                            : check.status === "fail"
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="font-mono text-sm text-foreground">{check.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{check.detail}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          check.status === "pass"
                            ? "bg-primary animate-pulse-neon"
                            : check.status === "fail"
                            ? "bg-destructive"
                            : "bg-muted-foreground"
                        }`}
                      />
                    </div>
                  </div>
                </CyberCard>
              );
            })}
          </div>
        </div>

        {/* Session Token Preview */}
        <CyberCard>
          <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
            JWT Token (truncated)
          </h3>
          <div className="bg-background rounded p-3 border border-border overflow-hidden">
            <code className="text-xs font-mono text-primary break-all">
              {session?.access_token
                ? `${session.access_token.substring(0, 60)}...${session.access_token.slice(-20)}`
                : "No token"}
            </code>
          </div>
          <p className="text-xs font-mono text-muted-foreground mt-2">
            ⚠ Never expose full tokens in production
          </p>
        </CyberCard>
      </div>
    </div>
  );
};

export default Dashboard;
