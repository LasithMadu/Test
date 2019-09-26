const Block = require('./block');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    const genesisData = '16/08/1995'
    return new Block('Genesis Block', 0, genesisData, '0');
  }

  getLastBlock(){
    return this.chain[this.chain.length-1];
  }

  addNewBlock(newBlock) {
    newBlock.previousHash = this.getLastBlock().hash;
    newBlock.index = this.getLastBlock().index+1;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock)
  }

  isChainValid(){
    const chain = this.chain;

    for (var i = 0; i < chain.length; i++) {
      //Check any block of the chain is change
      if (chain[i].hash !== chain[i].calculateHash()) {
        console.log(`Block ${i} has been corrupted`);
        return false;
      }
      //Check previous block of the chain is change
      if (i>0 && chain[i].previousHash !== chain[i-1].hash) {
        console.log(`Block ${i-1} has been correpted`);
        return false;
      }
    }

    console.log('Chain is valid');
    return true;
  }
}

let blockToAdd = 5;

const PolyChain = new Blockchain();

for(i=0; i<blockToAdd; i++){
  PolyChain.addNewBlock(new Block({sender: 'Lasith', recever: 'Sumudu', message: 'Block '+PolyChain.chain.length+' has been added to chain'}));
}

PolyChain.chain.forEach((block)=> {
  console.log(block);
})
