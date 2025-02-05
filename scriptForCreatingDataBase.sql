USE [master]
GO
/****** Object:  Database [ChineseAuction]    Script Date: 6/19/2024 1:45:12 AM ******/
CREATE DATABASE ChineseAuction
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ChineseAuction', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ChineseAuction.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ChineseAuction_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ChineseAuction_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE ChineseAuction SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ChineseAuction].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ChineseAuction] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ChineseAuction] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ChineseAuction] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ChineseAuction] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ChineseAuction] SET ARITHABORT OFF 
GO
ALTER DATABASE [ChineseAuction] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [ChineseAuction] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ChineseAuction] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ChineseAuction] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ChineseAuction] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ChineseAuction] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ChineseAuction] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ChineseAuction] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ChineseAuction] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ChineseAuction] SET  ENABLE_BROKER 
GO
ALTER DATABASE [ChineseAuction] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ChineseAuction] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ChineseAuction] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ChineseAuction] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ChineseAuction] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ChineseAuction] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [ChineseAuction] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ChineseAuction] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ChineseAuction] SET  MULTI_USER 
GO
ALTER DATABASE [ChineseAuction] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ChineseAuction] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ChineseAuction] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ChineseAuction] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ChineseAuction] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ChineseAuction] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ChineseAuction] SET QUERY_STORE = OFF
GO
USE [ChineseAuction]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 6/19/2024 1:45:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categorys]    Script Date: 6/19/2024 1:45:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categorys](
	[CategoryId] [int] IDENTITY(100,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Categorys] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Donors]    Script Date: 6/19/2024 1:45:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Donors](
	[DonorId] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Donors] PRIMARY KEY CLUSTERED 
