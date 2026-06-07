import { motion } from 'motion/react';
import { useNews } from '../../hooks/useNews';

export default function BreakingTicker() {
  const { posts } = useNews({ trending: true });

  if (!posts || posts.length === 0) return null;

  return (
    <div className="bg-red-700 text-white text-sm py-2 px-0 flex items-center overflow-hidden border-b-[6px] border-black relative">
      <div className="font-black uppercase tracking-wider mr-4 shrink-0 bg-yellow-400 text-black px-4 py-1.5 flex items-center italic shadow-[5px_0_15px_rgba(0,0,0,0.5)] z-10 text-base">
        <span className="mr-2 h-2.5 w-2.5 bg-red-600 rounded-full animate-pulse shadow-sm"></span>
        ब्रेकिंग न्यूज़
      </div>
      <div className="flex-1 overflow-hidden relative h-5">
        <motion.div
          animate={{ x: [0, -1000] }} // Very basic animation for simplicity; a true ticker would duplicate items
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
          className="flex whitespace-nowrap absolute"
        >
          {posts.map((post, idx) => (
            <span key={post.id} className="mx-4 flex items-center">
              <span className="font-medium">{post.title}</span>
              {idx < posts.length - 1 && <span className="mx-4 opacity-50">•</span>}
            </span>
          ))}
          {/* Duplicate for seamless looping effect */}
          <span className="mx-4 opacity-50">•</span>
          {posts.map((post, idx) => (
            <span key={`${post.id}-dup`} className="mx-4 flex items-center">
              <span className="font-medium">{post.title}</span>
              {idx < posts.length - 1 && <span className="mx-4 opacity-50">•</span>}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
