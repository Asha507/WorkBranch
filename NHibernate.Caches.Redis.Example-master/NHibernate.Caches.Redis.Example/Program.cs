using System;
using NHibernate.Caches.Redis.Example.Entities;
using NHibernate.Linq;
using NHibernate.SqlCommand;
using ServiceStack.Redis;
using StackExchange.Redis;

namespace NHibernate.Caches.Redis.Example
{
    class Program 
    {
        protected const string ValidHost = "localhost:6379";
        protected static BasicRedisClientManager ClientManager { get; private set; }
        protected static IRedisClient Redis { get; private set; }
        protected static IRedisNativeClient RedisNative { get { return (IRedisNativeClient)Redis; } }

        static void Main(string[] args)
        {
            var clientManager = new BasicRedisClientManager("localhost:6379");

            using (var client = clientManager.GetClient())
            {
                client.FlushDb();
            }
           RedisCacheProvider.SetClientManager(clientManager);

            ClientManager = new BasicRedisClientManager(ValidHost);
            Redis = ClientManager.GetClient();
            Redis.FlushDb();

            var sessionFactory = NHibernateSessionFactory.SessionFactory;
            var stats = sessionFactory.Statistics;
            using (var session = NHibernateSessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {                   
                    var query  = session.QueryOver<Student>().Cacheable();
                    var c= query.List();

                    var d=  query.List();

                }
            }
            using (var session = NHibernateSessionFactory.OpenSession())
            {
                using (var transaction = session.BeginTransaction())
                {
                    var query = session.QueryOver<Student>().Cacheable();
                    var c = query.List();

                    var d = query.List();

                }
            }
            Console.ReadLine();
        }

       
    }
}
