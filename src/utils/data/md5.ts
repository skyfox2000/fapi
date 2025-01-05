const rotateLeft = (num: number, count: number): number => {
   return (num << count) | (num >>> (32 - count));
};

const md5 = (message: string): string => {
   // 将字符串转换为字节序列
   const messageBytes = [];
   for (let idx = 0; idx < message.length; idx++) {
      messageBytes.push(message.charCodeAt(idx));
   }

   // 添加填充位
   const originalBitLength = messageBytes.length * 8;
   messageBytes.push(0x80);
   while ((messageBytes.length * 8) % 512 !== 448) {
      messageBytes.push(0);
   }

   // 添加原始消息长度
   messageBytes.push((originalBitLength >>> 24) & 0xff);
   messageBytes.push((originalBitLength >>> 16) & 0xff);
   messageBytes.push((originalBitLength >>> 8) & 0xff);
   messageBytes.push(originalBitLength & 0xff);

   // 初始化哈希值
   let hash0 = 0x67452301;
   let hash1 = 0xefcdab89;
   let hash2 = 0x98badcfe;
   let hash3 = 0x10325476;

   // 定义四个基本函数
   const f = (x: number, y: number, z: number) => (x & y) | (~x & z);
   const g = (x: number, y: number, z: number) => (x & z) | (y & ~z);
   const h = (x: number, y: number, z: number) => x ^ y ^ z;
   const iFunc = (x: number, y: number, z: number) => y ^ (x | ~z);

   // 常量表
   const K = [
      0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
      0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
      0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
      0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
      0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
      0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
      0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
      0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
      0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
      0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
      0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
   ];

   // 移位表
   const S = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20,
      5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4,
      11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6,
      10, 15, 21,
   ];

   // 主循环
   let byteIndex = 0;
   while (byteIndex < messageBytes.length) {
      const chunk = new Array(16).fill(0);
      for (let j = 0; j < 16; j++) {
         chunk[j] = messageBytes[byteIndex + j] || 0;
      }

      let a = hash0;
      let b = hash1;
      let c = hash2;
      let d = hash3;

      for (let j = 0; j < 64; j++) {
         let fValue: number;
         let gValue: number;
         let temp: number;

         if (j < 16) {
            fValue = f(b, c, d);
            gValue = j;
         } else if (j < 32) {
            fValue = g(b, c, d);
            gValue = (5 * j + 1) % 16;
         } else if (j < 48) {
            fValue = h(b, c, d);
            gValue = (3 * j + 5) % 16;
         } else {
            fValue = iFunc(b, c, d);
            gValue = (7 * j) % 16;
         }

         temp = d;
         d = c;
         c = b;
         b = b + rotateLeft((a + fValue + K[j] + chunk[gValue]) | 0, S[j]);
         a = temp;
      }

      hash0 = (hash0 + a) | 0;
      hash1 = (hash1 + b) | 0;
      hash2 = (hash2 + c) | 0;
      hash3 = (hash3 + d) | 0;

      byteIndex += 16;
   }

   const digest = [hash0, hash1, hash2, hash3]
      .map((h) => {
         const low = h & 0xff;
         const high = (h >>> 8) & 0xff;
         const higher = (h >>> 16) & 0xff;
         const highest = (h >>> 24) & 0xff;
         return [highest, higher, high, low];
      })
      .flat();

   return digest.map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

export default md5;
