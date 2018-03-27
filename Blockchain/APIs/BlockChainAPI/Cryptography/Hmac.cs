using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Cryptography
{
    public class Hmac
    {
        private const int KeySize = 32;

        public static byte[] GenerateKey()
        {
            using (var randomNumberGenerator = new RNGCryptoServiceProvider())
            {
                var randomNumber = new byte[KeySize];
                randomNumberGenerator.GetBytes(randomNumber);

                return randomNumber;
            }
        }

        public static byte[] ComputeHmacsha256(byte[] toBeHashed, byte[] key)
        {
            using (var hmac = new HMACSHA256(key))
            {
                return hmac.ComputeHash(toBeHashed);
            }
        }
    }
}
