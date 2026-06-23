"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";

import { useAuthStore } from "@/store/authStore";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const { setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      const meResponse = await api.get("/auth/me");

      // console.log(meResponse.data);

      setUser(meResponse.data.user);

      toast.success(`Welcome ${meResponse.data.name}`);

      router.replace("/conversations");
    } catch (error: any) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="space-y-6 p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageSquare className="h-7 w-7" />
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold">WhatsApp CRM</h1>

              <p className="text-sm text-muted-foreground">
                Sign in to continue
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  login();
                }
              }}
            />

            <Button className="w-full" onClick={login} disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            WhatsApp CRM Admin Panel
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
