using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Helpers
{
    public class FilesHelper
    {
       
        public static bool UploadPhoto(MemoryStream stream, string folder, string name)
        {
            try
            {
                stream.Position = 0;
                var path = Path.Combine(folder, name);
                File.WriteAllBytes(path, stream.ToArray());
            }
            catch
            {
                return false;
            }

            return true;
        }


        public static MemoryStream ConvertToBase64(FileStream stream) 
        { 
            Byte[] inArray = new Byte[(int)stream.Length];
            Char[] outArray = new Char[(int)(stream.Length * 1.34)]; 
            stream.Read(inArray, 0, (int)stream.Length); 
            Convert.ToBase64CharArray(inArray, 0, inArray.Length, outArray, 0);
            return new MemoryStream(Encoding.UTF8.GetBytes(outArray)); 
        
        }

        public static bool DeleteFile(string ruta, string fileName)
        {
            try
            {
                File.Delete(Path.Combine(ruta, fileName));
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        public static async Task<bool> UploadPhotoAsync(string ruta, IFormFileCollection files, string fileName)
        {
            try
            {
                foreach (var file in files)
                {

                    if (file.Length > 0)
                    {
                        using (var fileStream = new FileStream(Path.Combine(ruta, fileName ), FileMode.Create))
                        {
                           await file.CopyToAsync(fileStream);
                        }
                    }
                }
            }
            catch
            {
                return false;
            }

            return true;
        }

    }
}
