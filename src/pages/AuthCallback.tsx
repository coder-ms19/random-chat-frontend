import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { oauthService } from '../services';

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your credentials...');

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (token && userStr) {
            try {
                oauthService.handleCallback(token, userStr);
                setStatus('success');
                setMessage('Successfully signed in');

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } catch (error) {
                console.error('Error handling OAuth callback:', error);
                setStatus('error');
                setMessage('Authentication failed');

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } else {
            setStatus('error');
            setMessage('Invalid authentication response');

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#12121a] border border-white/10 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden"
                >
                    {/* Status Icon */}
                    <div className="flex justify-center mb-6">
                        {status === 'loading' && (
                            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                            </div>
                        )}
                        {status === 'success' && (
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                        )}
                        {status === 'error' && (
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                                <XCircle className="w-8 h-8 text-red-500" />
                            </div>
                        )}
                    </div>

                    {/* Text Content */}
                    <h2 className="text-xl font-bold mb-2">
                        {status === 'loading' && 'Just a moment'}
                        {status === 'success' && 'Welcome back!'}
                        {status === 'error' && 'Authentication Error'}
                    </h2>

                    <p className="text-slate-400 text-sm mb-6">
                        {message}
                    </p>

                    {/* Progress Indicator */}
                    {status === 'loading' && (
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
