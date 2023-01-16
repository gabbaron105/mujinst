/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:["ag-spots-2020.o.auroraobjects.eu" , "lh3.googleusercontent.com" ,'it.freepik.com/']
  }
}

module.exports = nextConfig
