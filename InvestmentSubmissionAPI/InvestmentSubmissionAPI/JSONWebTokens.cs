using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Jose.jwe;
using Jose.native;
using Security.Cryptography;
using Newtonsoft.Json;
using System.Text;
using System.Reflection;
using System.Collections.ObjectModel;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace InvestmentSubmissionAPI
{

    public class JSONWebTokens
    {
        private Object ObjectToEncrypt { get; set; }

        private String encryptedJwtToken { get; set; }

        private String decryptedJwtToken { get; set; }

        private int expireTokenInMinutes { get; set; }

        private bool isTokenValid { get; set; }

        private String tokenInvalidExceptionMessage { get; set; }

        public JSONWebTokens(Object ObjectToEncrypt, int expireTokenInMinutes)
        {

            this.isTokenValid = true;
            this.tokenInvalidExceptionMessage = string.Empty;

            this.ObjectToEncrypt = ObjectToEncrypt;
            this.expireTokenInMinutes = expireTokenInMinutes;
            this.encryptedJwtToken = GetEncryptedJwtToken(ObjectToEncrypt, expireTokenInMinutes);
            //this.decryptedJwtToken = GetDecryptedJwtToken(this.encryptedJwtToken);
        }

        public JSONWebTokens(String encryptedJwtToken)
        {

            this.isTokenValid = true;
            this.tokenInvalidExceptionMessage = string.Empty;

            this.ObjectToEncrypt = null;
            this.expireTokenInMinutes = 0;
            this.encryptedJwtToken = encryptedJwtToken;
            this.decryptedJwtToken = GetDecryptedJwtToken(this.encryptedJwtToken);
        }

        public String GetEncryptedJwtToken()
        {
            return this.encryptedJwtToken;
        }

        public String GetDecryptedJwtToken()
        {
            if (this.decryptedJwtToken == string.Empty || this.decryptedJwtToken == null)
            {
                this.decryptedJwtToken = GetDecryptedJwtToken(this.encryptedJwtToken);
            }
            return this.decryptedJwtToken;
        }

        private String GetEncryptedJwtToken(Object ObjectToEncrypt, int expireTokenInMinutes)
        {
            try
            {
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

                var securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.Default.GetBytes(ConfigAdapter.SecretClientKey));

                SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha256Digest);
                ClaimsIdentity subject = new ClaimsIdentity();
                subject.AddClaim(new Claim("PayloadData", JsonConvert.SerializeObject(ObjectToEncrypt)));
              

                string issuer = ConfigAdapter.TokenIssuer;
                string audience = ConfigAdapter.TokenAudience;

                JwtSecurityToken createdToken = handler.CreateJwtSecurityToken(issuer, audience, subject, DateTime.Now, DateTime.Now.AddMinutes(expireTokenInMinutes),DateTime.Now, signingCredentials, null);
                handler.WriteToken(createdToken);

                String encryptedJwtToken = createdToken.RawData;
                return encryptedJwtToken;
            }
            catch (Exception ex)
            {

                this.isTokenValid = false;
                this.tokenInvalidExceptionMessage = ex.Message;
                return null;
            }
        }

        private String GetDecryptedJwtToken(String encryptedJwtToken)
        {
            try
            {

                String decryptedJwtToken = encryptedJwtToken;
                JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(decryptedJwtToken);
                JwtPayload jwtPayload = jwtSecurityToken.Payload;

                SecurityToken validatedToken = null;
                SecurityKey securityKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(Encoding.Default.GetBytes(ConfigAdapter.SecretClientKey));
                //ReadOnlyCollection<ClaimsIdentity> validateTokenReponse1 = handler.ValidateToken(jwtSecurityToken);
                TokenValidationParameters parameters = new TokenValidationParameters();
                parameters.ValidateIssuerSigningKey = true;
                parameters.IssuerSigningKey = securityKey;
                parameters.ValidAudience = ConfigAdapter.TokenAudience;
                parameters.ValidateIssuer = ConfigAdapter.ValidateIssuer;
                parameters.ValidateAudience = ConfigAdapter.ValidateAudience;
                parameters.ValidIssuer = ConfigAdapter.TokenIssuer;
                parameters.ValidateIssuer = ConfigAdapter.ValidateIssuer;

                Object payloadData = null;

                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

                ClaimsPrincipal claimsPrinicipal = handler.ValidateToken(decryptedJwtToken, parameters, out validatedToken);


                if (jwtPayload != null)
                {
                    if (jwtPayload.Count > 0)
                    {
                        payloadData = jwtPayload.Where(x => x.Key == "PayloadData").FirstOrDefault().Value;
                    }
                    return payloadData.ToString();
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                this.isTokenValid = false;
                this.tokenInvalidExceptionMessage = ex.Message;
                return null;
            }
        }







    }
}