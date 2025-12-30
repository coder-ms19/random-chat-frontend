import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import {
    MessageCircle, Shield, Zap, Globe,
    Video, Users
} from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <h3 className="text-base font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>
    </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-[#12121a] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors ${className}`}>
        {children}
    </div>
);

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            setUser(JSON.parse(userStr));
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('auth-change'));
        setUser(null);
        setIsLoggedIn(false);
        navigate('/login');
    };

    const features = [
        { icon: Zap, title: "Instant Connections", description: "Match with people instantly using our optimized pairing system." },
        { icon: Shield, title: "Secure & Private", description: "End-to-end encrypted peer-to-peer connections for your privacy." },
        { icon: Video, title: "HD Video Quality", description: "Crystal clear video and audio powered by WebRTC technology." },
        { icon: Globe, title: "Global Community", description: "Connect with users from different cultures around the world." },
    ];

    return (
        <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-blue-500/30">
            <Navbar user={user} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

            <main className="pt-24 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium mb-6">
                            Live Video Chat v2.0
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            Connect with the
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">World Instantly</span>
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                            Experience the next generation of random video chat. Meet new people, make friends, and discover cultures through seamless, high-quality video connections.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link to={isLoggedIn ? "/random-chat" : "/login"} className="w-full sm:w-auto">
                                <Button className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition-all text-lg">
                                    Start Video Chat
                                </Button>
                            </Link>
                            <Link to="/about" className="w-full sm:w-auto hidden">
                                <Button className="w-full px-8 py-4 bg-[#1e1e2d] border border-white/10 text-white rounded-xl font-medium hover:bg-[#27273a] transition-all text-lg">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Abstract Hero Visual */}
                    <div className="flex-1 flex justify-center relative">
                        <div className="relative w-full max-w-md aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-full blur-[100px] animate-pulse" />
                            <div className="relative z-10 grid grid-cols-2 gap-4 p-8">
                                <div className="bg-[#1a1a24] p-6 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center justify-center gap-4 transform translate-y-8">
                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                                        <Video className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-white">Video</div>
                                        <div className="text-xs text-slate-500">HD Quality</div>
                                    </div>
                                </div>
                                <div className="bg-[#1a1a24] p-6 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center justify-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <Users className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-white">Match</div>
                                        <div className="text-xs text-slate-500">Smart Pairing</div>
                                    </div>
                                </div>
                                <div className="bg-[#1a1a24] p-6 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center justify-center gap-4 md:col-span-2 transform -translate-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm font-medium text-slate-300">1,240+ Users Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {features.map((feature, i) => (
                        <FeatureItem key={i} {...feature} />
                    ))}
                </div>

                {/* Info & Call to Action Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Value Prop */}
                    <Card className="md:col-span-2">
                        <div className="flex flex-col h-full justify-center">
                            <h3 className="text-2xl font-bold text-white mb-4">Why use our Random Chat?</h3>
                            <div className="space-y-4 text-slate-400 leading-relaxed">
                                <p>
                                    Our platform provides a safe and anonymous way to meet people.
                                    Unlike other platforms, we prioritize user experience with a
                                    clean interface and robust connection stability.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> No Registration Required for Guests</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Mobile Optimized</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Low Latency Audio</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Report & Block Features</li>
                                </ul>
                            </div>
                        </div>
                    </Card>

                    {/* Simple CTA */}
                    <Card className="flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#12121a] to-[#0f172a]">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-900/20">
                            <MessageCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ready to talk?</h3>
                        <p className="text-sm text-slate-400 mb-8 px-4">
                            Click below to start finding a match immediately.
                        </p>
                        <Link to={isLoggedIn ? "/random-chat" : "/login"} className="w-full">
                            <Button className="w-full bg-white text-black hover:bg-slate-200 rounded-xl py-3 font-bold transition-colors">
                                Start Now
                            </Button>
                        </Link>
                    </Card>
                </div>

                {/* Footer Section */}
                <footer className="border-t border-white/10 mt-20 pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
                    <div>© 2025 RandomChat App. All rights reserved.</div>
                    <div className="flex gap-6">
                        <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
                        <span className="cursor-pointer hover:text-white transition-colors">Contact Support</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
