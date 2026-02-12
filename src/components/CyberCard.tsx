import { ReactNode } from "react";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

const CyberCard = ({ children, className = "", glow = false }: CyberCardProps) => {
  return (
    <div
      className={`relative bg-card border border-border rounded-lg p-6 scanline ${
        glow ? "neon-border" : ""
      } ${className}`}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br-lg" />
      {children}
    </div>
  );
};

export default CyberCard;
