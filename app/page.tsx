'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.SubmitEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error('Please enter both username and password.');
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      // const result: LoginResponse = await window.api.auth.login(username.trim(), password.trim());
      // if (!result.success || !result.data) {
      //   toast.error(result.error ?? 'Login failed. Please try again.');
      //   return;
      // }
      // toast.success(`Welcome, ${result.data.Username}! (${result.data.Category})`);
      // localStorage.setItem('user', JSON.stringify(result.data));
      router.replace('/PlantModel');
    } catch {
      toast.error('Unable to connect. Please contact your administrator.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 flex  justify-center items-end gap-2">
          <Clock className='w-9 h-9 text-destructive' />
          <h1 className="text-4xl font-bold text-center">BatchScheduler</h1>
        </div>
        {/* Card */}
        <div className="rounded-2xl bg-card px-8 pb-16 pt-8 shadow-xl">
          <p className='font-medium text-lg my-2'>Sign-In To Continue</p>
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Username */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-muted-foreground">
                Username
              </Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-muted-foreground">
                Password
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary cursor-pointer"
            >
              {loading ? (
                <Loader2 className='w-4 h-4 text-white animate-spin' />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}