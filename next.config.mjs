/** @type {import('next').NextConfig} */
const nextConfig = {
//    redirects: async () => {
//     return [
//         {
//             source: '/',
//             destination: '/login',
//             permanent: false, // Use false for temporary redirect
//         },
//     ]
//    },
     images: {
         remotePatterns:[
           { 
            protocol: 'https',
            hostname: 'exam.elevateegy.com',
           }
         ]
     }
};

export default nextConfig;
