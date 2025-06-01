
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0B";
  
    const k = 1024;
    const sizes = ["B", "K", "M", "G"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = bytes / Math.pow(k, i);
  
    return `${size.toFixed(1)}${sizes[i]}`;
  };
  