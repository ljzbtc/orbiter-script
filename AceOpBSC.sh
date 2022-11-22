i#!/bin/bash 
echo $(date)
echo "==========脚本开始执行共计划执行$1次======"
for i in $(seq 1 $1)  
do   
node ./src/opToBsc.js
echo 休息$2s
sleep $2 
done 
echo "========OP向BSC的已完成======="


node ./src/BsctoOp.js
echo "=========脚本结束========="

