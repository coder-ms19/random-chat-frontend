import { motion } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';
import type { ConnectionQuality } from '../hooks/useConnectionQuality';

interface ConnectionQualityIndicatorProps {
    quality: ConnectionQuality;
    latency: number;
    packetLoss: number;
    className?: string;
}

export const ConnectionQualityIndicator = ({
    quality,
    latency,
    packetLoss,
    className = ''
}: ConnectionQualityIndicatorProps) => {
    const getQualityColor = () => {
        switch (quality) {
            case 'excellent':
                return 'text-green-400 border-green-500/50 bg-green-500/10';
            case 'good':
                return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
            case 'poor':
                return 'text-orange-400 border-orange-500/50 bg-orange-500/10';
            case 'disconnected':
                return 'text-red-400 border-red-500/50 bg-red-500/10';
            default:
                return 'text-gray-400 border-gray-500/50 bg-gray-500/10';
        }
    };

    const getSignalBars = () => {
        switch (quality) {
            case 'excellent':
                return 3;
            case 'good':
                return 2;
            case 'poor':
                return 1;
            default:
                return 0;
        }
    };

    const bars = getSignalBars();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 ${getQualityColor()} ${className}`}
        >
            {/* Signal Icon */}
            <div className="relative">
                {quality === 'disconnected' ? (
                    <WifiOff className="w-4 h-4" />
                ) : (
                    <Wifi className="w-4 h-4" />
                )}
            </div>

            {/* Signal Bars */}
            <div className="flex items-end gap-0.5 h-4">
                {[1, 2, 3].map((bar) => (
                    <motion.div
                        key={bar}
                        initial={{ height: 0 }}
                        animate={{
                            height: bar <= bars ? `${bar * 33}%` : '20%',
                            opacity: bar <= bars ? 1 : 0.3
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-1 rounded-full ${bar <= bars
                                ? quality === 'excellent'
                                    ? 'bg-green-400'
                                    : quality === 'good'
                                        ? 'bg-yellow-400'
                                        : 'bg-orange-400'
                                : 'bg-gray-600'
                            }`}
                    />
                ))}
            </div>

            {/* Stats (Desktop only) */}
            <div className="hidden md:flex items-center gap-2 text-xs font-medium">
                <span>{latency}ms</span>
                {packetLoss > 0 && (
                    <span className="opacity-70">
                        {packetLoss.toFixed(1)}% loss
                    </span>
                )}
            </div>
        </motion.div>
    );
};
