// # 弹窗处理

class Toast {
   private defaultOptions: UniNamespace.ShowToastOptions = {
      icon: "none",
      duration: 3000,
      mask: false,
      position: "center",
   };

   public success(options: UniNamespace.ShowToastOptions = {}): void {
      this.show({
         ...this.defaultOptions,
         icon: "success",
         ...options,
         title: options.title || "操作成功",
      });
   }

   public error(options: UniNamespace.ShowToastOptions = {}): void {
      this.show({
         ...this.defaultOptions,
         icon: "error",
         ...options,
         title: options.title || "操作失败",
      });
   }

   public warning(options: UniNamespace.ShowToastOptions = {}): void {
      this.show({
         ...this.defaultOptions,
         icon: "none",
         ...options,
         title: options.title || "警告警告",
         // backgroundColor: '#FFC107',
         // color: '#fff',
      });
   }

   public info(options: UniNamespace.ShowToastOptions = {}): void {
      this.show({
         ...this.defaultOptions,
         icon: "none",
         ...options,
         title: options.title || "提示信息",
         // backgroundColor: '#17A2B8',
         // color: '#fff',
      });
   }

   public loading(options: UniNamespace.ShowToastOptions = {}): void {
      this.show({
         ...this.defaultOptions,
         icon: "loading",
         ...options,
         title: options.title || "数据加载中",
         // backgroundColor: '#17A2B8',
         // color: '#fff',
      });
   }

   public hide(): void {
      uni.hideToast();
   }

   private show(options: UniNamespace.ShowToastOptions): void {
      uni.showToast(options);
   }
}

const toast = new Toast();
export default toast;