(
	[DonorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gifts]    Script Date: 6/19/2024 1:45:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gifts](
	[GiftId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[DonorId] [int] NOT NULL,
	[CategoryId] [int] NOT NULL,
	[Price] [int] NOT NULL,
	[PurchasesPurchaseNumber] [int] NULL,
 CONSTRAINT [PK_Gifts] PRIMARY KEY CLUSTERED 
(
	[GiftId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Purchases]    Script Date: 6/19/2024 1:45:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Purchases](
	[PurchaseNumber] [int] IDENTITY(10,10) NOT NULL,
	[UserId] [int] NOT NULL,
	[GiftId] [int] NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[Status] [bit] NOT NULL,
	[AmountOfTickets] [int] NOT NULL,
 CONSTRAINT [PK_Purchases] PRIMARY KEY CLUSTERED 
(
	[PurchaseNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 6/19/2024 1:45:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
	[Pwd] [nvarchar](max) NOT NULL,
	[FullName] [nvarchar](max) NOT NULL,
	[Phone] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[IsManager] [bit] NOT NULL,
	[PurchasesPurchaseNumber] [int] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Winners]    Script Date: 6/19/2024 1:45:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Winners](
	[WinningNumber] [int] IDENTITY(2,2) NOT NULL,
	[UserId] [int] NOT NULL,
	[GiftId] [int] NOT NULL,
 CONSTRAINT [PK_Winners] PRIMARY KEY CLUSTERED 
(
	[WinningNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240403182831_c1', N'7.0.16')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240408124100_good', N'7.0.16')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240408134436_good1', N'7.0.16')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240512120746_c2', N'7.0.16')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240512123858_c5', N'7.0.16')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240514190208_ref', N'7.0.16')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240514190706_ref1', N'7.0.16')
GO
SET IDENTITY_INSERT [dbo].[Categorys] ON 

INSERT [dbo].[Categorys] ([CategoryId], [Name]) VALUES (100, N'Home')
INSERT [dbo].[Categorys] ([CategoryId], [Name]) VALUES (101, N'Furniture')
INSERT [dbo].[Categorys] ([CategoryId], [Name]) VALUES (102, N'Devices')
INSERT [dbo].[Categorys] ([CategoryId], [Name]) VALUES (103, N'Games and Trips')
INSERT [dbo].[Categorys] ([CategoryId], [Name]) VALUES (104, N'Others')
INSERT [dbo].[Categorys] ([CategoryId], [Name]) VALUES (105, N'Vehicle')
INSERT [dbo].[Categorys] ([CategoryId], [Name]) VALUES (120, N'Clothing')
SET IDENTITY_INSERT [dbo].[Categorys] OFF
GO
SET IDENTITY_INSERT [dbo].[Donors] ON 

INSERT [dbo].[Donors] ([DonorId], [FullName], [Phone], [Email]) VALUES (3, N'Bro Code', N'0555648956', N'0555648956@.co.il')
INSERT [dbo].[Donors] ([DonorId], [FullName], [Phone], [Email]) VALUES (4, N'Barry Danic', N'0778965454', N'0778965454@gmail.com')
INSERT [dbo].[Donors] ([DonorId], [FullName], [Phone], [Email]) VALUES (5, N'Tova Bienstock', N'0534106302', N'tova6302@gmail.com')
INSERT [dbo].[Donors] ([DonorId], [FullName], [Phone], [Email]) VALUES (6, N'Tehila Redlic', N'0583295338', N'thl95338@gmail.com')
INSERT [dbo].[Donors] ([DonorId], [FullName], [Phone], [Email]) VALUES (7, N'Sam Sandi', N'026514898', N'Sanddd@gmail.com')
INSERT [dbo].[Donors] ([DonorId], [FullName], [Phone], [Email]) VALUES (8, N'Joe Black', N'045625897', N'Joe@gmail.com')
INSERT [dbo].[Donors] ([DonorId], [FullName], [Phone], [Email]) VALUES (9, N'Aviva Trop', N'8725648989', N'Trop@gmail.com')
INSERT [dbo].[Donors] ([DonorId], [FullName], [Phone], [Email]) VALUES (10, N'Sara Gollie', N'05334565858', N'SaGe@gmail.com')
SET IDENTITY_INSERT [dbo].[Donors] OFF
GO
SET IDENTITY_INSERT [dbo].[Gifts] ON 

INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (1, N'A set of pans', 4, 100, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (2, N'Dining room table', 4, 101, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (3, N'Air conditioner', 4, 100, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (4, N'Amusement Park', 4, 103, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (5, N'Books for ever', 5, 103, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (6, N'Bathroom renovation', 5, 100, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (7, N'Food for a year', 5, 100, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (8, N'Shopping giftCard', 5, 120, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (9, N'Camra', 3, 102, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (10, N'Convertible car', 3, 105, 20, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (11, N'Couch', 3, 101, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (12, N'Desktop computer', 3, 102, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (13, N'DJ', 6, 102, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (14, N'Electric bike and scooter', 6, 105, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (15, N'Flight to Dubai', 6, 103, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (16, N'Flight to Switzerland', 6, 103, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (17, N'Garden kit', 7, 100, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (18, N'Household appliances', 7, 100, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (19, N'Jeep-Tour', 7, 103, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (20, N'Jewellery', 7, 120, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (21, N'kitchen-appliances', 8, 100, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (22, N'Laptop', 8, 102, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (23, N'Large Car', 8, 105, 20, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (24, N'5000$ Cash', 9, 104, 25, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (25, N'Parachuting Trip', 9, 103, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (26, N'Renivate Your Kitchen', 9, 101, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (27, N'Sefer Torah', 9, 104, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (28, N'Kids bedroom', 8, 101, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (29, N'Shoes for the whole family', 10, 120, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (30, N'Shopping in Manhatten', 10, 120, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (31, N'Speed Car', 10, 105, 20, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (32, N'Surprise!!', 10, 104, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (33, N'Trip to Isreal', 3, 103, 15, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (34, N'Tuition', 4, 104, 10, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (35, N'Washing machine and dryer', 5, 100, 5, NULL)
INSERT [dbo].[Gifts] ([GiftId], [Name], [DonorId], [CategoryId], [Price], [PurchasesPurchaseNumber]) VALUES (36, N'Doll House', 10, 103, 5, NULL)
SET IDENTITY_INSERT [dbo].[Gifts] OFF
GO
SET IDENTITY_INSERT [dbo].[Purchases] ON 

INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (20, 1, 1, CAST(N'2024-04-03T22:39:12.8339385' AS DateTime2), 1, 6)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (30, 1, 1, CAST(N'2024-04-03T22:39:24.3786087' AS DateTime2), 0, 2)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (40, 1, 2, CAST(N'2024-04-03T22:39:28.6795841' AS DateTime2), 0, 3)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (50, 2, 4, CAST(N'2024-05-12T18:29:06.6962788' AS DateTime2), 1, 5)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (60, 2, 3, CAST(N'2024-05-12T19:00:35.0631805' AS DateTime2), 1, 1)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (70, 3, 4, CAST(N'2024-05-14T22:18:27.6628129' AS DateTime2), 0, 2)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (100, 24, 2, CAST(N'2024-06-18T00:38:46.2807515' AS DateTime2), 0, 3)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (110, 24, 7, CAST(N'2024-06-18T21:41:49.4125862' AS DateTime2), 0, 1)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (120, 24, 11, CAST(N'2024-06-18T21:41:54.9936140' AS DateTime2), 0, 1)
INSERT [dbo].[Purchases] ([PurchaseNumber], [UserId], [GiftId], [Date], [Status], [AmountOfTickets]) VALUES (130, 3, 15, CAST(N'2024-06-18T23:10:12.4493243' AS DateTime2), 0, 3)
SET IDENTITY_INSERT [dbo].[Purchases] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [UserName], [Pwd], [FullName], [Phone], [Email], [IsManager], [PurchasesPurchaseNumber]) VALUES (2, N'tb', N'410', N'tova bienstock', N'0534106302', N'2t', 0, NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Pwd], [FullName], [Phone], [Email], [IsManager], [PurchasesPurchaseNumber]) VALUES (3, N'opo', N'125', N'yuoy fg', N'12', N'string', 0, NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Pwd], [FullName], [Phone], [Email], [IsManager], [PurchasesPurchaseNumber]) VALUES (24, N'1', N'1', N'1', N'053', N'string', 1, NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Pwd], [FullName], [Phone], [Email], [IsManager], [PurchasesPurchaseNumber]) VALUES (25, N'string', N'string', N'string string', N'string', N'string', 0, NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Pwd], [FullName], [Phone], [Email], [IsManager], [PurchasesPurchaseNumber]) VALUES (26, N'tovab', N'410', N'טובה בינשטאק', N'0534106302', N'tova6302@gmail.com', 0, NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Pwd], [FullName], [Phone], [Email], [IsManager], [PurchasesPurchaseNumber]) VALUES (28, N'', N'', N' ', N'', N'', 0, NULL)
INSERT [dbo].[Users] ([Id], [UserName], [Pwd], [FullName], [Phone], [Email], [IsManager], [PurchasesPurchaseNumber]) VALUES (29, N'tt', N'אא', N'תהילה רדליך', N'26-510-373_', N'THL95338@GMAIL.COM', 0, NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
/****** Object:  Index [IX_Gifts_CategoryId]    Script Date: 6/19/2024 1:45:12 AM ******/
CREATE NONCLUSTERED INDEX [IX_Gifts_CategoryId] ON [dbo].[Gifts]
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Gifts_DonorId]    Script Date: 6/19/2024 1:45:12 AM ******/
CREATE NONCLUSTERED INDEX [IX_Gifts_DonorId] ON [dbo].[Gifts]
(
	[DonorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Gifts_PurchasesPurchaseNumber]    Script Date: 6/19/2024 1:45:12 AM ******/
CREATE NONCLUSTERED INDEX [IX_Gifts_PurchasesPurchaseNumber] ON [dbo].[Gifts]
(
	[PurchasesPurchaseNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_PurchasesPurchaseNumber]    Script Date: 6/19/2024 1:45:12 AM ******/
CREATE NONCLUSTERED INDEX [IX_Users_PurchasesPurchaseNumber] ON [dbo].[Users]
(
	[PurchasesPurchaseNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Winners_GiftId]    Script Date: 6/19/2024 1:45:12 AM ******/
CREATE NONCLUSTERED INDEX [IX_Winners_GiftId] ON [dbo].[Winners]
(
	[GiftId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Winners_UserId]    Script Date: 6/19/2024 1:45:12 AM ******/
CREATE NONCLUSTERED INDEX [IX_Winners_UserId] ON [dbo].[Winners]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Winners] ADD  DEFAULT ((0)) FOR [GiftId]
GO
ALTER TABLE [dbo].[Gifts]  WITH CHECK ADD  CONSTRAINT [FK_Gifts_Categorys_CategoryId] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categorys] ([CategoryId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Gifts] CHECK CONSTRAINT [FK_Gifts_Categorys_CategoryId]
GO
ALTER TABLE [dbo].[Gifts]  WITH CHECK ADD  CONSTRAINT [FK_Gifts_Donors_DonorId] FOREIGN KEY([DonorId])
REFERENCES [dbo].[Donors] ([DonorId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Gifts] CHECK CONSTRAINT [FK_Gifts_Donors_DonorId]
GO
ALTER TABLE [dbo].[Gifts]  WITH CHECK ADD  CONSTRAINT [FK_Gifts_Purchases_PurchasesPurchaseNumber] FOREIGN KEY([PurchasesPurchaseNumber])
REFERENCES [dbo].[Purchases] ([PurchaseNumber])
GO
ALTER TABLE [dbo].[Gifts] CHECK CONSTRAINT [FK_Gifts_Purchases_PurchasesPurchaseNumber]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Purchases_PurchasesPurchaseNumber] FOREIGN KEY([PurchasesPurchaseNumber])
REFERENCES [dbo].[Purchases] ([PurchaseNumber])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Purchases_PurchasesPurchaseNumber]
GO
ALTER TABLE [dbo].[Winners]  WITH CHECK ADD  CONSTRAINT [FK_Winners_Gifts_GiftId] FOREIGN KEY([GiftId])
REFERENCES [dbo].[Gifts] ([GiftId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Winners] CHECK CONSTRAINT [FK_Winners_Gifts_GiftId]
GO
ALTER TABLE [dbo].[Winners]  WITH CHECK ADD  CONSTRAINT [FK_Winners_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Winners] CHECK CONSTRAINT [FK_Winners_Users_UserId]
GO
USE [master]
GO
ALTER DATABASE [ChineseAuction] SET  READ_WRITE 
GO
