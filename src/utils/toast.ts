import Message from "vue-m-message";

type ToastType = "success" | "error" | "warning" | "none" | "loading";

interface ShowToastOptions {
   /**
    * 提示的内容
    */
   title?: string;

   /**
    * 是否可关闭，默认：false
    */
   closable?: boolean;
   /**
    * 图标
    * - success: 显示成功图标
    * - loading: 显示加载图标
    * - error: 显示错误图标
    * - none: 不显示图标
    * - warning: 显示警告图标，此时 title 文本无长度显示，仅支付宝小程序、字节小程序
    */
   icon?: "success" | "loading" | "error" | "none" | "warning";

   /**
    * 自定义图标的本地路径，image 的优先级高于 icon
    */
   image?: string;

   /**
    * 提示的延迟时间，单位毫秒，默认：1500
    */
   duration?: number;

   /**
    * 纯文本轻提示显示位置，填写有效值后只有 title 属性生效
    * ToastPosition 仅Vue方式显示
    * - top: 居上显示
    * - center: 居中显示
    * - bottom: 居底显示
    */
   position?: "top" | "center" | "bottom" | "top-center";

   /**
    * 是否显示透明蒙层，防止触摸穿透，默认：false
    */
   mask?: boolean;

   /**
    * 接口调用成功的回调函数
    */
   success?: () => void;

   /**
    * 接口调用失败的回调函数
    */
   fail?: () => void;

   /**
    * 接口调用结束的回调函数（调用成功、失败都会执行）
    */
   complete?: () => void;
}

class Toast {
   private defaultOptions: ShowToastOptions = {
      closable: false,
      duration: 3000,
      icon: "none",
      mask: false,
      position: "center",
   };

   private showToast(
      type: ToastType,
      options: ShowToastOptions | string,
      defaultTitle: string,
      duration?: number
   ): void {
      const title =
         typeof options === "string" ? options : options.title || defaultTitle;
      this.show({
         ...this.defaultOptions,
         icon: type,
         duration: duration || this.defaultOptions.duration,
         title,
      });
   }

   public success(options: ShowToastOptions | string): void {
      this.showToast("success", options, "操作成功");
   }

   public error(options: ShowToastOptions | string): void {
      this.showToast("error", options, "操作失败", 5000);
   }

   public warning(options: ShowToastOptions | string): void {
      this.showToast("warning", options, "警告警告", 5000);
   }

   public info(options: ShowToastOptions | string): void {
      this.showToast("none", options, "提示信息");
   }

   public loading(options: ShowToastOptions | string): void {
      this.showToast("loading", options, "数据加载中", -1);
   }

   public hide(delay?: number): void {
      delay = delay || 0 > 0 ? delay : 0;
      if (delay === 0) this.close();
      else setTimeout(this.close, delay);
   }

   private close() {
      if (typeof uni !== "undefined" && uni.hideToast) {
         // 如果存在 uni 库，则使用 uni 的 hideToast 方法
         uni.hideToast();
      } else {
         Message.closeAll();
      }
   }

   private show(options: ShowToastOptions): void {
      const { title, icon, mask, duration, position } = options;
      if (typeof uni !== "undefined" && uni.showToast) {
         // 如果存在 uni 库，则使用 uni 的 showToast 方法
         uni.showToast({
            ...options,
            title: title,
            icon: icon === "warning" ? "error" : icon, // uni-app 中没有 loading 图标，使用 none 代替
            duration: duration,
            position: position as any,
            mask: options.mask,
            success: options.success,
            fail: options.fail,
            complete: options.complete,
         });
      } else {
         // 使用 vue3-toastify 的方法
         let toastType = "info"; // 默认为 info 类型
         this.hide();
         switch (icon) {
            case "success":
               Message.success(title, {
                  ...options,
                  title: "",
                  position: "top-center",
                  hasMask: mask,
                  type: toastType,
                  icon: toastType,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
               });
               break;
            case "error":
               Message.error(title, {
                  ...options,
                  title: "",
                  position: "top-center",
                  hasMask: mask,
                  type: toastType,
                  icon: toastType,
               });
               break;
            case "loading":
               Message.loading(title, {
                  ...options,
                  title: "",
                  position: "top-center",
                  hasMask: mask,
                  type: toastType,
                  icon: toastType,
                  duration: -1, // 不自动关闭
               });
               break;
            default:
               Message.info(title, {
                  ...options,
                  title: "",
                  position: "top-center",
                  hasMask: mask,
                  type: toastType,
                  icon: toastType,
               });
               break;
         }
      }
   }
}

const toast = new Toast();
export default toast;
