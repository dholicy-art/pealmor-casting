import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useI18n } from "@/i18n/I18nContext";

const SAVED_EMAIL_KEY = "pealmor-saved-email";
const AUTO_LOGIN_KEY = "pealmor-auto-login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  // Load saved email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem(SAVED_EMAIL_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
    const savedAutoLogin = localStorage.getItem(AUTO_LOGIN_KEY);
    if (savedAutoLogin === "true") {
      setAutoLogin(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("회원가입 성공!");
        navigate("/");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
      } else {
        // Save preferences on successful login
        if (rememberEmail) {
          localStorage.setItem(SAVED_EMAIL_KEY, email);
        } else {
          localStorage.removeItem(SAVED_EMAIL_KEY);
        }
        if (autoLogin) {
          localStorage.setItem(AUTO_LOGIN_KEY, "true");
        } else {
          localStorage.removeItem(AUTO_LOGIN_KEY);
        }
        navigate("/");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold">P</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">PEALMOR Casting</span>
        </Link>

        <div className="rounded-xl border border-border bg-card p-8">
          <h1 className="font-display text-2xl font-bold text-foreground text-center mb-6">
            {isSignUp ? "회원가입" : "로그인"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="displayName" className="text-foreground">이름</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="mt-1"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-foreground">이메일</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground">비밀번호</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="mt-1"
              />
            </div>

            {!isSignUp && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="rememberEmail"
                    checked={rememberEmail}
                    onCheckedChange={(checked) => {
                      setRememberEmail(!!checked);
                      if (!checked) {
                        setAutoLogin(false);
                        localStorage.removeItem(SAVED_EMAIL_KEY);
                      }
                    }}
                  />
                  <Label htmlFor="rememberEmail" className="text-sm text-muted-foreground cursor-pointer">
                    아이디 저장
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="autoLogin"
                    checked={autoLogin}
                    onCheckedChange={(checked) => {
                      setAutoLogin(!!checked);
                      if (checked) setRememberEmail(true);
                    }}
                  />
                  <Label htmlFor="autoLogin" className="text-sm text-muted-foreground cursor-pointer">
                    자동 로그인
                  </Label>
                </div>
              </div>
            )}

            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
