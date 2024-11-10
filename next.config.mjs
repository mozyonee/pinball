/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	headers: {
		'Access-Control-Allow-Origin': '*',
	}
};

export default nextConfig;
