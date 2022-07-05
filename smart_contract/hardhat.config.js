//https://eth-goerli.g.alchemy.com/v2/DtXUy2nXeI3wF00mh1rk8e9odTwiO9X_
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/9aerQ6uhhVqJ2JmEWzWksZV7qk0RAyMO',
      accounts: ['6e4b52e89728dba1a805eaf7e17ec25baffd9b4731bd2799825fe26210355326']
    }
  }
}