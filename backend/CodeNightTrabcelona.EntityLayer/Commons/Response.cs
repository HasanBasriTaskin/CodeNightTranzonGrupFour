using System.Text.Json.Serialization;

namespace CodeNightTrabcelona.EntityLayer.Commons
{
    public class Response<T>
    {
        public T Data { get; set; }

        [JsonIgnore]
        public int StatusCode { get; set; }

        public bool IsSuccessful { get; set; }

        public List<string> Errors { get; set; }

        public static Response<T> Success(int statusCode, T data)
        {
            return new Response<T> { Data = data, StatusCode = statusCode, IsSuccessful = true };
        }

        public static Response<T> Success(int statusCode)
        {
            return new Response<T> { StatusCode = statusCode, IsSuccessful = true };
        }

        public static Response<T> Fail(int statusCode, List<string> errors)
        {
            return new Response<T> { StatusCode = statusCode, IsSuccessful = false, Errors = errors };
        }

        public static Response<T> Fail(int statusCode, string error)
        {
            return new Response<T> { StatusCode = statusCode, IsSuccessful = false, Errors = new List<string> { error } };
        }
    }
}
