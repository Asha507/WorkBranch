using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NHibernateDemoApp
{
    class Student
    {
        public virtual string ID { get; set; }
        public virtual string Name { get; set; }
        public virtual string Class { get; set; }
    }

}
