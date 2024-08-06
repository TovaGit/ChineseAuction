using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChineseOction.Migrations
{
    /// <inheritdoc />
    public partial class @ref : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GiftId",
                table: "Winners",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "GiftsGiftId",
                table: "Winners",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Winners_GiftsGiftId",
                table: "Winners",
                column: "GiftsGiftId");

            migrationBuilder.AddForeignKey(
                name: "FK_Winners_Gifts_GiftsGiftId",
                table: "Winners",
                column: "GiftsGiftId",
                principalTable: "Gifts",
                principalColumn: "GiftId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Winners_Gifts_GiftsGiftId",
                table: "Winners");

            migrationBuilder.DropIndex(
                name: "IX_Winners_GiftsGiftId",
                table: "Winners");

            migrationBuilder.DropColumn(
                name: "GiftId",
                table: "Winners");

            migrationBuilder.DropColumn(
                name: "GiftsGiftId",
                table: "Winners");
        }
    }
}
