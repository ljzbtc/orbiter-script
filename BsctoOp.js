//导入需要的包
const ethers = require("ethers");
const { exit } = require("process");
require("dotenv").config(); //导入

//导入需要的合约api
const abi = require("./bsc_eth.json");
contractAddress = "0x2170Ed0880ac9A755fd29B2688956BD959F933F8";

const OP_CODE = 9007;
const ETH_DECL = 1e18;

const toPolyAddress = "0x80C67432656d59144cEFf962E8fAF8926599bCF8";

async function main() {
  trs_network = process.env.BSC_RPC_URL;

  // 首先连接网络
  const provider = new ethers.providers.JsonRpcBatchProvider(trs_network);

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  walletBalance = await wallet.getBalance();
  console.log(">>>>>>>>>>>>>>>>.<<<<<<<<<<<<<<<<");
  console.log();
  // console.log(wallet.address);
  console.log(`当前钱包BNB余额:${walletBalance.toString() / ETH_DECL} BNB`);

  //建立合约的调用
  let contractWithSigner = new ethers.Contract(contractAddress, abi, wallet);

  BSC_ETH = await contractWithSigner.balanceOf(wallet.address);
  console.log(">>>>>>>>>>>>>>>>.<<<<<<<<<<<<<<<<");
  console.log();

  console.log(`当前钱包ETH余额:${BSC_ETH.toString() / ETH_DECL} ETH`);
  console.log();
  console.log(">>>>>>>>>>>>>>>>.<<<<<<<<<<<<<<<<");
  //计算转账金额

  target =(BSC_ETH.toString() / ETH_DECL -0.0025).toString()

  if(target<=0.006){

    console.log("小于最小值")
    exit(0)
  }
  const ETH_VAULE_WEI = target.padEnd("18", "0");
  console.log(`使用ORBITER从BSC转到OP:     ${ETH_VAULE_WEI} ETH`);

  // 5. Create tx object

  to = toPolyAddress;
  value = ethers.utils.parseEther(
    "0." + ETH_VAULE_WEI.substring(ETH_VAULE_WEI.indexOf(".") + 1, 16) + OP_CODE
  );

  // 参数传入合约进行
  transactionRespond = await contractWithSigner.transfer(toPolyAddress, value);

  console.log(
    `Transaction successful with hash: ${transactionRespond}`
  );

  console.log(`转账完成${ETH_VAULE_WEI}`);
  console.log();
  console.log(">>>>>>>>>>>>>>>>.<<<<<<<<<<<<<<<<");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
