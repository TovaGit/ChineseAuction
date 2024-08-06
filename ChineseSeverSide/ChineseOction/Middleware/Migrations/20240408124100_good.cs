using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChineseOction.Migrations
{
    /// <inheritdoc />
    public partial class good : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Users_UserId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_UserId",
                table: "Purchases");

            migrationBuilder.AddColumn<int>(
                name: "PurchasesPurchaseNumber",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_PurchasesPurchaseNumber",
                table: "Users",
                column: "PurchasesPurchaseNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Purchases_PurchasesPurchaseNumber",
                table: "Users",
                column: "PurchasesPurchaseNumber",
                principalTable: "Purchases",
                principalColumn: "PurchaseNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Purchases_PurchasesPurchaseNumber",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_PurchasesPurchaseNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PurchasesPurchaseNumber",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_UserId",
                table: "Purchases",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Users_UserId",
                table: "Purchases",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
