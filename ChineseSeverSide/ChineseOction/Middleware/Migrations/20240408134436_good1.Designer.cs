﻿// <auto-generated />
using System;
using ChineseOction.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ChineseOction.Migrations
{
    [DbContext(typeof(ChineseCondex))]
    [Migration("20240408134436_good1")]
    partial class good1
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ChineseOction.Models.Categorys", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CategoryId"), 100L);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CategoryId");

                    b.ToTable("Categorys");
                });

            modelBuilder.Entity("ChineseOction.Models.Donors", b =>
                {
                    b.Property<int>("DonorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DonorId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("DonorId");

                    b.ToTable("Donors");
                });

            modelBuilder.Entity("ChineseOction.Models.Gifts", b =>
                {
                    b.Property<int>("GiftId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GiftId"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<int>("DonorId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Price")
                        .HasColumnType("int");

                    b.Property<int?>("PurchasesPurchaseNumber")
                        .HasColumnType("int");

                    b.HasKey("GiftId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("DonorId");

                    b.HasIndex("PurchasesPurchaseNumber");

                    b.ToTable("Gifts");
                });

            modelBuilder.Entity("ChineseOction.Models.Purchases", b =>
                {
                    b.Property<int>("PurchaseNumber")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PurchaseNumber"), 10L, 10);

                    b.Property<int>("AmountOfTickets")
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("GiftId")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("PurchaseNumber");

                    b.ToTable("Purchases");
                });

            modelBuilder.Entity("ChineseOction.Models.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsManager")
                        .HasColumnType("bit");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PurchasesPurchaseNumber")
                        .HasColumnType("int");

                    b.Property<string>("Pwd")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PurchasesPurchaseNumber");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ChineseOction.Models.Winners", b =>
                {
                    b.Property<int>("WinningNumber")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WinningNumber"), 2L, 2);

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("WinningNumber");

                    b.HasIndex("UserId");

                    b.ToTable("Winners");
                });

            modelBuilder.Entity("ChineseOction.Models.Gifts", b =>
                {
                    b.HasOne("ChineseOction.Models.Categorys", "Category")
                        .WithMany("Gifts")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ChineseOction.Models.Donors", "Donor")
                        .WithMany("Gifts")
                        .HasForeignKey("DonorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ChineseOction.Models.Purchases", null)
                        .WithMany("Gift")
                        .HasForeignKey("PurchasesPurchaseNumber");

                    b.Navigation("Category");

                    b.Navigation("Donor");
                });

            modelBuilder.Entity("ChineseOction.Models.Users", b =>
                {
                    b.HasOne("ChineseOction.Models.Purchases", null)
                        .WithMany("User")
                        .HasForeignKey("PurchasesPurchaseNumber");
                });

            modelBuilder.Entity("ChineseOction.Models.Winners", b =>
                {
                    b.HasOne("ChineseOction.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("ChineseOction.Models.Categorys", b =>
                {
                    b.Navigation("Gifts");
                });

            modelBuilder.Entity("ChineseOction.Models.Donors", b =>
                {
                    b.Navigation("Gifts");
                });

            modelBuilder.Entity("ChineseOction.Models.Purchases", b =>
                {
                    b.Navigation("Gift");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
