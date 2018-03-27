using BlockChainAPI.Interfaces;

namespace BlockChainAPI
{
    public interface IBlockChain
    {
        void AcceptBlock(IBlock block);
        void VerifyChain();
    }
}