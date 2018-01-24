using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NHibernate.Caches.Redis.Example.Entities
{
    public class Student
    {
        public virtual string Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Class { get; set; }
    }
}
