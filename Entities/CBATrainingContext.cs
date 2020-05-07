using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBA_Training.Entities
{
    public class CBATrainingContext : DbContext
    {
        public CBATrainingContext() { }
        public CBATrainingContext(DbContextOptions<CBATrainingContext> options) : base(options) { }
        public DbSet<Department> Department { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>()
                .Property(b => b.Name)
                .IsRequired();

            modelBuilder.Entity<Department>().HasData(
        new Department() { Id = 1, Name = "HR", Description = "It is the company department charged with finding, screening, recruiting and training." });

            modelBuilder.Entity<Department>().HasData(
        new Department() { Id = 2, Name = "Account", Description = "The accounting department is responsible for recording and reporting the cash flow transactions of a company." });

            modelBuilder.Entity<Department>().HasData(
        new Department() { Id = 3, Name = "Sales", Description = "A sales department is the direct link between a company's product or service and its customers. " });
        }

    }
}