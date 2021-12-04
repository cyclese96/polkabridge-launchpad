const BigNumber = require("bignumber.js")

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const stakingAbi = require('./abi/staking.json');
const request = require('request')

require('dotenv').config();

var Web3 = require("web3");
const getPoolObject = require("./utils");
var web3 = new Web3();

//Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


const testing = false;
const currentConnection = testing ? 'testnet' : 'mainnet'

const ethereumInfuraTestnetRpc = `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;
const ethereumInfuraRpc = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`;

const polygonMainnetInfuraRpc = `https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
const polygonTestnetInfuraRpc = `https://polygon-mumbai.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`

const stakeContractAddresses = {
    'ethereum': {
        1: '0x1b46b72c5280f30Fbe8A958B4f3c348FD0fD2E55',
        42: '0x7678f0AF7304e01554E2D49D96E55C8de4975c66'
    },
    'polygon': {
        137: '0x6335aF028e77B574423733443678aD4cb9e15B3D',
        80001: '0x55950cF279Ba5b43263f4Df54833b85F684B333F',
    },
    'harmony': {
        //todo:
    }
}

//matic connector
const getContractInstance = (abi, contractAddress, network = 'polygon') => {

    let rpc;
    if (network === 'polygon') {
        rpc = currentConnection === 'mainnet' ? polygonMainnetInfuraRpc : polygonTestnetInfuraRpc;
    } else {
        rpc = currentConnection === 'mainnet' ? ethereumInfuraRpc : ethereumInfuraTestnetRpc;
    }

    const web3 = new Web3(new Web3.providers.HttpProvider(rpc));

    return new web3.eth.Contract(abi, contractAddress);
};

const fetchStakeAmount = async (account) => {

    try {

        const maticStakeAbi = stakingAbi;
        const maticStakeAddress = currentConnection === 'mainnet' ? stakeContractAddresses.polygon[137] : stakeContractAddresses.polygon[80001]
        const maticStakeContract = getContractInstance(maticStakeAbi, maticStakeAddress, 'polygon');

        const ethereumStakeAbi = stakingAbi;
        const ethereumStakeAddress = currentConnection === 'mainnet' ? stakeContractAddresses.ethereum[1] : stakeContractAddresses.ethereum[42]
        const ethereumStakeContract = getContractInstance(ethereumStakeAbi, ethereumStakeAddress, 'ethereum')


        const [etherStakeData, maticStakeData] = await Promise.all([
            ethereumStakeContract.methods.userInfo(0, account).call(),
            maticStakeContract.methods.userInfo(0, account).call()
        ])

        const totalStakeAmount = new BigNumber(etherStakeData.amount).plus(maticStakeData.amount).toFixed(0).toString()

        return totalStakeAmount

    } catch (error) {
        console.log('fetchStakeAmount', error)
        return new BigNumber(0).toFixed(0).toString();
    }

}


app.post("/api/ido/sign/v1", async (req, res) => {

    try {
        const api_key = req.body.apiKey;
        if (api_key !== process.env.API_KEY) {
            return res.status(401).send({ message: "Access denied, Unauthorized user" });
        }

        const network = req.body.network;
        const symbol = req.body.symbol;

        const userAddress = req.body.userAddress;

        const currPoolObj = getPoolObject(network, symbol);

        if (!currPoolObj) {
            return res.status(403).send({ message: "Access denied, pool is not allowed to purchase yet!" });
        }

        if (currPoolObj.startAt * 1000 > new Date().getTime()) {
            return res.status(403).send({ message: "Access denied, pool is not allowed to purchase yet!" });
        }


        if (!userAddress || userAddress === '0x0000000000000000000000000000000000000000') {
            return res.status(401).send({ message: "Access denied, Invalid user address!" });
        }

        const _totalStakeAmount = await fetchStakeAmount(userAddress);

        if (currPoolObj.access && currPoolObj.access === 'Guaranteed' && new BigNumber(_totalStakeAmount).lt(10000000000000000000000)) {
            return res.status(403).send({ message: "Access denied, Not enough staked tokens!" });
        }
        // console.log('total stake amount ', { _totalStakeAmount, userAddress })
        const userSting = Web3.utils.soliditySha3(
            { t: 'address', v: userAddress },
            { t: 'uint256', v: _totalStakeAmount }
        );
        // Descrypting the key for sign
        const actualKey = () => {
            let oldKey = process.env.PRIVATE_KEY;
            let newKey = oldKey.split("").reverse().join("");
            return newKey;
        };

        let privateKey = actualKey();
        let data = await web3.eth.accounts.sign(
            userSting.toString(),
            privateKey
        );

        const v = data.v;
        const r = data.r;
        const s = data.s;
        return res.status(201).send({ v, r, s, totalStaked: _totalStakeAmount });

    } catch (error) {
        console.log('API error', error)
        return res.status(401).send({ success: false, data: null, message: "Something went wrong in sign function" })
    }
});


app.post("/api/recaptcha/verify/v1", async (req, res) => {

    try {
        const api_key = req.body.apiKey;
        if (api_key !== process.env.API_KEY) {
            return res.status(404).send({ message: "Access denied, Unauthorized user" });
        }
        const verificationValue = req.body.verificationValue;

        const postData = { secret: process.env.GOOGLE_CAPTCHA_KEY, response: verificationValue };

        var clientServerOptions = {
            uri: 'https://www.google.com/recaptcha/api/siteverify',
            body: `secret=${postData.secret}&response=${verificationValue}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        request(clientServerOptions, function (error, response) {

            if (error) {
                return res.status(401).send(error)
            }

            return res.status(200).send(response.body);
        });


    } catch (error) {
        console.log('API error', error)
        return res.status(401).send({ success: false, data: null, message: "Something went wrong in sign function" })
    }
});

module.exports = app;