using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bootcamp.Utilities;

namespace bootcamp.Models
{
    public class BotPresenter
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
    }
}