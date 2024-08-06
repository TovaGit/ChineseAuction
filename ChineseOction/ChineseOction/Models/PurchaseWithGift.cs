namespace ChineseOction.Models
{
    public class PurchaseWithGift
    {
        public int PurchaseNumber { get; set; }

        public int GiftId { get; set; }
        public int AmountOfTickets { get; set; }
        public string? GiftName { get; set; }
        public int TicketPrice { get; set; }
        public int TotalPrice { get; set; }
    }
}
