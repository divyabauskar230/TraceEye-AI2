/** @type {import('next').NextConfig} */
const nextConfig = {
  // इथे फक्त त्या IP किंवा Host ची यादी द्या ज्याला तुला परवानगी द्यायची आहे
  allowedDevOrigins: ['192.168.43.10', 'localhost'],
};

export default nextConfig;