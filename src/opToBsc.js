//async 异步
// synchronous [solidity]
//promise ->pending fulfi

// Setup

const ethers = require("ethers");
const BSC_ORBIT_address ="0x80c67432656d59144ceff962e8faf8926599bcf8"


const BSC_CODE =9015
const ETH_DECL = 1e18;

const GWEI_DECL = 1e8;
require("dotenv").config(); //导入
async function main() {
  trs_network = process.env.OP_RPC_URL;
  // 首先连接网络
  const provider = new ethers.providers.JsonRpcBatchProvider(trs_network);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  walletBalance = await wallet.getBalance();
  console.log(">>>>>>>>>>>>>>>>.<<<<<<<<<<<<<<<<")
  console.log()
  // console.log(wallet.address)
  console.log(  `当前钱包ETH余额:${walletBalance.toString() / ETH_DECL} ETH`)
  console.log()
  console.log(">>>>>>>>>>>>>>>>.<<<<<<<<<<<<<<<<")

  addressTo =BSC_ORBIT_address
  //最小转账金额大于0.006ETH
  const ETH_VAULE_WEI= "0.006".padEnd("18","0")
  console.log(`使用ORBITER从OP转到BSC:     ${ETH_VAULE_WEI} ETH`)
  // 构造交易，不处理gas费
  const tx = {
    to: BSC_ORBIT_address,
    value:ethers.utils.parseEther("0."+ETH_VAULE_WEI.substring(ETH_VAULE_WEI.indexOf(".")+1,16)+BSC_CODE),
  };
  
  // 签名并且提交交易

  console.log(">>>>>>>>>>>>>>>>.<<<<<<<<<<<<<<<<")
  console.log()
  console.log(`签名并且提交交易`)
  const createReceipt = await wallet.sendTransaction(tx);
  await createReceipt.wait();
  console.log(`Transaction successful with hash: ${createReceipt.hash}`);

  console.log(`转账完成${ETH_VAULE_WEI}`)
  console.log()
  console.log(">>>>>>>>>>>>>>>>.<<<<<<<<<<<<<<<<")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
