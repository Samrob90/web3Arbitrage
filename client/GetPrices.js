const ethers = require("ethers")
const {
    addressFactory,
    addressRouter,
    addressFrom,
    addressTo
} = require("./AddressList")

const {
    erc20,
    factoryAbi,
    pairAbi,
    routerAbi
} = require("./AbiList")

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/')


// connect to contract factory
const contractFactory = new ethers.Contract(addressFactory, factoryAbi, provider)


// connect to router
const contractRouter = new ethers.Contract(addressRouter, routerAbi, provider)


// get current price from blockchain

const getPrice = async () => {
    const contractToken = new ethers.Contract(addressFrom, erc20, provider)
    // getting token decimal number
    const decimals = await contractToken.decimals()
    // converting price in $ to decimal number 
    const amountIn = ethers.utils.parseUnits(amountInBUSD, decimals).toString()

    const amountOut = await contractRouter.getAmountsOut(amountIn, [addressFrom, addressTo])


    // read amount in dollars

    const contractToken2 = new ethers.Contract(addressTo, erc20, provider)
    const decimals2 = await contractToken2.decimals()
    const amountOutUSD = ethers.utils.formatUnits(amountOut[1], decimals2).toString()
    console.log(amountOutUSD)

}


const amountInBUSD = "500"
getPrice(amountInBUSD)