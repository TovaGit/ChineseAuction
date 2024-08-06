using Microsoft.EntityFrameworkCore;
using ChineseOction.Models;
namespace ChineseOction.DAL
{
    public class ChineseCondex: DbContext
    {
        public DbSet<Users> Users { get; set; }

        public DbSet<Gifts> Gifts { get; set; }
        public DbSet<Purchases> Purchases { get; set; }
      
        public DbSet<Donors> Donors { get; set; }

        public DbSet<Categorys> Categorys { get; set; }

        public DbSet<Winners> Winners { get; set; }

        public ChineseCondex(DbContextOptions<ChineseCondex> contextOptions) : base(contextOptions)
        {


        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           modelBuilder.Entity<Categorys>().Property(c => c.CategoryId).UseIdentityColumn(100, 1);
           modelBuilder.Entity<Gifts>().Property(g => g.GiftId).UseIdentityColumn(1,1);
           modelBuilder.Entity<Purchases>().Property(p => p.PurchaseNumber).UseIdentityColumn(10, 10);
           modelBuilder.Entity<Winners>().Property(w => w.WinningNumber).UseIdentityColumn(2, 2);
            modelBuilder.Entity<Users>().Property(w => w.Id).UseIdentityColumn(11, 1);
        }


    }
}
