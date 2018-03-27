using BlockChainAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Security.Cryptography;
using Cryptography;
using System.Reflection;

namespace BlockChainAPI
{
    public class Block
    {
        
        public string UBN { get; private set; }
        // Set as part of the block creation process.
        public int BlockNumber { get; private set; }
        public DateTime CreatedDate { get; set; }
        public string BlockHash { get; private set; }
        public string PreviousBlockHash { get; set; }
        public IBlock NextBlock { get; set; }
        public object Data { get; set; }
        public string Peer { get; set; }
        public Block(int blockNumber,
                     string ubn,
                     string peer, 
                    object dataObj,
                     IBlock parent)
        {
            BlockNumber = blockNumber;
            UBN = ubn;
            Data = dataObj;
            Peer = peer;
            CreatedDate = DateTime.UtcNow;
            SetBlockHash(parent);
        }

        public string CalculateBlockHash(string previousBlockHash)
        {
            string txnHash = UBN + PeerDataString(Data);       
            
            string blockheader = BlockNumber + CreatedDate.ToString() + previousBlockHash;
            string combined = txnHash + blockheader;

            return Convert.ToBase64String(HashData.ComputeHashSha256(Encoding.UTF8.GetBytes(combined)));
        }

        private string PeerDataString(object data)
        {
            string dataString = string.Empty;
            Type t = data.GetType();
            foreach (PropertyInfo property in t.GetProperties())
            {
               if(property.GetType().IsClass)
                {
                    foreach (PropertyInfo subProperty in property.GetType().GetProperties())
                    {
                        dataString += subProperty.GetValue(data);
                    }
                }
               else
                {
                    dataString += property.GetValue(data);
                }
            }
            return dataString;
        }


        // Set the block hash
        public void SetBlockHash(IBlock parent)
        {
            if (parent != null)
            {
                PreviousBlockHash = parent.BlockHash;
                parent.NextBlock = (IBlock)this;
            }
            else
            {
                // Previous block is the genesis block.
                PreviousBlockHash = null;
            }

            BlockHash = CalculateBlockHash(PreviousBlockHash);
        }


        public bool IsValidChain(string prevBlockHash, bool verbose)
        {
            bool isValid = true;

            // Is this a valid block and transaction
            string newBlockHash = CalculateBlockHash(prevBlockHash);
            if (newBlockHash != BlockHash)
            {
                isValid = false;
            }
            else
            {
                // Does the previous block hash match the latest previous block hash
                isValid |= PreviousBlockHash == prevBlockHash;
            }

            PrintVerificationMessage(verbose, isValid);

            // Check the next block by passing in our newly calculated blockhash. This will be compared to the previous
            // hash in the next block. They should match for the chain to be valid.
            if (NextBlock != null)
            {
                return NextBlock.IsValidChain(newBlockHash, verbose);
            }

            return isValid;
        }

        private void PrintVerificationMessage(bool verbose, bool isValid)
        {
            if (verbose)
            {
                if (!isValid)
                {
                    Console.WriteLine("Block Number " + BlockNumber + " : FAILED VERIFICATION");
                }
                else
                {
                    Console.WriteLine("Block Number " + BlockNumber + " : PASS VERIFICATION");
                }
            }
        }
    }
}