using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlockChainAPI.Interfaces
{
    public interface IBlock
    {
        string UBN { get; set; }
        int BlockNumber { get; }
        DateTime CreatedDate { get; set; }
        string BlockHash { get; }
        string PreviousBlockHash { get; set; }
        object data { get; set; }
        string peer { get; set; }
        string CalculateBlockHash(string previousBlockHash);
        void SetBlockHash(IBlock parent);
        IBlock NextBlock { get; set; }
        bool IsValidChain(string prevBlockHash, bool verbose);
    }
}