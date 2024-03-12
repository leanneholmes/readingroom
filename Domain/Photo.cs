namespace Domain
{
    public class Photo
    {
        public string Id { get; set; } // Using PublicId returned from Cloudinary
        public string Url { get; set;}
    }
}