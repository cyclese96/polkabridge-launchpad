const ethereumNetwork = "ethereum";
const bscNetwork = "bsc";
const polygonNetwork = "polygon";
const harmonyNetwork = "harmony";
const moonriverNetwork = "moonriver";
const astarNetwork = "astar";
const arbitrum = "arbitrum";

const pools = [
  {
    pid: 1,
    network: bscNetwork,
    symbol: "DRATE-PBR",
    startAt: 167907996,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "LEZ-PBR",
    startAt: 1638194430,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "WIDI-PBR",
    startAt: 1638280830,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "ARC-PBR",
    startAt: 1638453630,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "SOLC-PBR",
    startAt: 1638972000,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "DEFLY-PBR",
    startAt: 1639144800,
    access: "Guaranteed",
  },
  {
    pid: 2,
    network: bscNetwork,
    symbol: "CSPD-PBR",
    startAt: 1639152000,
    access: "Guaranteed",
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "SNAP-PBR",
    startAt: 1639490400,
    access: "Guaranteed",
  },
  {
    pid: 1,
    network: moonriverNetwork,
    symbol: "ROAR-PBR",
    startAt: 1639231230,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "GFTS-PBR",
    startAt: 1639836000,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "CALO-PBR",
    startAt: 1640008800,
    access: "Guaranteed",
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "GRAV-PBR",
    startAt: 1640095200,
    access: "Guaranteed",
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "BTL-PBR",
    startAt: 1640181600,
    access: "Guaranteed",
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "VST-PBR",
    startAt: 1640786400,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "ASW-PBR",
    startAt: 1640883600,
  },
  {
    pid: 1,
    network: bscNetwork,
    symbol: "MUSIC-PBR",
    startAt: 1641996000,
  },
  {
    pid: 1,
    network: astarNetwork,
    symbol: "SRS-PBR",
    startAt: 1660485600, //test:1660223103
  },
  {
    pid: 1,
    network: arbitrum,
    symbol: "AIBB-PBR",
    startAt: 1682737935,
  },
];

module.exports = pools;
